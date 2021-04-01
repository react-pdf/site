import React from 'react';
import styled from '@emotion/styled';
import { parse, format } from 'date-fns';
import HighlightPop from 'react-highlight-pop';

import * as Test from '../../blog/test.md';
import media from '../../src/styled/media';
import Icon from '../../src/components/UI/Icon';
import Link from '../../src/components/UI/Link';
import { H1 } from '../../src/components/UI/Heading';

const BLOG_POSTS = {
  test: Test,
};

const Main = styled.main`
  display: flex;
  min-height: 100%;

  h3 {
    font-weight: 400 !important;
  }
`;

const Section = styled.article`
  flex: 1;
  width: 100%;
  margin: 0 auto;
  padding: 110px;
  max-width: 1100px;
  overflow-y: ${(props) => props.menuOpened && 'hidden'};

  ${media.tablet} {
    padding: 4em;
  }

  ${media.phone} {
    padding: 1.5em;
    padding-bottom: 3em;
  }
`;

const Back = styled(Link)`
  display: block;
  font-size: 16px;
  margin-bottom: 80px;
  color: ${props => props.theme.gray1};

  span {
    margin-left: 5px;
  }
`;

const CornerGraphicsImage = styled.img`
  top: 0;
  right: 0;
  width: 15%;
  position: absolute;
  pointer-events: none;

  ${media.phone} {
    display: none;
  }
`;

const Metadata = styled.div`
  margin-bottom: 60px;
  color: ${props => props.theme.gray1};
`;

const Separator = styled.span`
  margin: 0 10px;
  `;

const Profile = styled.a`
  text-decoration: none;
  transition: 0.3s linear all;
  color: ${props => props.theme.gray1};

  &:hover {
    color: ${props => props.theme.red};
  }
`;

const parseDate = (value) => {
  const d = parse(value, 'MM/dd/yyyy', new Date());
  return format(d, 'MMMM do, yyyy');
}

// TODO: Add pop
// TODO: Write post
const Blog = ({ slug }) => {
  const Post = BLOG_POSTS[slug];
  const metadata = Post.metadata;

  return (
    <Main>
      <Section>
        <Back href="/">
          <Icon type="arrow-left" />
          <span>Go to Site</span>
        </Back>
        <H1>{metadata?.title}</H1>

        <Metadata>
          <span>By </span>

          <Profile href={`https://github.com/${metadata.author}`} target="__blank">
            @{metadata.author}
          </Profile>

          <Separator>|</Separator>

          <span>{parseDate(metadata.date)}</span>
        </Metadata>

        <HighlightPop>
          <Post.default />
        </HighlightPop>

        <CornerGraphicsImage src="/images/corner-graphics.png" />
      </Section>
    </Main>
  );
};

export async function getServerSideProps(context) {
  const slug = context.query.slug;
  const postExists = !!BLOG_POSTS[slug];

  if (!postExists) {
    context.res.statusCode = 302;
    context.res.setHeader('Location', `/404`);
    return { props: {} };
  }

  return { props: { slug } };
}

export default Blog;