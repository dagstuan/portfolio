import React from 'react';
import Img from 'gatsby-image';

const width = '85%';
const height = '80vh';

const paddingTopBottomPx = 22;
const paddingLeftRightPx = 35;

const Category = ({ data }) => {
  const {
    contentfulCategory: { title, images },
  } = data;

  return (
    <div>
      <div className="title__wrapper">
        <h1 className="title">{title}</h1>
      </div>

      {images && (
        <ul className="category-elems">
          {images.map((image, index) => (
            <li className="category-elem" key={index}>
              <Img
                resolutions={image.image.resolutions}
                alt={image.title}
                style={{
                  width: `${width}`,
                  height: `${height}`,
                  paddingLeft: `${paddingLeftRightPx}px`,
                  paddingRight: `${paddingLeftRightPx}px`,
                }}
                imgStyle={{
                  marginTop: `${paddingTopBottomPx}px`,
                  marginBottom: `${paddingTopBottomPx}px`,
                  marginLeft: `${paddingLeftRightPx}px`,
                  width: `calc(100% - ${paddingLeftRightPx * 2}px)`,
                  height: `calc(${height} - ${paddingTopBottomPx * 2}px)`,
                  objectFit: 'contain',
                }}
                backgroundColor="transparent"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
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
          resolutions(width: 1600, quality: 90) {
            # Choose either the fragment including a small base64ed image, a traced placeholder SVG, or one without.
            ...GatsbyContentfulResolutions_withWebp
          }
        }
      }
    }
  }
`;

export default Category;
