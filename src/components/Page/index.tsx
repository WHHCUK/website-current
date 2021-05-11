import React from 'react';
import { GlobalStyles } from 'twin.macro';

import Footer from './components/Footer';
import Header from './components/Header';

interface Props {
  currentPath?: string;
}

const Page: React.FC<Props> = ({ children, currentPath }) => (
  <div>
    <GlobalStyles />
    <Header currentPath={currentPath} />
    <div tw="mt-10 lg:mt-0 bg-gray-50">{children}</div>
    <Footer />
  </div>
);

export default Page;
