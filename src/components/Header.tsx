import React, { useRef, useState, useEffect } from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import tw from "twin.macro";
import Indicator from "./Indicator";
import media from "../styles/customMediaQuery";
import Menu from "./Menu";
import { Helmet } from "react-helmet";

type Props = {
  blogTitle?: string;
  headerMenu: HeaderMenu[];
  pageType?: string;
  defaultTheme: string;
};

type HeaderMenu = {
  title: string;
  path: string;
};

type HeaderProps = {
  showBorder: boolean;
};

const StyledHeader = styled.header`
  ${tw`mt-10 mb-16 flex justify-center sticky top-0 z-50 pt-3 pb-3 overflow-hidden`}
  border-bottom: ${(props: HeaderProps): string =>
    props.showBorder ? "1px solid #ddd" : "0"};
  background-color: var(--bg);

  ${media.desktop} {
    ${tw`mt-2 mb-6 pl-4 pr-4`};
  }
`;

const wrap = css`
  ${tw`flex justify-between max-w-900 w-full`}
`;

const title = css`
  ${tw`text-base text-gray-900 pr-1 pl-1`}
  background-color: var(--highlight);
  color: var(--bg);
`;

const menuWrap = css`
  ${tw`flex items-center`}
`;

const list = css`
  ${tw`flex list-none`}
`;

const toggleBtn = css`
  width: 16px;
  height: 20px;
  margin-left: 16px;
  :focus {
    outline: 0;
  }
`;

const Header: React.FC<Props> = ({
  blogTitle,
  headerMenu,
  pageType,
  defaultTheme,
}) => {
  const headerRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState<string>("0");
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [showBorder, setShowBorder] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  const defaultThemeState =
    (typeof window !== "undefined" && window.localStorage.getItem("theme")) ||
    null;
  const [userTheme, changeTheme] = useState(defaultThemeState);

  const onChangeTheme = (): void => {
    const siteTheme =
      (userTheme || defaultTheme) === "light" ? "dark" : "light";

    changeTheme(siteTheme);

    typeof window !== "undefined" &&
      window.localStorage.setItem("theme", siteTheme);
  };

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
    <>
      <Helmet>
        <body
          className={(userTheme || defaultTheme) === "light" ? "light" : "dark"}
        />
      </Helmet>
      <StyledHeader ref={headerRef} showBorder={showBorder}>
        {showProgress && (
          <Indicator progress={progress} showProgress={showProgress} />
        )}
        <div css={wrap}>
          <Link to={"/"}>
            <h1 css={title}>{blogTitle}</h1>
          </Link>
          <div css={menuWrap}>
            <ul css={list}>
              <Menu headerMenu={headerMenu} />
            </ul>
            <button css={toggleBtn} onClick={onChangeTheme}>
              {userTheme === "light" ? (
                <svg
                  viewBox="-12 0 448 448.04455"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m224.023438 448.03125c85.714843.902344 164.011718-48.488281 200.117187-126.230469-22.722656 9.914063-47.332031 14.769531-72.117187 14.230469-97.15625-.109375-175.890626-78.84375-176-176 .972656-65.71875 37.234374-125.832031 94.910156-157.351562-15.554688-1.980469-31.230469-2.867188-46.910156-2.648438-123.714844 0-224.0000005 100.289062-224.0000005 224 0 123.714844 100.2851565 224 224.0000005 224zm0 0" />
                </svg>
              ) : (
                <svg viewBox="0 0 219.786 219.786">
                  <g>
                    <path d="M109.881,183.46c-4.142,0-7.5,3.358-7.5,7.5v21.324c0,4.142,3.358,7.5,7.5,7.5c4.143,0,7.5-3.358,7.5-7.5V190.96 C117.381,186.817,114.023,183.46,109.881,183.46z" />
                    <path d="M109.881,36.329c4.143,0,7.5-3.358,7.5-7.5V7.503c0-4.142-3.357-7.5-7.5-7.5c-4.142,0-7.5,3.358-7.5,7.5v21.326 C102.381,32.971,105.739,36.329,109.881,36.329z" />
                    <path d="M47.269,161.909l-15.084,15.076c-2.93,2.928-2.931,7.677-0.003,10.606c1.465,1.465,3.385,2.198,5.305,2.198 c1.919,0,3.837-0.732,5.302-2.195l15.084-15.076c2.93-2.928,2.931-7.677,0.003-10.606 C54.946,158.982,50.198,158.982,47.269,161.909z" />
                    <path d="M167.208,60.067c1.919,0,3.838-0.732,5.303-2.196l15.082-15.076c2.929-2.929,2.93-7.677,0.002-10.607 c-2.929-2.93-7.677-2.931-10.607-0.001l-15.082,15.076c-2.929,2.928-2.93,7.677-0.002,10.606 C163.368,59.335,165.288,60.067,167.208,60.067z" />
                    <path d="M36.324,109.895c0-4.142-3.358-7.5-7.5-7.5H7.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.142,3.358,7.5,7.5,7.5h21.324 C32.966,117.395,36.324,114.037,36.324,109.895z" />
                    <path
                      d="M212.286,102.395h-21.334c-4.143,0-7.5,3.358-7.5,7.5c0,4.142,3.357,7.5,7.5,7.5h21.334c4.143,0,7.5-3.358,7.5-7.5
		C219.786,105.754,216.429,102.395,212.286,102.395z"
                    />
                    <path d="M47.267,57.871c1.464,1.464,3.384,2.196,5.303,2.196c1.919,0,3.839-0.732,5.303-2.196c2.929-2.929,2.929-7.678,0-10.607 L42.797,32.188c-2.929-2.929-7.678-2.929-10.606,0c-2.929,2.929-2.929,7.678,0,10.606L47.267,57.871z" />
                    <path d="M172.52,161.911c-2.929-2.929-7.678-2.93-10.607-0.001c-2.93,2.929-2.93,7.678-0.001,10.606l15.074,15.076 c1.465,1.465,3.384,2.197,5.304,2.197c1.919,0,3.839-0.732,5.303-2.196c2.93-2.929,2.93-7.678,0.001-10.606L172.52,161.911z" />
                    <path d="M109.889,51.518c-32.187,0-58.373,26.188-58.373,58.377c0,32.188,26.186,58.375,58.373,58.375 c32.19,0,58.378-26.187,58.378-58.375C168.267,77.706,142.078,51.518,109.889,51.518z M109.889,153.27 c-23.916,0-43.373-19.458-43.373-43.375c0-23.918,19.457-43.377,43.373-43.377c23.919,0,43.378,19.459,43.378,43.377 C153.267,133.812,133.808,153.27,109.889,153.27z" />
                  </g>
                </svg>
              )}
            </button>
          </div>
        </div>
      </StyledHeader>
    </>
  );
};

export default Header;
