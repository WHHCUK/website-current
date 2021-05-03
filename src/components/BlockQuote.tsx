import React from 'react';
import tw from 'twin.macro';

const Container = tw.div`bg-gray-100 p-6 pb-2 border-l-8 border-club-blue-500`;

interface Props {}

const BlockQuote: React.FC<Props> = ({ children }) => (
  <Container>{children}</Container>
);

export default BlockQuote;
