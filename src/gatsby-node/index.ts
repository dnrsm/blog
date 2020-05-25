import path from "path";
const archivesTemplate = path.resolve(`./src/templates/blog-archives.tsx`);
const blogPostTemplate = path.resolve(`./src/templates/blog-post.tsx`);
const tagsTemplate = path.resolve(`./src/templates/blog-tags.tsx`);
const tagArchivesTemplate = path.resolve(
  `./src/templates/blog-tag-archives.tsx`
);
import { GatsbyNode } from "gatsby";
import {
  SiteSiteMetadata,
  MdxConnection,
  SitePageContext,
  Mdx,
  Maybe,
} from "../../types/graphql-types";

type Result = {
  allMdx: MdxConnection;
  site: {
    siteMetadata: SiteSiteMetadata;
  };
};

export type BlogPostPageContext = {
  next: Maybe<Mdx>;
  previous: Maybe<Mdx>;
};

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions: { createPage },
}) => {
  createPage<SitePageContext>({
    path: "/tags",
    component: tagsTemplate,
    context: { tag: "tag" },
  });

  const query = `
    {
      allMdx(sort: { order: DESC, fields: frontmatter___date }, limit: 1000) {
        edges {
          node {
            frontmatter {
              path
              title
            }
          }
        }
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
      site {
        siteMetadata {
          postsPerPage
        }
      }
    }
  `;

  const result = await graphql<Result>(query);

  if (result.errors) {
    throw result.errors;
  }

  const posts = result.data.allMdx.edges;
  const {
    site: { siteMetadata },
  } = result.data;

  const tagGroup = result.data.allMdx.group;

  // archive
  const postsPerPage = siteMetadata.postsPerPage;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage<SitePageContext>({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: archivesTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });

  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage<BlogPostPageContext>({
      path: post.node.frontmatter.path,
      component: blogPostTemplate,
      context: {
        next,
        previous,
      },
    });
  });

  tagGroup.forEach((tag) => {
    createPage<SitePageContext>({
      path: `/tag/${tag.fieldValue}`,
      component: tagArchivesTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
};
