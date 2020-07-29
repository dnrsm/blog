import * as React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import tw from "twin.macro";
import media from "../styles/customMediaQuery";

type Props = {
  tableOfContents: TocItems[];
  isShow: boolean;
  tocShow: () => void;
};

type ItemsProps = {
  tableOfContents: TocItems[];
  depth: number;
  tocShow?: () => void;
};

type StyledTocProps = {
  isShow: boolean;
};

type TocItems = {
  url: string;
  title: string;
  items?: TocItems[];
};

const StyledToc = styled.div`
  ${tw`max-w-toc w-full sticky right-0`}
  padding-top: 60px;
  top: 1rem;
  background-color: var(--bg);
  ${media.desktop} {
    ${tw`pt-6 max-w-full relative`};
  }
  ${media.tablet} {
    ${tw`fixed z-20 p-8 overflow-scroll`};
    transition: 0.3s;
    top: ${(props: StyledTocProps): string => (props.isShow ? "40%" : "100%")};
    height: 60%;
    border-radius: 8px 8px 0 0;
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
    margin: 2px 0;
    &:hover {
      background-color: var(--bg-gray-100);
      color: #333;
    }
    ${tw`pl-2 block`}
  }
`;

const Items: React.FC<ItemsProps> = ({ tableOfContents, depth, tocShow }) => {
  return (
    <ul css={list}>
      {tableOfContents.map((item) => (
        <li
          css={listItem}
          key={item.url}
          style={{
            paddingLeft: depth !== 0 ? "1em" : "0",
          }}
          onClick={tocShow}
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

const Toc: React.FC<Props> = ({ tableOfContents, isShow, tocShow }) => {
  return (
    <StyledToc isShow={isShow}>
      <h3 css={heading}>Table of Contents</h3>
      <Items tableOfContents={tableOfContents} depth={0} tocShow={tocShow} />
    </StyledToc>
  );
};

export default Toc;
