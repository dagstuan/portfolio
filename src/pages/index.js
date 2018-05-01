import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import logo from '../assets/logosvg.svg';

const IndexPage = ({ data }) => {
  const {
    title,
    cover: { image },
  } = data.contentfulHome;

  return (
    <div className="home">
      <Img
        sizes={image.sizes}
        style={{
          width: '100%',
          margin: '12vh auto',
          position: 'absolute',
          top: 0,
          bottom: 0,
        }}
      />
      <div className="title__wrapper">
        <img src={logo} alt="Dag Stuan Photography" />
      </div>
    </div>
  );
};

export const query = graphql`
  query HomeQuery {
    contentfulHome {
      title
      cover {
        image {
          sizes(maxHeight: 4000, maxWidth: 4000, quality: 100) {
            ...GatsbyContentfulSizes_withWebp
          }
        }
      }
    }
  }
`;

export default IndexPage;
