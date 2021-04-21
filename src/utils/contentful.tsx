import { Document } from '@contentful/rich-text-types';
import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';

const options: Options = {};

interface RawDocument {
  raw: string;
}

const isRawDocument = (
  document: Document | RawDocument
): document is RawDocument => document.hasOwnProperty('raw');

export const renderer = (input: Document | RawDocument) => {
  const document = isRawDocument(input)
    ? (JSON.parse(input.raw) as Document)
    : input;

  return documentToReactComponents(document, options);
};
