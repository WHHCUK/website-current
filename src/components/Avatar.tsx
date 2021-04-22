import GatsbyImage from 'gatsby-image';
import React from 'react';
import tw from 'twin.macro';

import { Member } from '../utils/contentful';

const Container = tw.div`flex justify-center`;
const ImageContainer = tw.div`mr-4`;
const Image = tw(GatsbyImage)`w-12 h-12 object-cover object-top rounded-full`;
const Text = tw.div`text-left`;
const Name = tw.span`text-gray-500 font-bold`;
const Role = tw.p`text-sm text-accent-500 font-semibold`;

interface Props {
  member: Member;
}

const HeroImage: React.FC<Props> = ({ member }) => (
  <Container>
    <ImageContainer>
      <Image fluid={member.avatar.fluid} />
    </ImageContainer>
    <Text>
      {member.email ? (
        <a href={`mailto:${member.email}`}>
          <Name>{member.name}</Name>
        </a>
      ) : (
        <p>
          <Name>{member.name}</Name>
        </p>
      )}

      <Role>{member.role}</Role>
    </Text>
  </Container>
);

export default HeroImage;
