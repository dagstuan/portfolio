import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import Helmet from 'react-helmet';

import { imageMetaTags, titleMetaTags } from '../utils/metaUtils';

class CategoryElem extends React.Component {
  constructor() {
    super();
    this.containerRef = null;

    this.state = {
      imageWidth: 0,
      imageHeight: 0,
      containerWidth: 0,
      containerHeight: 0,
    };
  }

  setContainerRef = el => (this.containerRef = el);

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  getImageAspectRatio = () => {
    const { image } = this.props;

    const imageWidth = Math.min(
      image.image.fixed.width,
      image.image.file.details.image.width
    );
    const imageHeight = imageWidth / image.image.fixed.aspectRatio;

    return imageWidth / imageHeight;
  };

  updateDimensions = () => {
    const { containerWidth, containerHeight } = this.state;

    const newContainerWidth = this.containerRef.offsetWidth;
    const newContainerHeight = this.containerRef.offsetHeight;

    if (
      containerWidth === newContainerWidth &&
      containerHeight === newContainerHeight
    ) {
      return;
    }

    const aspectRatio = this.getImageAspectRatio();

    const style = {
      containerWidth: newContainerWidth,
      containerHeight: newContainerHeight,
    };

    if (newContainerWidth / newContainerHeight > aspectRatio) {
      style.imageHeight = newContainerHeight + 'px';
      style.imageWidth = (newContainerHeight * aspectRatio).toString() + 'px';
    } else {
      style.imageWidth = newContainerWidth + 'px';
      style.imageHeight = (newContainerWidth / aspectRatio).toString() + 'px';
    }

    this.setState(style);
  };

  render() {
    const { image } = this.props;

    const { imageWidth, imageHeight } = this.state;

    return (
      <li className="category-elem">
        <div
          className="category-elem__image-outer-wrapper"
          ref={this.setContainerRef}
        >
          <div
            className="category-elem__image-wrapper"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          >
            <Img
              fixed={image.image.fixed}
              alt={image.title}
              className="category-elem__image"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </li>
    );
  }
}

const Category = ({ data }) => {
  const {
    contentfulCategory: { title, images },
  } = data;

  return (
    <>
      <Helmet>
        <title>{title} - Dag Stuan</title>
        {titleMetaTags(`${title} - Dag Stuan portfolio`)}
        {images.slice(0, 4).map((image, index) => {
          const {
            image: { resize },
          } = image;

          return imageMetaTags(resize, index);
        })}
      </Helmet>
      <div className="title__wrapper">
        <h1 className="title">{title}</h1>
      </div>

      {images && (
        <ul className="category-elems">
          {images.map((image, index) => (
            <CategoryElem key={index} image={image} />
          ))}
        </ul>
      )}
    </>
  );
};

export const query = graphql`
  query PostQuery($slug: String!) {
    contentfulCategory(slug: { eq: $slug }) {
      title
      slug
      images {
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
