import { Link } from 'gatsby';
import React from 'react';
import tw from 'twin.macro';

const PageLink = tw(
  Link,
)`mx-1 px-2 rounded hover:bg-gray-50 hover:text-gray-800`;

const DirectionalLink = tw(Link)`px-4 text-gray-400 hover:text-gray-500`;

const ActivePageLink = tw(PageLink)`bg-gray-50 font-bold`;
const Spacer: React.FC = () => <span tw="mx-3">...</span>;

interface Props {
  numPages: number;
  currentPage: number;
  path: string;
  innerPages?: number;
  outerPages?: number;
}

const Pagination: React.FC<Props> = ({
  numPages,
  currentPage,
  path,
  innerPages = 2,
  outerPages = 2,
}) => {
  if (numPages === 1) return null;

  const getPath = (page: number) => `${path}/${page}`.replace(/\/1$/, '');

  return (
    <div>
      <div tw="flex justify-center">
        <nav
          tw="flex items-center bg-white shadow rounded"
          aria-label="Pagination"
        >
          <DirectionalLink
            title="Previous page"
            to={getPath(Math.max(1, currentPage - 1))}
          >
            <svg
              tw="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                strokeWidth="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
          </DirectionalLink>

          <div tw="p-2 border-r border-l text-gray-500">
            {Array.from({ length: numPages }).map((_, index) => {
              const page = index + 1;
              const to = getPath(page);

              if (page === currentPage) {
                return (
                  <ActivePageLink key={to} to={to}>
                    {page}
                  </ActivePageLink>
                );
              }

              if (
                page <= outerPages ||
                (page > currentPage - (innerPages + 1) &&
                  page < currentPage + (innerPages + 1)) ||
                page > numPages - outerPages
              ) {
                return (
                  <PageLink key={to} to={to}>
                    {page}
                  </PageLink>
                );
              }

              if (
                page === currentPage - (innerPages + 1) ||
                page === currentPage + (innerPages + 1)
              ) {
                return <Spacer key={to} />;
              }

              return null;
            })}
          </div>

          <DirectionalLink
            title="Next page"
            to={getPath(Math.min(currentPage + 1, numPages))}
          >
            <svg
              tw="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </DirectionalLink>
        </nav>
      </div>
    </div>
  );
};

export default Pagination;
