import {
  documentToReactComponents,
  Options,
} from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document, INLINES } from '@contentful/rich-text-types';
import React from 'react';

import BlockQuote from '../../components/BlockQuote';
import { H1, H2, H3, H4, H5, H6 } from '../../components/Headings';
import { LI, OL, UL } from '../../components/Lists';
import Text, { ExternalLink } from '../../components/Text';

import Asset from './components/Asset';
import EmbededEntry from './components/EmbededEntry';

import { RawDocument, isRawDocument } from './types';

const options: Options = {
  renderNode: {
    [BLOCKS.HEADING_1]: (_, children) => <H1>{children}</H1>,
    [BLOCKS.HEADING_2]: (_, children) => <H2>{children}</H2>,
    [BLOCKS.HEADING_3]: (_, children) => <H3>{children}</H3>,
    [BLOCKS.HEADING_4]: (_, children) => <H4>{children}</H4>,
    [BLOCKS.HEADING_5]: (_, children) => <H5>{children}</H5>,
    [BLOCKS.HEADING_6]: (_, children) => <H6>{children}</H6>,
    [BLOCKS.PARAGRAPH]: (_, children) => <Text>{children}</Text>,
    [BLOCKS.OL_LIST]: (_, children) => <OL>{children}</OL>,
    [BLOCKS.UL_LIST]: (_, children) => <UL>{children}</UL>,
    [BLOCKS.LIST_ITEM]: (_, children) => <LI>{children}</LI>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => <Asset id={node.data.target.sys.id} />,
    [INLINES.HYPERLINK]: (node, children) => (
      <ExternalLink href={node.data.uri}>{children}</ExternalLink>
    ),
    // [BLOCKS.HR]: (_node, children) => <p>BLOCKS.HR</p>,
    [BLOCKS.QUOTE]: (_, children) => <BlockQuote>{children}</BlockQuote>,
    [BLOCKS.EMBEDDED_ENTRY]: (node) => (
      <EmbededEntry id={node.data.target.sys.id} />
    ),
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
