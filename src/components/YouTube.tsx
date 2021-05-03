import React from 'react';
import styled from 'styled-components';
import tw from 'twin.macro';

const YouTubeContainer = styled.div`
  ${tw`
    max-w-5xl
    md:mb-8
    mx-auto
  `}

  div {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

interface Props {
  url: string;
}

const YouTube: React.FC<Props> = ({ url }) => {
  const id = url.replace(/^.*[\/=]/, '');

  return (
    <YouTubeContainer>
      <div tw="relative h-0" style={{ paddingBottom: '56.25%' }}>
        <iframe
          title="youtube"
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          allowFullScreen={true}
        />
      </div>
    </YouTubeContainer>
  );
};

export default YouTube;
