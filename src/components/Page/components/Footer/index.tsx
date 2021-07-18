import format from 'date-fns/format';
import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import tw from 'twin.macro';

import FacebookIcon from '../../../../assets/images/social/facebook.svg';
import InstagramIcon from '../../../../assets/images/social/instagram.svg';
import TwitterIcon from '../../../../assets/images/social/twitter.svg';
import Brand from '../../../Brand';
import Container from '../../../Container';
import Text from '../../../Text';

import SocialMediaIcon from './components/SocialMediaIcon';

const StyledFooter = tw.footer`py-20 bg-club-black-500 text-gray-300`;
const Slogan = tw(Text)`text-gray-200 text-lg lg:text-xl leading-snug`;

interface FooterColumnLink {
  contentful_id: string;
  slug: string;
  shortName: string;
  title: string;
}

interface FooterQueryData {
  contentfulSiteSettings: {
    slogan?: { slogan?: string };
    instagram: string;
    twitter: string;
    facebook: string;
    footerColumn1Header: string;
    footerColumn1Links: FooterColumnLink[];
    footerColumn2Header: string;
    footerColumn2Links: FooterColumnLink[];
  };
}

const Footer: React.FC = () => {
  const { contentfulSiteSettings: data } =
    useStaticQuery<FooterQueryData>(graphql`
      query Footer {
        contentfulSiteSettings(name: { eq: "Site Settings" }) {
          contentful_id
          slogan {
            slogan
          }
          instagram
          twitter
          facebook
          footerColumn1Header
          footerColumn1Links {
            contentful_id
            slug
            shortName
            title
          }
          footerColumn2Header
          footerColumn2Links {
            contentful_id
            slug
            shortName
            title
          }
        }
      }
    `);

  return (
    <StyledFooter>
      <Container>
        <div tw="flex flex-wrap">
          <div tw="w-full lg:w-1/3 mb-16 lg:mb-0 space-y-6">
            <Brand as="h2" />
            {data.slogan && <Slogan>{data.slogan.slogan}</Slogan>}

            <div>
              <SocialMediaIcon
                name="Facebook"
                url={data.facebook}
                icon={FacebookIcon}
              />
              <SocialMediaIcon
                name="Twitter"
                url={data.twitter}
                icon={TwitterIcon}
              />
              <SocialMediaIcon
                name="Instagram"
                url={data.instagram}
                icon={InstagramIcon}
              />
            </div>
          </div>
          <div tw="w-full lg:w-2/3 lg:pl-16 flex flex-wrap justify-between md:  flex-row-reverse">
            <div tw="w-full md:w-1/2 mb-16 md:mb-0">
              <h2 tw="mb-6 text-2xl font-bold text-white">
                {data.footerColumn2Header}
              </h2>
              <div tw="md:flex justify-between">
                <ul tw="md:w-1/2">
                  {data.footerColumn2Links
                    .slice(0, Math.ceil(data.footerColumn2Links.length / 2))
                    .map((link, index) => (
                      <li key={`${link.contentful_id}${index}`} tw="mb-4">
                        <Link
                          tw="text-gray-300 hover:text-gray-300"
                          to={`/${link.slug}`}
                          title={link.title}
                        >
                          {link.shortName}
                        </Link>
                      </li>
                    ))}
                </ul>
                <ul tw="w-1/2">
                  {data.footerColumn2Links
                    .slice(Math.ceil(data.footerColumn2Links.length / 2))
                    .map((link, index) => (
                      <li key={`${link.contentful_id}${index}`} tw="mb-4">
                        <Link
                          tw="text-gray-300 hover:text-gray-300"
                          to={`/${link.slug}`}
                          title={link.title}
                        >
                          {link.shortName}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div tw="w-full md:w-1/2 mb-16 md:mb-0">
              <h2 tw="mb-6 text-2xl font-bold text-white">
                {data.footerColumn1Header}
              </h2>
              <ul>
                {data.footerColumn1Links.map((link, index) => (
                  <li key={`${link.contentful_id}${index}`} tw="mb-4">
                    <Link
                      tw="text-gray-300 hover:text-gray-300"
                      to={`/${link.slug}`}
                      title={link.title}
                    >
                      {link.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <p tw="lg:text-center text-sm text-gray-300 border-t border-club-black-400 pt-12 mt-16">
          © {format(new Date(), 'yyyy')}. All rights reserved.
        </p>
      </Container>
    </StyledFooter>
  );
};

export default Footer;
