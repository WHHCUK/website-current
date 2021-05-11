import React from 'react';
import tw from 'twin.macro';

const Container = tw.div`bg-gray-100 p-6 pb-2 border-l-8 border-club-blue-500 mb-6`;

const BlockQuote: React.FC = ({ children }) => (
  <Container>{children}</Container>
);

export default BlockQuote;
