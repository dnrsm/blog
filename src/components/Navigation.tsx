import * as React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import tw from "twin.macro";
import media from "../styles/customMediaQuery";

type Props = {
  previousPagePath: string;
  previousLabel: string;
  nextPagePath: string;
  nextLabel: string;
};

type StyledLinkProps = {
  to: string;
  textalign: string;
};

const Navigation: React.FC<Props> = ({
  nextPagePath,
  previousPagePath,
  nextLabel,
  previousLabel,
}) =>
  previousPagePath || nextPagePath ? (
    <Pagenation>
      {previousPagePath && (
        <StyledLink to={previousPagePath} textalign="left">
          <span>←</span>
          <span>{previousLabel}</span>
        </StyledLink>
      )}
      {nextPagePath && (
        <StyledLink to={nextPagePath} textalign="right">
          <span>{nextLabel}</span>
          <span>→</span>
        </StyledLink>
      )}
    </Pagenation>
  ) : null;

export default Navigation;

const Pagenation = styled.div`
  ${tw`mt-24  mb-10 flex justify-between`}

  ${media.phone} {
    ${tw`mt-12`};
  }
`;

const StyledLink = styled((props: StyledLinkProps) => <Link {...props} />)`
  ${tw`transition duration-300 text-gray-800 hover:text-opacity-50 underline inline-block`}
  max-width: 50%;
  text-align: ${(props: StyledLinkProps): string => props.textalign};
`;
