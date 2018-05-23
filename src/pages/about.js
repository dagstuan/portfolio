import React from 'react';
import Img from 'gatsby-image';

const AboutPage = ({ data }) => {
  const {
    content: {
      childMarkdownRemark: { html },
    },
    image,
  } = data.contentfulAbout;

  return (
    <div className="about__wrapper">
      <div className="about">
        <div
          className="about__text"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div className="about__image">
          <Img sizes={image.sizes} />
        </div>
      </div>
    </div>
  );
};

export const query = graphql`
  query AboutQuery {
    contentfulAbout {
      content {
        childMarkdownRemark {
          html
        }
      }
      image {
        sizes(maxWidth: 400, quality: 100) {
          ...GatsbyContentfulSizes_withWebp
        }
      }
    }
  }
`;

export default AboutPage;
