import * as React from "react";
import { graphql, PageProps } from "gatsby";
import SEO from "../components/Seo";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { BlogPostQuery } from "../../types/graphql-types";
import { BlogPostPageContext } from "../gatsby-node";

export type Props = PageProps<BlogPostQuery, BlogPostPageContext>;

const BlogPostTemplate: React.FC<Props> = ({ data, pageContext }) => {
  const { body, tableOfContents, frontmatter } = data.mdx;

  return (
    <Layout pageType={"post"}>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <Post
        body={body}
        tableOfContents={tableOfContents}
        frontmatter={frontmatter}
        pageContext={pageContext}
      />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPost($path: String) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      tableOfContents
      frontmatter {
        title
        date
        tags
        path
        description
      }
    }
  }
`;
