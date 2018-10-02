import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import logo from '../assets/logo.svg';

const query = graphql`
  query {
    contentfulHome {
      title
      cover {
        image {
          fluid(maxHeight: 4000, maxWidth: 4000, quality: 100) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`;

const IndexPage = () => {
  return (
    <StaticQuery
      query={query}
      render={data => {
        const {
          cover: { image },
        } = data.contentfulHome;

        return (
          <>
            <div className="home">
              <Img
                fluid={image.fluid}
                style={{
                  width: '100%',
                  margin: '12vh auto',
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                }}
              />
              <div className="title__wrapper">
                <img
                  className="title home__logo-image"
                  src={logo}
                  alt="Dag Stuan Photography"
                />
              </div>
            </div>
          </>
        );
      }}
    />
  );
};

export default IndexPage;
