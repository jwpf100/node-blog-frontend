import React from 'react';
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

const FeaturedPost = props => {
  const blogData = props.blogInfo
  const tagList = blogData.tags.map(tag => tag.name)

  return (
  
  <div className="col-md-6 mb-4">
      <div className="row h-100 g-0 border rounded overflow-hidden flex-column shadow-sm h-md-250 position-relative justify-content-center align-items-center">
        <div className="col px-4 py-3 d-flex flex-column position-static"> 
          <img className="rounded-circle bg-white align-self-center mb-3" src={`${props.image_url}${blogData.image_filename}`} alt="Generic placeholder" width="150" height="150" /> 
          <h3 className="mb-0 pb-3 text-center">{blogData.title}</h3>
          <p className="mb-0 pb-2">{blogData.summary}</p>
          <Link className="mt-auto stretched-link pb-2 text-muted text-decoration-none"to={{
            pathname:`/${blogData._id}`, 
            transferData: {
              blogData:blogData, 
              image_url:props.image_url,
            }
            }}>Read More...</Link>
          <div className='mt-auto d-flex flex-row justify-content-between'> 
            <i style={{color: '#f7882f'}} className="">{tagList.join(' / ')}</i>
            <i className="">{DateTime.fromISO(blogData.post_date).toLocaleString(DateTime.DATE_MED)}</i>
          </div>
        </div>
      </div>
    </div>
  
  )
}

export default FeaturedPost;