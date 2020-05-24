import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";
import Header from "./Header";
import Footer from "./Footer";
import media from "../styles/customMediaQuery";
import { css } from "@emotion/core";
import tw from "twin.macro";

type Props = {
  children: React.ReactNode;
  pageType?: string;
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

const container = css`
  /* ${tw`flex flex-col items-start mx-auto max-w-800 min-h-screen`}; */
  ${tw`mx-auto relative max-w-900`}
  min-height: 90vh;

  ${media.desktop} {
    ${tw`w-full p-4`};
  }
`;

const main = css`
  ${tw`w-full`}
`;

const spacer = css`
  ${tw`mt-20 h-12 w-1`}
`;

const Layout: React.FC<Props> = ({ children, pageType }) => {
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
  const {
    blogTitle,
    copyrights,
    // defaultTheme,
    headerMenu,
  } = data.site.siteMetadata;

  return (
    <>
      <Header
        pageType={pageType}
        blogTitle={blogTitle}
        // defaultTheme={defaultTheme}
        headerMenu={headerMenu}
      />
      <div css={container}>
        <main css={main}>{children}</main>
        <div css={spacer} />
        <Footer copyrights={copyrights} />
      </div>
    </>
  );
};

export default Layout;
