import { Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React from 'react';
import tw from 'twin.macro';

import { NewsArticle } from '../utils/contentful';
import { isoToShortDate } from '../utils/dates';
import { slugToLabel } from '../utils/strings';

const ArticleGridContainer = tw.div`flex flex-wrap w-full -mt-4 md:-mt-6`;
const ArticleAsideContainer = tw.div`flex flex-wrap w-full -mt-4 md:-mt-6 md:w-3/4 lg:w-full md:mx-auto`;

interface Props {
  articles: Pick<
    NewsArticle,
    'date' | 'slug' | 'tag' | 'thumbnail' | 'title'
  >[];
  aside?: boolean;
}

const ArticleGrid: React.FC<Props> = ({ articles, aside }) => {
  const articlesJSX = articles.map(({ date, slug, tag, thumbnail, title }) => (
    <article key={slug} tw="mt-4 md:mt-6 w-1/2 lg:w-1/4 px-2 md:px-3">
      <div tw="rounded overflow-hidden shadow">
        <Link to={`/news/${slug}`} key={slug} tw="">
          <GatsbyImage
            tw="h-36 md:h-40 lg:h-48 rounded-t"
            fluid={thumbnail.fluid}
          />
        </Link>
        <div tw="p-3 md:p-6 rounded-b bg-white min-h-40 md:min-h-56 flex flex-col justify-between  ">
          <Link to={`/news/${slug}`} key={slug} tw="">
            <h2 tw="my-2 text-sm md:text-base lg:text-lg font-bold">{title}</h2>
          </Link>
          <div>
            <span tw="text-xs md:text-sm text-gray-500">
              {isoToShortDate(date)}
            </span>
            <p>
              <Link
                tw="text-sm md:text-base text-accent-600 hover:text-accent-700 font-bold"
                to={`/news/${tag}`}
              >
                {slugToLabel(tag)}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </article>
  ));

  if (aside) {
    return <ArticleAsideContainer>{articlesJSX}</ArticleAsideContainer>;
  }

  return <ArticleGridContainer>{articlesJSX}</ArticleGridContainer>;
};

export default ArticleGrid;
