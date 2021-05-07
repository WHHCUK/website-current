import GatsbyImage from 'gatsby-image';
import React from 'react';
import tw from 'twin.macro';

import { FluidImageProps } from '../utils/contentful';

const GalleryContainer = tw.div`w-full lg:px-24`;
const RowContainer = tw.div`md:flex md:mb-4 md:ml--4 w-full`;
const ImageContainer = tw.div`mb-4 md:mb-0 md:ml-4`;
const Image = tw(GatsbyImage)`rounded`;

interface Props {
  images: FluidImageProps[];
}

const Gallery: React.FC<Props> = ({ images }) => {
  const chunkedImages = images ? chunkImages(images) : [];

  return (
    <GalleryContainer>
      {chunkedImages.map((row, rowIndex) => (
        <RowContainer key={`row-${rowIndex}`}>
          {row.map((image, index) => (
            <ImageContainer
              key={index}
              style={{ flex: image.fluid.aspectRatio }}
            >
              <Image fluid={image.fluid} />
            </ImageContainer>
          ))}
        </RowContainer>
      ))}
    </GalleryContainer>
  );
};

export default Gallery;

function chunkImages<T>(images: T[] | undefined): T[][] {
  if (images == null) {
    return [];
  }

  const chunkSizeArr: number[] = [];
  let remainingSize: number = images.length;

  while (remainingSize > 0) {
    let chunkSize: number;

    switch (remainingSize) {
      case 1:
        chunkSize = 1;
        break;
      case 2:
      case 4:
      case 7:
        chunkSize = 2;
        break;
      default:
        chunkSize = 3;
        break;
    }

    chunkSizeArr.push(chunkSize);
    remainingSize -= chunkSize;
  }

  let index = 0;
  return chunkSizeArr.reverse().reduce((array, chunkSize: number) => {
    const chunk: T[] = images.slice(index, index + chunkSize);
    index += chunkSize;
    return [...array, chunk];
  }, [] as T[][]);
}
