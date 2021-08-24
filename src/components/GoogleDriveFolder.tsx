import React from 'react';
import tw from 'twin.macro';

const Container = tw.div`rounded-xl overflow-scroll h-192 shadow`;

interface Props {
  id: string;
  layout: 'grid' | 'list';
}

export const GoogleDriveFolder: React.FC<Props> = ({ id, layout }) => (
  <Container>
    <iframe
      src={`https://drive.google.com/a/whhc.uk/embeddedfolderview?id=${id}#${layout}`}
      style={{ width: '100%', height: '100%', backgroundColor: '#FFF' }}
    ></iframe>
  </Container>
);

export default GoogleDriveFolder;
