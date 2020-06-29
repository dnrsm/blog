import * as React from "react";
import { Link } from "gatsby";
import { css } from "@emotion/core";
import tw from "twin.macro";
import media from "../styles/customMediaQuery";

type Props = {
  previousPagePath: string;
  previousLabel: string;
  nextPagePath: string;
  nextLabel: string;
};

const pagenation = css`
  ${tw`mt-24  mb-10 flex justify-between`}

  ${media.phone} {
    ${tw`mt-12 block`};
  }
`;

const navLink = css`
  ${tw`hover:no-underline underline inline-block`}
  max-width: 50%;
  color: var(--text-800);

  ${media.phone} {
    ${tw`max-w-full mb-4`};
  }
`;

const Navigation: React.FC<Props> = ({
  nextPagePath,
  previousPagePath,
  nextLabel,
  previousLabel,
}) =>
  previousPagePath || nextPagePath ? (
    <div css={pagenation}>
      {previousPagePath && (
        <Link to={previousPagePath} css={navLink}>
          <span>←</span>
          <span>{previousLabel}</span>
        </Link>
      )}
      {nextPagePath && (
        <Link to={nextPagePath} css={navLink}>
          <span>{nextLabel}</span>
          <span>→</span>
        </Link>
      )}
    </div>
  ) : null;

export default Navigation;
