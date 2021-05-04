import format from 'date-fns/format';
import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import tw from 'twin.macro';

import FacebookIcon from '../../../../assets/images/social/facebook.svg';
import InstagramIcon from '../../../../assets/images/social/instagram.svg';
import TwitterIcon from '../../../../assets/images/social/twitter.svg';

import Brand from '../components/Brand';

const StyledFooter = tw.footer`py-20 bg-club-black-500 text-gray-300`;

interface FooterColumnLink {
  contentful_id: string;
  slug: string;
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

interface Props {}

const Footer: React.FC<Props> = () => {
  const {
    contentfulSiteSettings: data,
  } = useStaticQuery<FooterQueryData>(graphql`
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
          title
        }
        footerColumn2Header
        footerColumn2Links {
          contentful_id
          slug
          title
        }
      }
    }
  `);

  return (
    <StyledFooter>
      <div tw="container mx-auto px-4">
        <div tw="flex flex-wrap">
          <div tw="w-full lg:w-1/3 mb-16 lg:mb-0 space-y-4">
            <Brand />
            <p tw="mb-4 max-w-sm  leading-loose">{data.slogan.slogan}</p>
            <div>
              <a
                tw="inline-block w-10 mr-2 p-2 bg-club-black-400 hover:bg-club-black-300 rounded"
                href={data.facebook}
                target="_blank"
                rel="nofollow noreferrer external"
              >
                <img tw="mx-auto" src={FacebookIcon} />
              </a>
              <a
                tw="inline-block w-10 mr-2 p-2 bg-club-black-400 hover:bg-club-black-300 rounded"
                href={data.twitter}
                target="_blank"
                rel="nofollow noreferrer external"
              >
                <img tw="mx-auto" src={TwitterIcon} />
              </a>
              <a
                tw="inline-block w-10 p-2 bg-club-black-400 hover:bg-club-black-300 rounded"
                href={data.instagram}
                target="_blank"
                rel="nofollow noreferrer external"
              >
                <img tw="mx-auto" src={InstagramIcon} />
              </a>
            </div>
          </div>
          <div tw="w-full lg:w-2/3 lg:pl-16 flex flex-wrap justify-between md:  flex-row-reverse">
            <div tw="w-full md:w-1/2 mb-16 md:mb-0">
              <h3 tw="mb-6 text-2xl font-bold text-white">
                {data.footerColumn2Header}
              </h3>
              <div tw="md:flex justify-between">
                <ul tw="md:w-1/2">
                  {data.footerColumn2Links
                    .slice(0, Math.ceil(data.footerColumn2Links.length / 2))
                    .map((link) => (
                      <li key={link.contentful_id} tw="mb-4">
                        <Link
                          tw="text-gray-300 hover:text-gray-300"
                          to={`/${link.slug}`}
                        >
                          {link.title.substr(0, 25)}
                        </Link>
                      </li>
                    ))}
                </ul>
                <ul tw="w-1/2">
                  {data.footerColumn2Links
                    .slice(Math.ceil(data.footerColumn2Links.length / 2))
                    .map((link) => (
                      <li key={link.contentful_id} tw="mb-4">
                        <Link
                          tw="text-gray-300 hover:text-gray-300"
                          to={`/${link.slug}`}
                        >
                          {link.title.substr(0, 25)}
                        </Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div tw="w-full md:w-1/2 mb-16 md:mb-0">
              <h3 tw="mb-6 text-2xl font-bold text-white">
                {data.footerColumn1Header}
              </h3>
              <ul>
                {data.footerColumn1Links.map((link) => (
                  <li key={link.contentful_id} tw="mb-4">
                    <Link
                      tw="text-gray-300 hover:text-gray-300"
                      to={`/${link.slug}`}
                    >
                      {link.title.substr(0, 25)}
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
      </div>
    </StyledFooter>
  );
};

export default Footer;
