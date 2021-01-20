import React from 'react';
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

const BlogHeader = props => {
  const blogData = props.blogArray

  return (
      <div className="p-4 p-md-5 mb-4 text-white rounded bg-light d-flex flex-column flex-md-row">
        <div className="order-md-1 col-md-6 p-0 d-flex justify-content-center align-items-center">
          <img className="rounded-circle bg-light" src={`${props.image_url}${blogData.image_filename}`} alt="Generic placeholder" height='200px' width='200px'/>
        </div>
        <div className="order-md-0 col-md-6 px-0">
          <h1 className="display-4 font-italic text-dark">{blogData.title}</h1>
          <p className="lead text-dark my-3">{blogData.summary}</p>
          <p className="text-dark my-3">{DateTime.fromISO(blogData.post_date).toLocaleString(DateTime.DATE_MED)}</p>
          <Link to={{
            pathname:`/${blogData._id}`, 
            transferData: {
              blogData:blogData, 
              image_url:props.image_url,
            }
            }}>Read More...</Link>
        </div>
      </div>
  )
}

export default BlogHeader