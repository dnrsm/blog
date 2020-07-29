import * as React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import tw from "twin.macro";
import media from "../styles/customMediaQuery";
import PostTagList from "./PostTagList";

type Props = {
  path: string;
  title: string;
  date: string;
  tags: string[];
};

const StyledLink = styled(Link)`
  ${tw`no-underline text-gray-800 hover:text-gray-600`}
  color: var(--text-800);
`;

const titleText = css`
  ${tw`text-base`};
`;

const dateText = css`
  ${tw`text-sm text-gray-700`}
  color: var(--text-700);

  ${media.phone} {
    ${tw`text-xs`};
  }
`;

const PostListItem: React.FC<Props> = ({ path, title, date, tags }) => {
  return (
    <>
      <StyledLink to={path}>
        <p css={titleText}>{title}</p>
      </StyledLink>
      <p css={dateText}>{date}</p>
      <PostTagList tags={tags} />
    </>
  );
};

export default PostListItem;
