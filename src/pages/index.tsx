import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";
import styled from "@emotion/styled";
import tw from "twin.macro";
import SEO from "../components/Seo";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import PageTitle from "../components/PageTitle";
import { IndexQuery } from "../../types/graphql-types";

export type Props = PageProps<IndexQuery>;

const MoreLink = styled(Link)`
  ${tw`text-sm hover:text-gray-600 transition duration-300`}
  color: var(--text-800);
`;

const Index: React.FC<Props> = ({ data }) => {
  const {
    allMdx: { edges: posts },
  } = data;

  return (
    <Layout>
      <SEO />
      <PageTitle>Latest</PageTitle>
      <PostList posts={posts} />
      <MoreLink to="/blog">more...</MoreLink>
    </Layout>
  );
};

export const indexQuery = graphql`
  query Index {
    allMdx(
      filter: { fileAbsolutePath: { regex: "//post//" } }
      sort: { fields: [frontmatter___date], order: DESC }
      limit: 5
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

export default Index;
