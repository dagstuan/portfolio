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
    <div className="about">
      <div className="about__image">
        <Img resolutions={image.resolutions} />
      </div>
      <div className="about__text" dangerouslySetInnerHTML={{ __html: html }} />
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
        resolutions(width: 250, quality: 100) {
          ...GatsbyContentfulResolutions_withWebp
        }
      }
    }
  }
`;

export default AboutPage;
