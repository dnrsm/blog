import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/core";
import tw from "twin.macro";
import media from "../styles/customMediaQuery";

type Props = {
  copyrights: string;
};

const footer = css`
  ${tw`mb-8 absolute bottom-0 flex items-center`}
  ${media.desktop} {
    ${tw`mb-4`}
  }
`;

const list = css`
  ${tw`list-none flex`}

  li {
    ${tw`ml-2`}
  }
`;

const copyRight = css`
  ${tw`text-xs`}
  color: var(--text-700);
`;

const icon = css`
  color: var(--text);
`;

const Footer: React.FC<Props> = ({ copyrights }) => {
  return (
    <footer css={footer}>
      <small css={copyRight}>&copy; {copyrights}</small>
      <ul css={list}>
        <li>
          <a href="https://github.com/dnrsm" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} css={icon} />
          </a>
        </li>
        <li>
          <a href="https://dnrsm.dev/rss.xml" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faRss} css={icon} />
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
