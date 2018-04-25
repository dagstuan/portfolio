import React from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

const IndexPage = ({ data }) => {
  const { title, cover } = data.contentfulHome;

  return (
    <div className="home">
      <Img
        sizes={cover.sizes}
        style={{
          width: '100%',
          margin: '12vh auto',
          position: 'absolute',
          top: 0,
          bottom: 0,
        }}
      />
      <div className="title__wrapper">
        <h1 className="title">
          <span className="title__name">
            <span className="title__first-name">Dag</span>
            <span className="title__last-name">Stuan</span>
          </span>
          <span className="title__sub-title">PHOTOGRAPHY</span>
        </h1>
      </div>
    </div>
  );
};

export const query = graphql`
  query HomeQuery {
    contentfulHome {
      title
      cover {
        sizes(maxHeight: 4000, maxWidth: 4000, quality: 100) {
          ...GatsbyContentfulSizes_withWebp
        }
      }
    }
  }
`;

export default IndexPage;
