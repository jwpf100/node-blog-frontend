import React from 'react'

import FeaturedPost from './FeaturedPost'

const BlogList = ({ blogArray, imageUrl, onClick }) => (
  <>
    <div className="row mb-2">
      {blogArray.map((blog) => (
        <FeaturedPost
          key={blog._id}
          blogInfo={blog}
          imageUrl={imageUrl}
          onClick={onClick}
        />
      ))}
    </div>
  </>
)

export default BlogList
