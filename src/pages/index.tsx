import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";
import styled from "@emotion/styled";
import tw from "twin.macro";
import SEO from "../components/Seo";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import { IndexQuery } from "../../types/graphql-types";

export type Props = PageProps<IndexQuery>;

const Index: React.FC<Props> = ({ data }) => {
  const {
    allMdx: { edges: posts },
  } = data;

  return (
    <Layout>
      <SEO />
      <Heading>
        <p>Latest</p>
        <Link to="/tags">view all tags</Link>
      </Heading>
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

const Heading = styled.div`
  ${tw`flex justify-between items-center`}
  p {
    ${tw`text-3xl mb-3 font-semibold text-gray-800 inline-block`}
  }
  a {
    ${tw`hover:text-gray-600 transition duration-300`}
  }
`;

const MoreLink = styled(Link)`
  ${tw`text-sm text-gray-800 hover:text-gray-600 transition duration-300`}
`;
