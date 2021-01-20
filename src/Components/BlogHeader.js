import React from 'react';
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

const BlogHeader = props => {
  const blogData = props.blogArray
  const tagList = blogData.tags.map(tag => tag.name)

  return (
      <div className="position-relative p-4 p-md-5 mb-4 text-white rounded bg-light d-flex flex-column flex-md-row">
        <div className="order-md-1 col-md-6 d-flex justify-content-center align-items-center">
          <img className="w-75 h-auto bg-light rounded" src={`${props.image_url}${blogData.image_filename}`} alt="Generic placeholder" />
        </div>
        <div className="h-100 order-md-0 col-md-6 py-mid-4 d-flex flex-column align-items-start">
          <h1 className="display-5 font-italic text-dark">{blogData.title}</h1>
          <p className="lead text-dark my-3">{blogData.summary}</p>
          <Link className="stretched-link text-decoration-none text-muted" to={{
            pathname:`/${blogData._id}`, 
            transferData: {
              blogData:blogData, 
              image_url:props.image_url,
            }
            }}>Read More...</Link>
          <i className="text-muted mb-0">{DateTime.fromISO(blogData.post_date).toLocaleString(DateTime.DATE_MED)}</i>
        </div>
      </div>
  )
}

export default BlogHeader