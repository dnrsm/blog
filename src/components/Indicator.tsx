import * as React from "react";
import { css } from "@emotion/core";

type Props = {
  progress: string;
  showProgress: boolean;
};

const progressContainer = css`
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #eee;
  transition: 0.2s;
  opacity: 0;

  &.show {
    opacity: 1;
  }
`;

const progressLine = css`
  width: 100%;
  height: 100%;
  background-color: #333;
  top: 0;
  left: -100%;
  position: absolute;
`;

const Indicator: React.FC<Props> = ({ progress, showProgress }) => {
  return (
    <>
      {showProgress && (
        <div css={progressContainer} className={showProgress ? "show" : ""}>
          <div
            css={progressLine}
            style={{ transform: `translateX(${progress}%)` }}
          />
        </div>
      )}
    </>
  );
};

export default Indicator;
