import React from 'react';
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

const FeaturedPost = props => {
  const blogData = props.blogInfo
  const tagList = blogData.tags.map(tag => tag.name)

  return (
  
  <div className="col-md-6">
      <div className="row g-0 border rounded overflow-hidden flex-column mb-4 shadow-sm h-md-250 position-relative justify-content-center align-items-center text-center">
        <div className="col p-4 d-flex flex-column position-static">
          <h3 className="mb-0">{blogData.title}</h3>
          <img className="rounded-circle bg-white align-self-center" src={`${props.image_url}${blogData.image_filename}`} alt="Generic placeholder" width="150" height="150" /> 
          <strong className="d-inline-block mb-2 text-muted">{tagList.join(' / ')}</strong>
          <div className="mb-1 text-muted">{DateTime.fromISO(blogData.post_date).toLocaleString(DateTime.DATE_MED)}</div>
          <p className="mb-auto">{blogData.summary}</p>
          <Link to={{
            pathname:`/${blogData._id}`, 
            transferData: {
              blogData:blogData, 
              image_url:props.image_url,
            }
            }}>Read More...</Link>
        </div>
      </div>
    </div>
  
  )
}

export default FeaturedPost;