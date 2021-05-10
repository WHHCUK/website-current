import React from 'react';
import tw from 'twin.macro';

import { PlainExternalLink } from '../../../../ExternalLink';

const Link = tw(
  PlainExternalLink,
)`inline-block w-10 mr-2 p-2 bg-club-black-400 hover:bg-club-black-300 rounded`;

interface Props {
  name: string;
  url: string;
  icon: string;
}

const SocialMediaIcon: React.FC<Props> = ({ name, url, icon }) => (
  <Link
    title={name}
    href={url}
    target="_blank"
    rel="nofollow noreferrer external"
  >
    <img alt={`${name} logo`} tw="mx-auto" src={icon} />
  </Link>
);

export default SocialMediaIcon;
