import React from 'react';
import {Link} from 'gatsby';
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel as ResponsiveCarousel} from 'react-responsive-carousel';

const CTA = ({title, description, actionTitle, link}) => (
  <div>
    <h1>{title}</h1>
    <p>{description}</p>
    <Link to={link}>{actionTitle}</Link>
  </div>
);

const Carousel = ({title, images}) => (
  <div style={{padding: '20px 200px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
    <h1>{title}</h1>
    {/* <div style={{width: 800, height: 800}}> */}
      <ResponsiveCarousel showArrows={true} infiniteLoop autoPlay>
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} />
            {/* <p className="legend">Legend 1</p> */}
          </div>
        ))}
      </ResponsiveCarousel>
    {/* </div> */}
  </div>
);

const renderSectionComponent = (section, index) => {
  console.log(section.images);
  switch(section.type) {
    case 'CTA': return <CTA {...section} key={index}/>
    case 'Carousel': return <Carousel
      {...section}
      images={section.images.map(image => !!image.childImageSharp ? image.childImageSharp.fluid.src : image)}
    />
    // default: <div>default</div>
  }
}

export const PageTemplate = ({data}) => {
  if (data) {
    return (
      <div>
        <h1>{data.title}</h1>
        {data.sections.map(renderSectionComponent)}
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

const Page = ({data}) => {
  const pageData = data.markdownRemark.frontmatter;

  return (
    <Layout>
      <PageTemplate data={pageData}/>
    </Layout>
  )
}

Page.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
}

export default Page;

export const pageQuery = graphql`
  query page($id: String!) {
    markdownRemark(id: {eq: $id}) {
      frontmatter {
        title
        sections {
          actionTitle
          description
          link
          templateKey
          title
          type
          images {
            childImageSharp {
              fluid(maxWidth: 600, quality: 64) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
