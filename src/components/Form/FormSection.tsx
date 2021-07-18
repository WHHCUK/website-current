import React from 'react';
import tw from 'twin.macro';
import { Form as YaflForm } from 'yafl';

import CheckIcon from '../../assets/images/icons/check.svg';
import useWebform, { WebformError } from '../../hooks/useWebform';

import {
  Field,
  FormItems,
  RawDocument,
  ReferencesContext,
  richText,
} from '../../utils/contentful';
import Spinner from '../Spinner';

import CtaButton from './CtaButton';
import ErrorMessage from './ErrorMessage';
import { ChoiceInput, HiddenInput, TextInput } from './Input';

const Highlight = tw.div`bg-gray-100 rounded-lg py-3 px-8 text-center`;

interface Props {
  id: string;
  introduction: RawDocument;
  success: RawDocument;
  items: FormItems;
  active: boolean;
}

const FormSection: React.FC<Props> = ({
  id,
  introduction,
  success: successRichText,
  items,
  active,
}) => {
  const { error, success, loading, submitForm } = useWebform();

  const initialValue = Object.keys(items).reduce(
    (obj, key) => ({ ...obj, [key]: '' }),
    {
      id,
    },
  );

  const getError = (error: WebformError): string => {
    if (error === 'Invalid form') {
      return 'Please check the form for errors, then try again';
    }

    return 'Something unexpected went wrong, please try again';
  };

  return (
    <div>
      <ReferencesContext.Provider value={introduction.references}>
        {richText(introduction)}
      </ReferencesContext.Provider>

      {success && (
        <Highlight>
          <img tw="my-4 h-20 mx-auto" src={CheckIcon} />
          <ReferencesContext.Provider value={successRichText.references}>
            {richText(successRichText)}
          </ReferencesContext.Provider>
        </Highlight>
      )}

      {!success && active && (
        <YaflForm initialValue={initialValue} onSubmit={submitForm}>
          {({ errorCount, submit, submitCount }) => (
            <form onSubmit={submit}>
              <HiddenInput name="id" />
              {Object.entries(items)
                .sort((a, b) => a[1].weight - b[1].weight)
                .map(getFieldFromEntry)}
              <div tw="flex items-center space-x-2">
                <CtaButton type="submit">Submit</CtaButton>
                {loading && <Spinner />}
              </div>
              {(error || (errorCount > 0 && submitCount > 0)) && (
                <ErrorMessage>{getError(error ?? 'Invalid form')}</ErrorMessage>
              )}
            </form>
          )}
        </YaflForm>
      )}
    </div>
  );
};

export default FormSection;

function getFieldFromEntry([name, field]: [string, Field]) {
  switch (field.type) {
    case 'text': {
      return (
        <TextInput
          key={name}
          name={name}
          variation={field.variation}
          label={field.label}
          helpText={field.helpText}
          autoComplete={field.autoComplete}
          required={field.required}
        />
      );
    }
    case 'choice': {
      return (
        <ChoiceInput
          key={name}
          name={name}
          variation={field.variation}
          label={field.label}
          helpText={field.helpText}
          required={field.required}
          options={field.options}
        />
      );
    }
  }
}
