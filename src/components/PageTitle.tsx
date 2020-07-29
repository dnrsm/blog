import * as React from "react";
import { Link } from "gatsby";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import tw from "twin.macro";
import media from "../styles/customMediaQuery";

type Props = {
  children: React.ReactNode;
  showTagsLink?: boolean;
};

const heading = css`
  ${tw`flex justify-between items-center mb-3 `}
`;

const headingTitle = css`
  ${tw`text-3xl font-semibold inline-block`}
  color: var(--text-900);

  ${media.phone} {
    ${tw`text-2xl`};
  }
`;

const StyledLink = styled(Link)`
  ${tw`hover:text-gray-600`}
  color: var(--text);

  ${media.phone} {
    ${tw`text-sm`};
  }
`;

const PageTitle: React.FC<Props> = ({ children, showTagsLink }) => {
  return (
    <div css={heading}>
      <p css={headingTitle}>{children}</p>
      {showTagsLink ? <StyledLink to="/tags">view all tags</StyledLink> : null}
    </div>
  );
};

PageTitle.defaultProps = {
  showTagsLink: true,
};

export default PageTitle;
