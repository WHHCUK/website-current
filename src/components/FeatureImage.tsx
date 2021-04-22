import GatsbyImage, { GatsbyImageFluidProps } from 'gatsby-image';
import React from 'react';
import tw from 'twin.macro';

const ImageContainer = tw.div`mb-10`;
const Image = tw(GatsbyImage)`w-full h-108 object-cover rounded-lg`;

interface Props {
  image: GatsbyImageFluidProps;
}

const FeatureImage: React.FC<Props> = ({ image }) => (
  <ImageContainer>
    <Image fluid={image.fluid} />
  </ImageContainer>
);

export default FeatureImage;
