import * as React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

type Props = {
  lang?: string;
  meta?: MetaType[];
  title?: string;
  description?: string;
};

type MetaType = {
  name: string;
  content: string;
};

const SEO: React.FC<Props> = ({ lang, meta, title, description }) => {
  const data = useStaticQuery(graphql`
    query DefaultSEOQuery {
      site {
        siteMetadata {
          title
          description
          author
        }
      }
    }
  `);
  const {
    title: siteTitle,
    description: siteDescription,
    author,
  } = data.site.siteMetadata;
  const metaTitle = title || siteTitle;
  const metaDescription = description || siteDescription;

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={metaTitle}
      titleTemplate={title ? `${title} | ${siteTitle}` : siteTitle}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
      ].concat(meta)}
    />
  );
};

SEO.defaultProps = {
  lang: `ja`,
  meta: [],
};

export default SEO;
