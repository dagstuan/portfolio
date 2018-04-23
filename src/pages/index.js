import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

const IndexPage = ({ data }) => {
  const { title, cover } = data.contentfulHome;

  return (
    <div className="home">
      <Img
        sizes={cover.sizes}
        outerWrapperClassName="home__background__wrapper"
        className="home__background"
      />
      <h1 className="home__title">{title}</h1>
    </div>
  );
};

export const query = graphql`
  query HomeQuery {
    contentfulHome {
      title
      cover {
        sizes(maxHeight: 4000, maxWidth: 4000) {
          ...GatsbyContentfulSizes_withWebp
        }
      }
    }
  }
`;

export default IndexPage;
