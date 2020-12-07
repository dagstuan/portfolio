import * as React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { FixedObject, FluidObject } from 'gatsby-image';
import { Helmet } from 'react-helmet-async';
import * as classNames from 'classnames';

import * as classes from './index.module.less';
import * as layoutClasses from '../../layouts/layout.module.less';

import logo from '../../assets/logo.svg';

import { imageMetaTags } from '../../utils/metaUtils';
import CoverImage from './CoverImage';
import { useInterval } from '../../hooks/useInterval';

type ContentfulImage = {
  title: string;
  image: {
    resize: FixedObject;
    fluid: FluidObject;
  };
};

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
          fluid(maxHeight: 4096, maxWidth: 4096, quality: 75) {
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
          fluid(maxHeight: 4096, maxWidth: 4096, quality: 75) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
      }
    }
  }
`;

const getNextImage = (currImageIndex: number, numImages: number) =>
  (currImageIndex + 1) % numImages;

const IndexPage = () => {
  const data = useStaticQuery<{
    contentfulHome: { coverImages: ContentfulImage[] };
  }>(query);

  const { coverImages } = data.contentfulHome;

  const [loadedImages, setLoadedImages] = React.useState(
    coverImages.reduce(
      (acc, _, i) => ({ ...acc, [i]: false }),
      {} as Record<number, boolean>
    )
  );

  const setImageLoaded = React.useCallback((index: number) => {
    setLoadedImages((loadedImages) => ({ ...loadedImages, [index]: true }));
  }, []);

  const [visibleImage, setVisibleImage] = React.useState(0);

  const nextImage = getNextImage(visibleImage, coverImages.length);

  const updateVisibleImage = React.useCallback(() => {
    setVisibleImage(nextImage);
  }, [nextImage]);

  useInterval(
    updateVisibleImage,
    loadedImages[visibleImage] && loadedImages[nextImage] ? 7500 : null
  );

  const getLoading = (imageIndex: number) =>
    imageIndex === visibleImage ||
    (loadedImages[visibleImage] && imageIndex == nextImage)
      ? 'eager'
      : 'lazy';

  return (
    <>
      <Helmet>
        {imageMetaTags(coverImages[0].image.resize, coverImages[0].title)}
      </Helmet>
      <div className={classes.home}>
        {coverImages.map((ci: ContentfulImage, index) => {
          return (
            <CoverImage
              key={ci.title}
              title={ci.title}
              fluid={ci.image.fluid}
              index={index}
              onLoad={setImageLoaded}
              loading={getLoading(index)}
              visible={index === visibleImage}
            />
          );
        })}
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
