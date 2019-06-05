import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Helmet } from 'react-helmet';
import { imageMetaTags } from '../utils/metaUtils';
import { makeThemedStyles } from '../styles/helpers';

import logo from '../assets/logo.svg';

const useStyles = makeThemedStyles(theme => ({
  wrapper: {
    position: 'relative',
    height: '100vh',
  },
  logoWrapper: {
    position: 'absolute',
    height: theme.space.top,
    top: 0,
    left: theme.space.leftRight,
    marginTop: '-3px',
    width: '170px',
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    width: '170px',
  },
  image: {
    width: '100%',
    margin: '12vh auto',
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
}));

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

  const classes = useStyles();

  const {
    cover: {
      title,
      image: { resize, fluid },
    },
  } = data.contentfulHome;

  return (
    <>
      <Helmet>{imageMetaTags(resize, title)}</Helmet>
      <div className={classes.wrapper}>
        <Img
          alt={title}
          fluid={fluid}
          className={classes.image}
          style={{
            position: 'absolute',
          }}
        />
        <div className={classes.logoWrapper}>
          <img
            className={classes.logo}
            src={logo}
            alt="Dag Stuan Photography"
          />
        </div>
      </div>
    </>
  );
};

export default IndexPage;
