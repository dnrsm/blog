import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import tw from "twin.macro";
import SEO from "../components/Seo";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import PostList from "../components/PostList";
import { BlogTagArchivesQuery } from "../../types/graphql-types";

export type Props = PageProps<BlogTagArchivesQuery, PageContext>;

type PageContext = {
  humanPageNumber: number;
  limit: number;
  nextPagePath: string;
  numberOfPages: number;
  pageNumber: number;
  previousPagePath: string;
  skip: number;
  tag: string;
};

const heading = css`
  ${tw`flex justify-between items-center`}
`;

const headingTitle = css`
  ${tw`text-3xl mb-3 font-semibold text-gray-900 inline-block`}
`;

const StyledLink = styled(Link)`
  ${tw`hover:text-gray-600 transition duration-300`}
`;

const highlight = css`
  ${tw`text-white pr-1 pl-1`}
  background-color: #000;
`;

const TagArchives: React.FC<Props> = ({
  data,
  pageContext: { tag, nextPagePath, previousPagePath },
}: Props) => {
  const {
    allMdx: { edges: posts },
  } = data;

  return (
    <Layout>
      <SEO title={tag} />
      <div css={heading}>
        <p css={headingTitle}>
          Tag: <span css={highlight}>#{tag}</span>
        </p>
        <StyledLink to="/tags">view all tags</StyledLink>
      </div>
      <PostList posts={posts} />
      <Navigation
        previousPagePath={previousPagePath}
        previousLabel="Newer posts"
        nextPagePath={nextPagePath}
        nextLabel="Older posts"
      />
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogTagArchives($tag: String!) {
    allMdx(
      filter: { frontmatter: { tags: { in: [$tag] } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            path
            tags
          }
        }
      }
    }
  }
`;

export default TagArchives;
