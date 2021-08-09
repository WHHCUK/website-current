import React from 'react';
import Avatar from '../../../components/Avatar';
import CityMapperLink from '../../../components/CityMapperLink';
import FormSection from '../../../components/Form/FormSection';
import Table from '../../../components/Table';

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
    case 'citymapper':
      return <CityMapperLink link={entry.link} />;
    case 'form':
      return (
        <FormSection
          id={id}
          introduction={entry.introduction}
          success={entry.success}
          items={JSON.parse(entry.items.internal.content)}
          active={entry.active}
        />
      );
    case 'member':
      return <Avatar member={entry} />;
    case 'table':
      return <Table data={entry.table} />;
    case 'youtube':
      return <YouTube url={entry.url} />;
    default:
      return <p>{entry.sys.contentType.sys.id}</p>;
  }
};

export default EmbededEntry;
