import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { css } from "@emotion/core";
import media from "../styles/customMediaQuery";
import { getOgpValues } from "../domain/ogp";
import { lineClamp } from "../styles/styles";

type Props = {
  url: string;
};

const linkCard = css`
  ${tw`flex border rounded-md border-gray-300 border-solid overflow-hidden transition duration-300 hover:bg-gray-200 h-32 items-center`}
  text-decoration: none !important;
`;

const contentBox = css`
  ${tw`px-5`}

  h1 {
    ${tw`font-bold text-lg pt-0 mb-0  leading-7`}
    ${lineClamp(2)}
  }
`;

const description = css`
  ${tw`text-sm text-gray-600`}
  ${lineClamp(1)}
`;

const linkBox = css`
  ${tw`flex items-center text-sm mt-1`}
`;

const icon = css`
  ${tw`mr-1`}
`;

const imageBox = css`
  ${tw`w-full h-full overflow-hidden `}
  max-width: 220px;

  ${media.phone} {
    max-width: 120px;
  }
`;

const image = css`
  ${tw`h-full object-cover`}
`;

const LinkCard: React.VFC<Props> = ({ url }) => {
  const [ogp, setOgp] = useState({
    title: "",
    description: "",
    ogpUrl: "",
    iconUrl: "",
    imageUrl: "",
  });

  const fetchOgp = async (): Promise<void> => {
    if (!url) return;
    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        const el = new DOMParser().parseFromString(text, "text/html");
        const headEls = el.head.children;
        const ogpValues = getOgpValues(headEls);

        setOgp({
          ...ogp,
          ...ogpValues,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  useEffect(() => {
    fetchOgp();
  }, []);

  return (
    <>
      {ogp.title !== "" ? (
        <a href={url} css={linkCard} target="_blank" rel="noreferrer">
          <div css={contentBox}>
            <h1>{ogp.title}</h1>
            <p css={description}>{ogp.description}</p>
            <div css={linkBox}>
              <img
                css={icon}
                src={`https://www.google.com/s2/favicons?sz=14&domain_url=${ogp.ogpUrl}`}
                alt={ogp.title}
              />
              {ogp.ogpUrl.replace("https://", "")}
            </div>
          </div>
          <div css={imageBox}>
            <img css={image} src={ogp.imageUrl} alt={ogp.title} />
          </div>
        </a>
      ) : (
        <a target="_blank" href={url} rel="noreferrer">
          {url}
        </a>
      )}
    </>
  );
};

export default LinkCard;
