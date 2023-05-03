const titleAttrValues = ["og:title"];
const descriptionAttrValues = ["og:description"];
const urlAttrValues = ["og:url"];
const imageUrlAttrValues = ["og:image:url", "og:image"];

const titleTagName = "title" as const;
const descriptionTagName = "description" as const;

export type Ogp = {
  title: string;
  description: string;
  ogpUrl: string;
  iconUrl: string;
  imageUrl: string;
};

const hasTitle = (name: string, property: string, tagName: string): boolean => {
  return (
    titleAttrValues.includes(name) ||
    titleAttrValues.includes(property) ||
    tagName === titleTagName
  );
};

const hasDescription = (
  name: string,
  property: string,
  tagName: string
): boolean => {
  return (
    descriptionAttrValues.includes(name) ||
    descriptionAttrValues.includes(property) ||
    tagName === descriptionTagName
  );
};

const hasUrl = (name: string, property: string): boolean => {
  return urlAttrValues.includes(name) || urlAttrValues.includes(property);
};

const hasImageUrl = (name: string, property: string): boolean => {
  return (
    imageUrlAttrValues.includes(name) || imageUrlAttrValues.includes(property)
  );
};

const getAttrContentValue = (el: Element): string => {
  return el.getAttribute("content");
};

export const getOgpValues = (headElements: HTMLCollection): Ogp => {
  const ogp: Ogp = {
    title: "",
    description: "",
    ogpUrl: "",
    iconUrl: "",
    imageUrl: "",
  };

  Array.from(headElements).map((el) => {
    const name = el.getAttribute("name");
    const property = el.getAttribute("property");
    const tagName = el.tagName;

    switch (true) {
      case hasTitle(name, property, tagName):
        ogp.title = getAttrContentValue(el) || el.textContent;
        break;
      case hasDescription(name, property, tagName):
        ogp.description = getAttrContentValue(el);
        break;
      case hasUrl(name, property):
        ogp.ogpUrl = getAttrContentValue(el);
        break;
      case hasImageUrl(name, property):
        ogp.imageUrl = getAttrContentValue(el);
        break;
    }
  });

  return ogp;
};
