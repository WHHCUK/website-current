import React from 'react';
import tw from 'twin.macro';

export const PlainExternalLink: React.FC<JSX.IntrinsicElements['a']> = (
  props,
) => (
  <a {...props} rel="nofollow noreferrer external">
    {props.children}
  </a>
);

const ExternalLink = tw(
  PlainExternalLink,
)`text-accent-600 hover:text-accent-700 hover:underline`;

export default ExternalLink;
