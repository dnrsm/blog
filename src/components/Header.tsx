import React, { useRef, useState, useEffect } from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import tw from "twin.macro";
import Indicator from "./Indicator";
import media from "../styles/customMediaQuery";
import Menu from "./Menu";

type Props = {
  blogTitle?: string;
  headerMenu: HeaderMenu[];
  pageType?: string;
};

type HeaderMenu = {
  title: string;
  path: string;
};

type HeaderProps = {
  showBorder: boolean;
};

const StyledHeader = styled.header`
  ${tw`mt-10 mb-16 flex justify-center sticky top-0 z-50 pt-3 pb-3 bg-white overflow-hidden`}
  border-bottom: ${(props: HeaderProps): string =>
    props.showBorder ? "1px solid #ddd" : "0"};

  ${media.desktop} {
    ${tw`mt-2 mb-6 pl-4 pr-4`};
  }
`;

const wrap = css`
  ${tw`flex justify-between max-w-900 w-full`}
`;

const title = css`
  ${tw`text-base text-gray-900 text-white bg-black pr-1 pl-1`}
`;

const list = css`
  ${tw`flex list-none`}
`;

const Header: React.FC<Props> = ({ blogTitle, headerMenu, pageType }) => {
  const headerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState<string>("0");
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [showBorder, setShowBorder] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  useEffect(() => {
    const handleScroll = (): void => {
      const windowH = window.innerHeight;
      const bodyH = document.body.offsetHeight;
      const scrollY = window.scrollY;
      const result = (scrollY / (bodyH - windowH + headerHeight)) * 100;
      setProgress(result.toFixed(2));
      if (scrollY > headerHeight) {
        if (pageType === "post") {
          setShowProgress(true);
        } else {
          setShowBorder(true);
        }
      } else {
        setShowProgress(false);
        setShowBorder(false);
      }
    };

    const headerElem = headerRef.current;
    setHeaderHeight(headerElem.getBoundingClientRect().height);

    window.addEventListener("scroll", handleScroll);
    return (): void => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <StyledHeader ref={headerRef} showBorder={showBorder}>
      {showProgress && (
        <Indicator progress={progress} showProgress={showProgress} />
      )}
      <div css={wrap}>
        <Link to={"/"}>
          <h1 css={title}>{blogTitle}</h1>
        </Link>
        <ul css={list}>
          <Menu headerMenu={headerMenu} />
        </ul>
      </div>
    </StyledHeader>
  );
};

export default Header;
