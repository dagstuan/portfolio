import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import Helmet from 'react-helmet';

import logo from '../assets/logo.svg';

const query = graphql`
  query {
    contentfulHome {
      title
      cover {
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
            image: { resize, fluid },
          },
        } = data.contentfulHome;

        return (
          <>
            <Helmet>
              <meta property="og:image" content={resize.src} />
              <meta property="og:image:width" content={resize.width} />
              <meta property="og:image:height" content={resize.height} />

              <meta property="twitter:image0:src" content={resize.src} />
            </Helmet>
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
