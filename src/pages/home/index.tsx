import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import { Helmet } from 'react-helmet-async';
import * as classNames from 'classnames';
import * as nprogress from 'nprogress';

import * as classes from './index.module.less';
import * as layoutClasses from '../../layouts/layout.module.less';

import logo from '../../assets/logo.svg';

import { imageMetaTags } from '../../utils/metaUtils';
import useWhyDidYouUpdate from '../../hooks/useWhyDidYouUpdate';

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

const IndexPage = () => {
  const data = useStaticQuery(query);

  const {
    cover: {
      title,
      image: { resize, fluid },
    },
  } = data.contentfulHome;

  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    if (isLoaded && nprogress.isStarted()) {
      nprogress.done();
    }

    if (!isLoaded && !nprogress.isStarted()) {
      nprogress.start();
    }
  }, [isLoaded]);

  const onImageLoad = React.useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Helmet>{imageMetaTags(resize, title)}</Helmet>
      <div className={classes.home}>
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
          onLoad={onImageLoad}
        />
        <div className={layoutClasses.title__wrapper}>
          <img
            className={classNames(layoutClasses.title, classes.home__logoImage)}
            src={logo}
            alt="Dag Stuan Photography"
          />
        </div>
      </div>
    </>
  );
};

export default React.memo(IndexPage);
