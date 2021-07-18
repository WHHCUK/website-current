import React from 'react';
import { GlobalStyles } from 'twin.macro';

import Footer from './components/Footer';
import Header from './components/Header';

const Page: React.FC = ({ children }) => (
  <div>
    <GlobalStyles />
    <Header />
    <div tw="mt-10 lg:mt-0 bg-gray-50">{children}</div>
    <Footer />
  </div>
);

export default Page;
