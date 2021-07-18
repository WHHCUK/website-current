import React from 'react';
import useFetch from 'use-http';
import { FormProps } from 'yafl';

export type WebformError =
  | 'Invalid form'
  | 'Form Not Found'
  | 'Internal server error';

const useWebform = () => {
  const [success, setSuccess] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<WebformError | undefined>(undefined);

  const { post, response, error: fetchErr } = useFetch(process.env.API_URL);

  React.useEffect(() => {
    if (fetchErr) {
      response.json().then((body) => {
        handleError(body.message);
      });
    }
  }, [response, fetchErr]);

  const handleSuccess = () => {
    setSuccess(true);
    setLoading(false);
    setError(undefined);
  };

  const handleLoading = () => {
    setSuccess(false);
    setLoading(true);
    setError(undefined);
  };

  const handleError = (message: WebformError) => {
    setSuccess(false);
    setLoading(false);
    setError(message);
  };

  const submitForm = (form: any, context: FormProps<any>) => {
    handleLoading();

    if (context.errorCount > 0) {
      handleError('Invalid form');
    }

    post('/form', form).then(() => {
      handleSuccess();
    });
  };

  return {
    error,
    success,
    loading,
    submitForm,
  };
};

export default useWebform;
