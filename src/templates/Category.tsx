import * as React from 'react';
import {
  useState,
  FunctionComponent,
  useCallback,
  createRef,
  useRef,
  useEffect,
  RefObject,
  memo,
} from 'react';
import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet-async';

import * as classes from './category.module.less';
import * as layoutClasses from '../layouts/layout.module.less';

import { imageMetaTags, titleMetaTags } from '../utils/metaUtils';

import CategoryImage from './CategoryImage';
import { ContentfulCategory as IContentfulCategory } from '../types/category';
import useKeyPress from '../hooks/useKeyPress';

export const query = graphql`
  query PostQuery($slug: String!) {
    contentfulCategory(slug: { eq: $slug }) {
      title
      slug
      images {
        id
        title
        image {
          resize(width: 1200) {
            src
            width
            height
          }
          fluid(maxWidth: 2500, quality: 75) {
            ...GatsbyContentfulFluid_withWebp
            aspectRatio
          }
          file {
            details {
              image {
                width
              }
            }
          }
        }
      }
    }
  }
`;

interface ICategoryPageProps {
  data: {
    contentfulCategory: IContentfulCategory;
  };
}

const CategoryPage: FunctionComponent<ICategoryPageProps> = ({
  data: {
    contentfulCategory: { title, images },
  },
}) => {
  const imageRefs = useRef([...images.map((_) => createRef<HTMLElement>())]);
  const [anyLoadedImages, setAnyLoadedImages] = useState(false);
  const [visibleImageIndex, setVisibleImageIndex] = useState<number>(0);

  const onImageLoad = useCallback(() => {
    setAnyLoadedImages(true);
  }, []);

  const setVisibleImageIndexCallback = useCallback((index: number) => {
    setVisibleImageIndex(index);
  }, []);

  const prevKeyPressed = useKeyPress(
    { key: ' ', shiftKey: true },
    { key: 'j' },
    { key: 'ArrowLeft' },
    { key: 'ArrowUp' }
  );
  const nextKeyPressed = useKeyPress(
    { key: ' ' },
    { key: 'k' },
    { key: 'ArrowRight' },
    { key: 'ArrowDown' }
  );

  useEffect(() => {
    let nextRef: RefObject<HTMLElement> = {
      current: null,
    };

    if (prevKeyPressed && visibleImageIndex > 0) {
      nextRef = imageRefs.current[visibleImageIndex - 1];
    } else if (nextKeyPressed && visibleImageIndex < images.length) {
      nextRef = imageRefs.current[visibleImageIndex + 1];
    }

    if (nextRef && nextRef.current) {
      nextRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [imageRefs, prevKeyPressed, nextKeyPressed]);

  return (
    <>
      <Helmet>
        <title>{title} - Dag Stuan</title>
        {titleMetaTags(`${title} - Dag Stuan`)}
        {imageMetaTags(images[0].image.resize, images[0].title)}
      </Helmet>
      <div className={layoutClasses.title__wrapper}>
        <h1 className={layoutClasses.title}>{title}</h1>
      </div>

      {images && (
        <ul className={classes.categoryElems}>
          {images.map((image, index) => {
            const { id } = image;

            return (
              <CategoryImage
                imageRef={imageRefs.current[index]}
                key={id}
                index={index}
                image={image}
                critical={anyLoadedImages}
                onImageLoad={onImageLoad}
                onImageVisible={setVisibleImageIndexCallback}
              />
            );
          })}
        </ul>
      )}
    </>
  );
};

export default memo(CategoryPage);
