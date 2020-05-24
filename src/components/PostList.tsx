import * as React from "react";
import tw from "twin.macro";
import { css } from "@emotion/core";
import PostListItem from "./PostListItem";
import { Maybe, MdxFrontmatter } from "../../types/graphql-types";

type Props = {
  posts: Array<{
    node: {
      frontmatter?: Maybe<
        Pick<MdxFrontmatter, "title" | "date" | "path" | "tags">
      >;
    };
  }>;
};

const list = css`
  ${tw` mb-5 list-none`}
`;

const PostList: React.FC<Props> = ({ posts }) => {
  return (
    <ul>
      {posts.map(({ node }, index: number) => {
        const {
          frontmatter: { title, date, path, tags },
        } = node;

        return (
          <ul css={list} key={index}>
            <PostListItem path={path} title={title} date={date} tags={tags} />
          </ul>
        );
      })}
    </ul>
  );
};

export default PostList;
