import React from 'react';
import tw from 'twin.macro';

export const ExternalLink: React.FC<JSX.IntrinsicElements['a']> = ({
  children,
  href,
}) => (
  <a
    href={href}
    tw="text-accent-500 hover:text-accent-600 hover:underline"
    target="_blank"
    rel="nofollow noreferrer external"
  >
    {children}
  </a>
);

export const Text = tw.p`mb-6 leading-loose text-gray-500`;

export default Text;
