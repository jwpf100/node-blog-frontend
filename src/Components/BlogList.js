import React from 'react';

import FeaturedPost from './FeaturedPost'

const BlogList = props => (
  <>
    <div className='row mb-2'>
      {props.blogArray.map(blog => <FeaturedPost key={blog._id} blogInfo={blog} image_url={props.image_url} onClick={props.onClick} />)}
    </div>
  </>
)

export default BlogList;