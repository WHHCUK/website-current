import React from 'react';
import tw from 'twin.macro';

import { H2 } from './Headings';

const Container = tw.div`mb-10 max-w-3xl mx-auto text-center`;

interface Props {
  heading: string | JSX.Element;
  top?: JSX.Element;
  bottom?: JSX.Element;
}

const PageHeader: React.FC<Props> = ({ heading, top, bottom }) => (
  <Container>
    {top && <div tw="flex space-x-4  justify-center">{top}</div>}
    <H2 tw="mt-2 mb-6">{heading}</H2>
    {bottom && <div tw="flex space-x-4  justify-center">{bottom}</div>}
  </Container>
);

export default PageHeader;
