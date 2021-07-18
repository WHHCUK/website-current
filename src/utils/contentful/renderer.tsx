import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document, INLINES } from '@contentful/rich-text-types';
import React from 'react';

import BlockQuote from '../../components/BlockQuote';
import ExternalLink from '../../components/ExternalLink';
import { H2, H3, H4 } from '../../components/Headings';
import { HR } from '../../components/HR';
import { LI, OL, UL } from '../../components/Lists';
import Text from '../../components/Text';

import Asset from './components/Asset';
import EmbededEntry from './components/EmbededEntry';

import { RawDocument, isRawDocument } from './types';

const options: Options = {
  renderNode: {
    [BLOCKS.HEADING_2]: (_, children) => <H2>{children}</H2>,
    [BLOCKS.HEADING_3]: (_, children) => <H3>{children}</H3>,
    [BLOCKS.HEADING_4]: (_, children) => <H4>{children}</H4>,

    [BLOCKS.PARAGRAPH]: (_, children) => <Text>{children}</Text>,

    [BLOCKS.OL_LIST]: (_, children) => <OL>{children}</OL>,
    [BLOCKS.UL_LIST]: (_, children) => <UL>{children}</UL>,
    [BLOCKS.LIST_ITEM]: (_, children) => <LI>{children}</LI>,

    [BLOCKS.EMBEDDED_ENTRY]: (node) => (
      <EmbededEntry id={node.data.target.sys.id} />
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node) => <Asset id={node.data.target.sys.id} />,
    [INLINES.EMBEDDED_ENTRY]: (node) => (
      <EmbededEntry id={node.data.target.sys.id} />
    ),
    [INLINES.HYPERLINK]: (node, children) => (
      <ExternalLink href={node.data.uri}>{children}</ExternalLink>
    ),

    [BLOCKS.QUOTE]: (_, children) => <BlockQuote>{children}</BlockQuote>,

    [BLOCKS.HR]: () => <HR />,
    // [INLINES.ENTRY_HYPERLINK]: () => <p>INLINES.ENTRY_HYPERLINK</p>,
    // [INLINES.ASSET_HYPERLINK]: () => <p>INLINES.ASSET_HYPERLINK</p>,
    // [INLINES.EMBEDDED_ENTRY]: () => <p>INLINES.EMBEDDED_ENTRY</p>,
  },
};

export const richText = (input: Document | RawDocument) => {
  const document = isRawDocument(input)
    ? (JSON.parse(input.raw) as Document)
    : input;

  return documentToReactComponents(document, options);
};
