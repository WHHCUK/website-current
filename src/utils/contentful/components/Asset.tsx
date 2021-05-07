import React from 'react';
import GatsbyImage from 'gatsby-image';
import tw from 'twin.macro';

import { ReferencesContext } from '../context';

const StyledImage = tw(GatsbyImage)`mb-12 rounded object-cover mx-auto`;

interface Props {
  id: string;
}

const Asset: React.FC<Props> = ({ id }) => {
  const assets = React.useContext(ReferencesContext);
  const asset = assets.find((a: any) => a.contentful_id === id);

  if (/^image.*/.test(asset.file.contentType)) {
    return <StyledImage alt={asset.description} fluid={asset.fluid} />;
  }

  return <p>File not Implemented: {asset.file.contentType}</p>;
};

export default Asset;
