import * as React from "react";
import { graphql, Link, PageProps } from "gatsby";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import tw from "twin.macro";
import media from "../styles/customMediaQuery";
import SEO from "../components/Seo";
import Layout from "../components/Layout";
import TagList from "../components/TagList";
import PageTitle from "../components/PageTitle";
import { BlogTagsQuery } from "../../types/graphql-types";

export type Props = PageProps<BlogTagsQuery>;

const tagItem = css`
  ${tw`mb-10 list-none`}

  > a {
    ${tw`underline text-base`}
    color: var(--text);
  }
`;

const post = css`
  ${tw`list-none`}
`;

const StyledLink = styled(Link)`
  ${tw`no-underline mt-1 mb-1 pt-1 pb-1 block flex justify-between items-center flex-1`}
  border-top: 1px solid #ddd;
  color: var(--text-800);

  ${media.phone} {
    ${tw`block`};
  }
`;

const title = css`
  ${tw`text-base flex-1`}

  ${media.phone} {
    ${tw`text-sm`};
  }
`;

const date = css`
  ${tw`text-xs`}
  color: var(--text-700);
`;

const TagsPage: React.FC<Props> = ({ data }: Props) => {
  const {
    allMdx: { group },
  } = data;
  const tags = group.map((group) => {
    return {
      fieldValue: group.fieldValue,
      totalCount: group.totalCount,
    };
  });

  return (
    <Layout>
      <SEO title={"Tags"} />
      <PageTitle showTagsLink={false}>Tags</PageTitle>
      <TagList tagGroup={tags} />
      <ul>
        {group.map((tag, index) => (
          <li css={tagItem} key={index}>
            <Link id={tag.fieldValue} to={`/tag/${tag.fieldValue}/`}>
              <h3 id={tag.fieldValue}>
                {tag.fieldValue} ({tag.totalCount})
              </h3>
            </Link>
            <ul css={post}>
              {tag.edges.map((item) => (
                <li key={item.node.frontmatter.path}>
                  <StyledLink to={item.node.frontmatter.path}>
                    <p css={title}>{item.node.frontmatter.title}</p>
                    <p css={date}>{item.node.frontmatter.date}</p>
                  </StyledLink>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogTags {
    allMdx(limit: 2000, sort: { fields: [frontmatter___date], order: DESC }) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
        edges {
          node {
            frontmatter {
              path
              title
              date
            }
          }
        }
      }
    }
  }
`;

export default TagsPage;
