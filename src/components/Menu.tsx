import * as React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import tw from "twin.macro";
import media from "../styles/customMediaQuery";

type Props = {
  headerMenu: HeaderMenu[];
};

type HeaderMenu = {
  title: string;
  path: string;
};

const menu = css`
  a {
    ${tw`text-sm pl-4 underline text-base font-semibold hover:no-underline`};
    color: var(--text-800);

    ${media.phone} {
      ${tw`text-xs`};
    }
  }
`;

const StyledLink = styled(Link)`
  ${tw`text-sm pl-4 text-gray-800 text-base underline text-black`};
  font-weight: 600;
`;

const Menu: React.FC<Props> = ({ headerMenu }) => {
  return (
    <>
      {headerMenu.length > 0
        ? headerMenu.map((menuItem, index) => (
            <li css={menu} key={index}>
              {menuItem.path.indexOf("http") !== -1 ? (
                <a
                  href={menuItem.path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {menuItem.title}
                </a>
              ) : (
                <StyledLink to={menuItem.path}>{menuItem.title}</StyledLink>
              )}
            </li>
          ))
        : null}
    </>
  );
};

export default Menu;
