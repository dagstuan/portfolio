import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Helmet } from 'react-helmet';

import logo from '../assets/logo.svg';

import { imageMetaTags } from '../utils/metaUtils';

const query = graphql`
  query {
    contentfulHome {
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
      coverImages {
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

const IndexPage: React.FunctionComponent = () => {
  const data = useStaticQuery(query);

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
          alt={title}
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
};

export default IndexPage;
