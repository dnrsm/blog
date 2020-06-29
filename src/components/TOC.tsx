import * as React from "react";
import { css } from "@emotion/core";
import tw from "twin.macro";
import media from "../styles/customMediaQuery";

type Props = {
  tableOfContents: TocItems[];
};

type TocItems = {
  url: string;
  title: string;
  items?: TocItems[];
};

const toc = css`
  ${tw`max-w-toc w-full sticky right-0`}
  padding-top: 60px;
  top: 1rem;
  ${media.desktop} {
    ${tw`pt-6 max-w-full relative`};
  }
`;

const heading = css`
  ${tw`text-lg pb-2 font-semibold`}
  ${media.desktop} {
    ${tw`text-2xl`};
  }
`;

const list = css`
  ${tw`p-0 list-none text-xs`}
  font-size: 13px;
  color: var(--text-700);
  ${media.desktop} {
    ${tw`text-sm`};
  }
`;

const listItem = css`
  a {
    display: block;
    margin: 2px 0;
    ${tw`pl-2 hover:bg-gray-100`}
  }
`;

const Items: React.FC<{ tableOfContents: TocItems[]; depth: number }> = ({
  tableOfContents,
  depth,
}) => {
  return (
    <ul css={list}>
      {tableOfContents.map((item) => (
        <li
          css={listItem}
          key={item.url}
          style={{
            paddingLeft: depth !== 0 ? "1em" : "0",
          }}
        >
          <a href={item.url}>{item.title}</a>
          {item.items && (
            <Items tableOfContents={item.items} depth={depth + 1} />
          )}
        </li>
      ))}
    </ul>
  );
};

const Toc: React.FC<Props> = ({ tableOfContents }) => {
  return (
    <div css={toc}>
      <h3 css={heading}>Table of Contents</h3>
      <Items tableOfContents={tableOfContents} depth={0} />
    </div>
  );
};

export default Toc;
