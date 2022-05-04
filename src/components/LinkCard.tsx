import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { css } from "@emotion/core";
import media from "../styles/customMediaQuery";

type Props = {
  url: string;
};

const linkCard = css`
  ${tw`flex border rounded-md border-gray-300 border-solid overflow-hidden transition duration-300 hover:bg-gray-100`}
  text-decoration: none !important;
`;

const box = css`
  ${tw`flex flex-col px-5 py-3 flex-1`}
`;

const title = css`
  ${tw`font-bold text-xl`}
`;

const description = css`
  ${tw`text-sm text-gray-600 mb-4`}
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
`;

const urlCss = css`
  ${tw`flex items-center`}
`;

const icon = css`
  ${tw`mr-1`}
`;

const imageBox = css`
  ${tw`w-full h-32 overflow-hidden `}
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
        let title = "";
        let description = "";
        let ogpUrl = "";
        let imageUrl = "";
        Array.from(headEls).map((el) => {
          const name = el.getAttribute("name");
          const tagName = el.tagName;

          if (name === "og:title" || tagName === "title") {
            title = el.getAttribute("content") || el.textContent;
          }
          if (name === "og:description" || name === "description") {
            description = el.getAttribute("content");
          }
          if (name === "og:url") {
            ogpUrl = el.getAttribute("content");
          }
          if (name === "og:image:url") {
            imageUrl = el.getAttribute("content");
          }
        });

        setOgp({
          ...ogp,
          ...{
            title,
            description,
            ogpUrl,
            imageUrl,
          },
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
          <div css={box}>
            <p css={title}>{ogp.title}</p>
            <p css={description}>{ogp.description}</p>
            <p css={urlCss}>
              <img
                css={icon}
                src={`https://www.google.com/s2/favicons?sz=14&domain_url=${ogp.ogpUrl}`}
                alt={ogp.title}
              />
              {ogp.ogpUrl.replace("https://", "")}
            </p>
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
