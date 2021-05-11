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
    {top && <div tw="space-x-4">{top}</div>}
    <H2 tw="mt-2 mb-6">{heading}</H2>
    {bottom && <div tw="space-x-4">{bottom}</div>}
  </Container>
);

export default PageHeader;
