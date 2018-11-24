import React, { Component } from 'react';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import { imageMetaTags, titleMetaTags } from '../utils/metaUtils';
import { listenToIntersections } from '../utils/intersectionObserverUtils';

import CategoryImage from './categoryImage';

class Category extends Component {
  constructor(props) {
    super(props);

    this.elemRefs = {};
    this.prevNextRefs = {};

    this.state = {
      loadedImages: [],
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown, false);
  }

  handleKeyDown = event => {
    var refs = this.prevNextRefs[this.visibleId];
    if (!refs) {
      return;
    }

    if (
      event.keyCode === 32 /* spacebar */ ||
      event.keyCode === 75 /* k */ ||
      event.keyCode === 40 /* arrow down */ ||
      event.keyCode === 39 /* arrow right */
    ) {
      event.preventDefault();
      if (refs.nextRef) {
        refs.nextRef.scrollIntoView({ behavior: 'smooth' });
        this.visibleId = refs.nextId;
      }
    } else if (
      event.keyCode === 74 /* j */ ||
      event.keyCode === 37 /* arrow left */ ||
      event.keyCode === 38 /* arrow up */
    ) {
      event.preventDefault();
      if (refs.prevRef) {
        refs.prevRef.scrollIntoView({ behavior: 'smooth' });
        this.visibleId = refs.prevId;
      }
    }
  };

  onImageLoad = id => {
    const { loadedImages } = this.state;

    if (!loadedImages.includes(id)) {
      loadedImages.push(id);
    }

    this.setState({
      loadedImages,
    });
  };

  handleImageRef = (id, ref) => {
    this.elemRefs[id] = ref;

    listenToIntersections(ref, () => {
      if (this.visibleRef !== ref) {
        this.visibleId = id;
      }
    });
  };

  componentDidUpdate() {
    const {
      data: {
        contentfulCategory: { images },
      },
    } = this.props;

    this.prevNextRefs = images.reduce((acc, curr, index) => {
      const { id } = curr;

      let nextId, nextRef, prevId, prevRef;

      if (index < images.length - 1) {
        nextId = images[index + 1].id;
        nextRef = this.elemRefs[nextId];
      }

      if (index > 0) {
        prevId = images[index - 1].id;
        prevRef = this.elemRefs[prevId];
      }

      return {
        ...acc,
        [id]: {
          prevId,
          prevRef,
          nextId,
          nextRef,
        },
      };
    }, {});
  }

  render() {
    const {
      data: {
        contentfulCategory: { title, images },
      },
    } = this.props;

    const { loadedImages } = this.state;

    return (
      <>
        <Helmet>
          <title>{title} - Dag Stuan</title>
          {titleMetaTags(`${title} - Dag Stuan`)}
          {imageMetaTags(images[0].image.resize, images[0].title)}
        </Helmet>
        <div className="title__wrapper">
          <h1 className="title">{title}</h1>
        </div>

        {images && (
          <ul className="category-elems">
            {images.map(image => {
              const { id } = image;

              const anyLoaded = loadedImages.length > 0;
              const isLoaded = loadedImages.includes(id);

              return (
                <CategoryImage
                  wrapperRef={ref => this.handleImageRef(id, ref)}
                  key={id}
                  image={image}
                  critical={anyLoaded && !isLoaded}
                  onImageLoad={() => this.onImageLoad(id)}
                />
              );
            })}
          </ul>
        )}
      </>
    );
  }
}

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
          fixed(width: 1200, quality: 90) {
            ...GatsbyContentfulFixed_withWebp
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

export default Category;
