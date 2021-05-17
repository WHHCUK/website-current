import React from 'react';

import YouTube from '../../../components/YouTube';

import { ReferencesContext } from '../context';
import { CUSTOM_BLOCK } from '../types';

interface Props {
  id: string;
}

const EmbededEntry: React.FC<Props> = ({ id }) => {
  const references = React.useContext(ReferencesContext);
  const entry = references.find((e: any) => e.contentful_id === id);

  switch (entry.sys.contentType.sys.id as CUSTOM_BLOCK) {
    case 'youtube':
      return <YouTube url={entry.url} />;
    default:
      return null;
  }
};

export default EmbededEntry;
