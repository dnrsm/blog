import * as React from "react";
import { css } from "@emotion/core";
import tw from "twin.macro";
import media from "../styles/customMediaQuery";

type Props = {
  copyrights: string;
};

const footer = css`
  ${tw`mb-8 absolute bottom-0`}
  ${media.desktop} {
    ${tw`mb-4`}
  }
`;

const copyRight = css`
  ${tw`text-xs`}
  color: var(--text-700);
`;

const Footer: React.FC<Props> = ({ copyrights }) => {
  return (
    <footer css={footer}>
      <small css={copyRight}>&copy; {copyrights}</small>
    </footer>
  );
};

export default Footer;
