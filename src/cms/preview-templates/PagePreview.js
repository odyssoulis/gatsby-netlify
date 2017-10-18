import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'gatsby';
import {PageTemplate} from '../../templates/page'

const PagePreview = ({ entry, getAsset }) => {
  const data = entry.getIn(['data']).toJS()
  
  if (data) {
    return (
      <PageTemplate data={data} />
    )
  } else {
    return <div>Loading...</div>
  }
}

PagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default PagePreview
