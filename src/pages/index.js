import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Helmet from 'react-helmet';

import logo from '../assets/logo.svg';

import { imageMetaTags } from '../utils/metaUtils';

const query = graphql`
  query {
    contentfulHome {
      title
      cover {
        title
        image {
          resize(width: 1200) {
            src
            width
            height
          }
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
          cover: {
            title,
            image: { resize, fluid },
          },
        } = data.contentfulHome;

        return (
          <>
            <Helmet>{imageMetaTags(resize, title)}</Helmet>
            <div className="home">
              <Img
                fluid={fluid}
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
