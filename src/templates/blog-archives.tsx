import * as React from "react";
import { PageProps, graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import tw from "twin.macro";
import SEO from "../components/Seo";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import { BlogArchivesQuery } from "../../types/graphql-types";

export type Props = PageProps<BlogArchivesQuery>;

const heading = css`
  ${tw`flex justify-between items-center`}
`;

const headingTitle = css`
  ${tw`text-3xl mb-3 font-semibold inline-block`}
  color: var(--text-900);
`;

const StyledLink = styled(Link)`
  ${tw`hover:text-gray-600 transition duration-300`}
  color: var(--text);
`;

const Archives: React.FC<Props> = ({ data }: Props) => {
  const {
    allMdx: { edges: posts },
  } = data;

  return (
    <Layout>
      <SEO title="Archives" />
      <div css={heading}>
        <p css={headingTitle}>Archives</p>
        <StyledLink to="/tags">view all tags</StyledLink>
      </div>
      <PostList posts={posts} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogArchives($limit: Int!, $skip: Int!) {
    allMdx(
      filter: { fileAbsolutePath: { regex: "//post//" } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
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

export default Archives;
