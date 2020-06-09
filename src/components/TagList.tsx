import * as React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import tw from "twin.macro";
import media from "../styles/customMediaQuery";

type Props = {
  tagGroup: Group[];
};

type Group = {
  fieldValue: string;
  totalCount: number;
};

const tags = css`
  ${tw`flex list-none mb-20 flex-wrap`}

  ${media.phone} {
    ${tw`mb-10`};
  }

  li {
    ${tw`pr-4 pb-2 text-lg`}

    ${media.phone} {
      ${tw`text-base`};
    }

    a {
      ${tw`hover:text-gray-600`}
      padding: 2px 8px;
      background-color: var(--highlight);
      color: var(--bg);
    }
  }
`;

const TagList: React.FC<Props> = ({ tagGroup }) => {
  return (
    <ul css={tags}>
      {tagGroup.length > 0
        ? tagGroup.map((tag, index) => (
            <li key={index}>
              <Link
                to={`/tag/${tag.fieldValue}`}
              >{`#${tag.fieldValue} (${tag.totalCount})`}</Link>
            </li>
          ))
        : null}
    </ul>
  );
};

export default TagList;
