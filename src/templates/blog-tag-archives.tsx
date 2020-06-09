import * as React from "react";
import { graphql, PageProps } from "gatsby";
import { css } from "@emotion/core";
import tw from "twin.macro";
import SEO from "../components/Seo";
import Layout from "../components/Layout";
import Navigation from "../components/Navigation";
import PostList from "../components/PostList";
import PageTitle from "../components/PageTitle";
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

const highlight = css`
  ${tw`pr-1 pl-1`}
  background-color: var(--highlight);
  color: var(--bg);
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
      <PageTitle>
        Tag: <span css={highlight}>#{tag}</span>
      </PageTitle>
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
