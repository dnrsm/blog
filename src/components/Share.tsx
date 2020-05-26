import * as React from "react";
import { css } from "@emotion/core";
import tw from "twin.macro";
import media from "../styles/customMediaQuery";
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  LineShareButton,
  LineIcon,
  PocketShareButton,
  PocketIcon,
  TumblrShareButton,
  TumblrIcon,
} from "react-share";

type Props = {
  url: string;
  title: string;
  tags: string[];
};

const shareLink = css`
  ${tw`mt-24`};
  ${media.phone} {
    ${tw`flex justify-center`};
  }
`;

const svg = css`
  path {
    fill: var(--text);
  }
  circle {
    fill: var(--bg);
  }
`;

const Share: React.FC<Props> = ({ url, title, tags }) => {
  const iconSize = 56;

  return (
    <div css={shareLink}>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon round size={iconSize} css={svg} />
      </TwitterShareButton>
      <FacebookShareButton url={url} quote={title}>
        <FacebookIcon round size={iconSize} css={svg} />
      </FacebookShareButton>
      <LineShareButton url={url} title={title}>
        <LineIcon round size={iconSize} css={svg} />
      </LineShareButton>
      <PocketShareButton url={url} title={title}>
        <PocketIcon round size={iconSize} css={svg} />
      </PocketShareButton>
      <TumblrShareButton url={url} title={title} tags={tags}>
        <TumblrIcon round size={iconSize} css={svg} />
      </TumblrShareButton>
    </div>
  );
};

export default Share;
