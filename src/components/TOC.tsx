import * as React from "react";
import { css } from "@emotion/core";
import tw from "twin.macro";
import media from "../styles/customMediaQuery";

type Props = {
  tableOfContents: Items[];
};

type Items = {
  url: string;
  title: string;
  items?: Items[];
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
  ${tw`text-xl pb-2 font-semibold`}
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

const TableList: React.FC<{ tableOfContents: Items[]; depth: number }> = ({
  tableOfContents,
  depth,
}) => {
  return (
    <>
      <ul css={list}>
        {tableOfContents.map((item) => (
          <li
            css={listItem}
            key={item.url}
            style={{
              paddingLeft: depth !== 0 ? "1em" : "0",
              // paddingBottom: depth === 0 ? "0.25rem" : "0",
            }}
          >
            <a href={item.url}>{item.title}</a>
            {item.items && (
              <TableList tableOfContents={item.items} depth={depth + 1} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

const TOC: React.FC<Props> = ({ tableOfContents }) => {
  return (
    <div css={toc}>
      <summary css={heading}>Table of Contents</summary>
      <TableList tableOfContents={tableOfContents} depth={0} />
    </div>
  );
};

export default TOC;
