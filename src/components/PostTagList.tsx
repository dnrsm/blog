import * as React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import tw from "twin.macro";

type Props = {
  tags: string[];
};

const tagList = css`
  ${tw`flex list-none`}

  li {
    ${tw`pr-2 text-sm`}

    a {
      ${tw`text-white bg-black hover:text-gray-600`}
      background-color: var(--highlight);
      color: var(--bg);
      padding: 1px 5px;
    }
  }
`;

const PostTagaList: React.FC<Props> = ({ tags }) => {
  return (
    <ul css={tagList}>
      {tags.length > 0
        ? tags.map((tag, index) => (
            <li key={index}>
              <Link to={`/tag/${tag}`}>{`#${tag}`}</Link>
            </li>
          ))
        : null}
    </ul>
  );
};

export default PostTagaList;
