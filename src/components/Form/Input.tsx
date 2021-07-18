import React from 'react';
import tw from 'twin.macro';

import { useField } from 'yafl';
import {
  Options,
  TextFieldVariation,
  ChoiceFieldVariation,
} from '../../utils/contentful';

import ErrorMessage from './ErrorMessage';

const Container = tw.div`mb-6`;
const Input = tw.input`appearance-none w-full p-4 text-xs font-semibold leading-none bg-gray-100 rounded outline-none`;

interface CommonProps<T = string> {
  name: string;
  label: string;
  placeholder?: string;
  helpText?: string;
  variation?: T;
  required: boolean;
}

type InputWrapProps = Pick<CommonProps, 'name' | 'label' | 'helpText'> & {
  error?: string;
};

const InputWrap: React.FC<InputWrapProps> = ({
  name,
  label,
  helpText,
  error,
  children,
}) => (
  <Container tw="mb-6">
    <label tw="block text-gray-800 text-sm font-semibold mb-2" htmlFor={name}>
      {label}
    </label>
    {helpText && <p tw="text-sm text-gray-500 mb-2">{helpText}</p>}
    {children}
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </Container>
);

type TextInputProps = CommonProps<TextFieldVariation> & {
  autoComplete?: string;
};

const TextInput: React.FC<TextInputProps> = ({
  name,
  label,
  placeholder,
  helpText,
  variation = 'short',
  required,
  autoComplete,
}) => {
  const validate = (value: string) => {
    if (required && !value) {
      return 'Required';
    }

    if (
      variation === 'email' &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ) {
      return 'Email is not valid';
    }
  };

  const [input, { isValid, touched, submitCount, errors = [] }] = useField(
    name,
    { validate },
  );

  const showError = !isValid && (touched || submitCount > 0);

  return (
    <InputWrap
      name={name}
      label={label}
      helpText={helpText}
      error={showError ? errors[0] : undefined}
    >
      {variation === 'long' ? (
        <Input
          as="textarea"
          tw="min-h-72 md:min-h-48 leading-relaxed"
          name={name}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          onChange={input.onChange}
          maxLength={1200}
        />
      ) : (
        <Input
          name={name}
          type={variation === 'email' ? 'email' : 'text'}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          onChange={input.onChange}
        />
      )}
    </InputWrap>
  );
};

type ChoiceInputProps = CommonProps<ChoiceFieldVariation> & {
  options: Options;
};

const ChoiceInput: React.FC<ChoiceInputProps> = ({
  name,
  label,
  helpText,
  variation,
  options,
  required,
}) => {
  const validate = (value: string) => {
    if (required && !value) {
      return 'Required';
    }
  };

  const [input, { setValue, isValid, touched, submitCount, errors = [] }] =
    useField(name, { validate });

  const showError = !isValid && (touched || submitCount > 0);

  const handleChange =
    (key: string): React.ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const { checked } = e.target;
      const currentValues = !!input.value ? input.value.split(',') : [];

      currentValues.push(key);

      const newValues = (
        checked ? currentValues : currentValues.filter((value) => value !== key)
      ).sort((a, b) => a.localeCompare(b));

      setValue(newValues.join(','));
    };

  return (
    <InputWrap
      name={name}
      label={label}
      error={showError ? errors[0] : undefined}
      helpText={helpText}
    >
      <div tw="flex flex-col space-y-3">
        {Object.entries(options).map(([key, label]) =>
          variation === 'dropdown' ? null : (
            <label key={key} tw="flex items-center">
              <input
                type={variation}
                tw="h-6 w-6 mr-2"
                name={input.name}
                value={key}
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                onChange={handleChange(key)}
              />
              <span tw="ml-1">{label}</span>
            </label>
          ),
        )}
      </div>
    </InputWrap>
  );
};

const HiddenInput: React.FC<Pick<CommonProps, 'name'>> = ({ name }) => {
  const [input] = useField(name);
  return <input name={name} type="hidden" onChange={input.onChange} />;
};

export { ChoiceInput, TextInput, HiddenInput };
