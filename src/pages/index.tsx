import * as React from 'react';
import NewsletterSection from '../components/NewsletterSection';

import Page from '../components/Page';

const IndexPage = () => {
  return (
    <Page currentPath="/">
      <title>Home | WHHC</title>
      <NewsletterSection />
    </Page>
  );
};

export default IndexPage;
