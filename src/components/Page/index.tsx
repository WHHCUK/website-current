import React from 'react';
import { GlobalStyles } from 'twin.macro';

import Header from './components/Header';

interface Props {
  currentPath?: string;
}

const Page: React.FC<Props> = ({ children, currentPath }) => (
  <div>
    <GlobalStyles />
    <Header currentPath={currentPath} />
    <div tw="mt-10 lg:mt-0">{children}</div>
    <footer>Footer</footer>
  </div>
);

export default Page;
