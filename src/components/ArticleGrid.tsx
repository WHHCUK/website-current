import { Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React from 'react';
import tw from 'twin.macro';

import { NewsArticle } from '../utils/contentful';
import { isoToShortDate } from '../utils/dates';
import { slugToLabel } from '../utils/strings';

const ArticleGridContainer = tw.div`flex flex-wrap w-full`;

interface Props {
  articles: Pick<
    NewsArticle,
    'author' | 'date' | 'slug' | 'tag' | 'thumbnail' | 'title'
  >[];
}

const ArticleGrid: React.FC<Props> = ({ articles }) => {
  return (
    <ArticleGridContainer>
      {articles.map(({ date, slug, tag, thumbnail, title }) => (
        <article key={slug} tw="mb-6 w-full md:w-1/2 lg:w-1/3 md:px-3">
          <Link to={`/news/${slug}`} key={slug} tw="">
            <div tw="rounded overflow-hidden shadow">
              <GatsbyImage tw="md:h-64 rounded-t" fluid={thumbnail.fluid} />

              <div tw="p-6 rounded-b bg-white min-h-48 md:min-h-56 flex flex-col justify-between  ">
                <h2 tw="my-2 text-xl md:text-2xl font-bold">{title}</h2>
                <div>
                  <span tw="text-sm text-gray-400">{isoToShortDate(date)}</span>
                  <p>
                    <Link
                      tw="text-accent-500 hover:text-accent-600 font-bold"
                      to={`/news/${tag}`}
                    >
                      {slugToLabel(tag)}
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </ArticleGridContainer>
  );
};

export default ArticleGrid;
