import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { css } from "@emotion/core";
import tw from "twin.macro";
import media from "../styles/customMediaQuery";

type Props = {
  tocShow: () => void;
};

const button = css`
  display: none;
  ${media.tablet} {
    ${tw`fixed z-20 bg-white rounded-full flex items-center justify-center shadow-lg`}
    width: 50px;
    height: 50px;
    bottom: 20px;
    right: 20px;
  }
`;

const icon = css`
  color: #1d1d1d;
  font-size: 16px;
`;

const TocButton: React.FC<Props> = ({ tocShow }) => {
  return (
    <div css={button} onClick={tocShow}>
      <FontAwesomeIcon icon={faList} css={icon} />
    </div>
  );
};

export default TocButton;
