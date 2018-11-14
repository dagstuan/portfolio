import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

const query = graphql`
  query {
    contentfulAbout {
      content {
        childMarkdownRemark {
          html
        }
      }
      image {
        fluid(maxWidth: 400, quality: 100) {
          ...GatsbyContentfulFluid_withWebp
        }
      }
    }
  }
`;

const AboutPage = () => {
  return (
    <StaticQuery
      query={query}
      render={data => {
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
                <Img fluid={image.fluid} />
              </div>
            </div>
          </div>
        );
      }}
    />
  );
};

export default AboutPage;
