import React, { useState, useEffect } from "react";
import { useStaticQuery, graphql } from "gatsby";
import Header from "./Header";
import Footer from "./Footer";
import SEO from "./Seo";
import media from "../styles/customMediaQuery";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { SitePageContext } from "../../types/graphql-types";

type Props = {
  children: React.ReactNode;
  pageType?: string;
  pageContext?: SitePageContext;
};

type Data = {
  site: {
    siteMetadata: {
      blogTitle: string;
      copyrights: string;
      defaultTheme: string;
      headerMenu: HeaderMenu[];
    };
  };
};

type HeaderMenu = {
  title: string;
  path: string;
};

type ContP = {
  minH: string;
};

const Container = styled("div")`
  ${tw`mx-auto relative max-w-1000`}
  min-height: calc(100vh - (52px + 6.5rem));

  ${media.desktop} {
    ${tw`w-full p-4`};
    min-height: ${(props: ContP): string => props.minH};
  }
`;

const main = css`
  ${tw`w-full pb-32`}
`;

const Layout: React.FC<Props> = ({ children, pageType, pageContext }) => {
  const data: Data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          blogTitle
          copyrights
          defaultTheme
          headerMenu {
            title
            path
          }
        }
      }
    }
  `);
  const { blogTitle, copyrights, defaultTheme, headerMenu } =
    data.site.siteMetadata;
  const title = pageContext ? pageContext.frontmatter.title : "";
  const description = pageContext ? pageContext.frontmatter.description : "";
  const [minHeight, setMinHeight] = useState<string>("");

  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    const isSp =
      ua.indexOf("iphone") > 0 ||
      (ua.indexOf("android") > 0 && ua.indexOf("mobile") > 0);
    const wH = window.innerHeight;
    if (isSp) {
      setMinHeight(`calc(${wH}px - (52px + 2rem))`);
    } else {
      setMinHeight(`calc(100vh - (52px + 2rem))`);
    }
  }, []);

  return (
    <>
      <SEO title={title} description={description} />
      <Header
        pageType={pageType}
        blogTitle={blogTitle}
        defaultTheme={defaultTheme}
        headerMenu={headerMenu}
      />
      <Container minH={minHeight}>
        <main css={main}>{children}</main>
        <Footer copyrights={copyrights} />
      </Container>
    </>
  );
};

export default Layout;
