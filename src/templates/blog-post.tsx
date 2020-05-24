import * as React from "react";
import { graphql, PageProps } from "gatsby";
import SEO from "../components/Seo";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { BlogPostQuery, SitePageContext } from "../../types/graphql-types";

export type Props = PageProps<BlogPostQuery, SitePageContext>;

const BlogPostTemplate: React.FC<Props> = ({ data, pageContext }) => {
  const { body, frontmatter } = data.mdx;

  return (
    <Layout pageType={"post"}>
      <SEO title={frontmatter.title} description={frontmatter.description} />
      <Post body={body} frontmatter={frontmatter} pageContext={pageContext} />
    </Layout>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPost($path: String) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
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
