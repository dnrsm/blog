import * as React from "react";
import { css } from "@emotion/core";
import tw from "twin.macro";
import { MDXRenderer } from "gatsby-plugin-mdx";
import media from "../styles/customMediaQuery";
import Navigation from "./Navigation";
import PostTagList from "./PostTagList";
import Share from "./Share";
import TOC from "./TOC";
import { Maybe, MdxFrontmatter, Scalars } from "../../types/graphql-types";
import { BlogPostPageContext } from "../gatsby-node";

type Props = {
  body?: Scalars["String"];
  tableOfContents: Maybe<Scalars["JSON"]>;
  frontmatter?: Maybe<MdxFrontmatter>;
  pageContext: BlogPostPageContext;
};

const titleText = css`
  ${tw`mb-2 font-semibold text-4xl leading-snug`}
  color: var(--text-800);

  ${media.phone} {
    ${tw`text-2xl`};
  }
`;

const dateText = css`
  ${tw`text-base mb-2`}
`;

const postWrap = css`
  ${tw`flex flex-row-reverse justify-between items-start`}
  ${media.desktop} {
    ${tw`flex-col`};
  }
`;

const post = css`
  ${tw`max-w-post`}
  ${media.desktop} {
    ${tw`max-w-full`};
  }
`;

const Post: React.FC<Props> = ({
  body,
  tableOfContents,
  frontmatter,
  pageContext,
}) => {
  const { title, date, tags, path } = frontmatter;
  const previousPost = pageContext.previous;
  const nextPost = pageContext.next;
  const previousPagePath = previousPost && previousPost.frontmatter.path;
  const previousLabel = previousPost && previousPost.frontmatter.title;
  const nextPagePath = nextPost && nextPost.frontmatter.path;
  const nextLabel = nextPost && nextPost.frontmatter.title;
  const isBrowser = typeof window !== `undefined`;

  return (
    <>
      <p css={titleText}>{title}</p>
      <p css={dateText}>{date}</p>
      <PostTagList tags={tags} />
      <div css={postWrap}>
        <TOC tableOfContents={tableOfContents.items} />
        <div css={post} className="post">
          <MDXRenderer>{body}</MDXRenderer>
        </div>
      </div>

      <Share
        url={isBrowser ? `${location.origin}${path}` : ""}
        title={title}
        tags={tags}
      />
      <Navigation
        previousPagePath={previousPagePath}
        previousLabel={previousLabel}
        nextPagePath={nextPagePath}
        nextLabel={nextLabel}
      />
    </>
  );
};

export default Post;
