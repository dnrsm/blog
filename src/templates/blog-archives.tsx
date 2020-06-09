import * as React from "react";
import { PageProps, graphql } from "gatsby";
import SEO from "../components/Seo";
import Layout from "../components/Layout";
import PostList from "../components/PostList";
import PageTitle from "../components/PageTitle";
import { BlogArchivesQuery } from "../../types/graphql-types";

export type Props = PageProps<BlogArchivesQuery>;

const Archives: React.FC<Props> = ({ data }: Props) => {
  const {
    allMdx: { edges: posts },
  } = data;

  return (
    <Layout>
      <SEO title="Archives" />
      <PageTitle>Archives</PageTitle>
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
