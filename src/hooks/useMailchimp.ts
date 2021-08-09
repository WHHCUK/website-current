import React from 'react';
import useFetch from 'use-http';

import { EMAIL } from '../utils/patterns';

export type MailChimpError =
  | 'Contact Exists'
  | 'Invalid Email'
  | 'Bad Request Error'
  | 'Internal Server Error';

const useMailChimp = () => {
  const [email, setEmail] = React.useState<string>('');
  const [success, setSuccess] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] =
    React.useState<MailChimpError | undefined>(undefined);

  const { post, response, error: fetchErr } = useFetch(process.env.API_URL);

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

  const handleError = (message: MailChimpError) => {
    setSuccess(false);
    setLoading(false);
    setError(message);
  };

  const subscribe = () => {
    handleLoading();

    if (!email || !EMAIL.test(email)) {
      handleError('Invalid Email');
      return;
    }

    post('/newsletter', { email }).then(() => {
      handleSuccess();
    });
  };

  React.useEffect(() => {
    if (fetchErr) {
      console.log(response.status);

      response.json().then((body) => {
        handleError(body.message);
      });
    }
  }, [response, fetchErr]);

  return {
    error,
    success,
    loading,
    subscribe,
    setEmail,
  };
};

export default useMailChimp;
