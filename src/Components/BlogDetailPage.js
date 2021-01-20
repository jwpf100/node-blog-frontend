import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

const BlogDetailPage = (props) => {

  const {
    params: { blogId }, 
  } = props.match;
  
  //Initialise the State
  
  const [isLoading, setIsLoading] = useState(true);
  const [blogPost, setBlogPosts] = useState([]); 
  
  const image_url = 'images/blog/'

  useEffect(() => {
  
    if(props.location.transferData !== undefined) {
    setBlogPosts(props.location.transferData.blogData)
    setIsLoading(false);
    } else {
    const nodeBlogURL = `http://localhost:4000/api/blogpost/`
    fetch(`${nodeBlogURL}${blogId}`, {})
      .then((res) => res.json())
      .then((response) => {
        setBlogPosts(response);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
    }
  
  }, [props.location.transferData, blogId]);
  
  //Transact on State

  let tagList;
  if(!isLoading) {
     tagList = blogPost.tags.map(tag => tag.name);
  }


    return (
      <>
        {!isLoading ? 
          (
            <>
              <div className="container-fluid p-3 p-md-4 mb-4 text-white rounded d-flex flex-column justify-content-center align-items-center">
                <div className="h-100 col-lg-8 py-mid-4 d-flex flex-column align-items-start">
                  <h1 className="display-5 font-italic text-dark">{blogPost.title}</h1>
                    <div className='w-100 mt-auto d-flex flex-row justify-content-between'> 
                      <i style={{color: '#f7882f'}} className="">{blogPost.author.first_name} {blogPost.author.family_name}</i>
                      <i className="text-muted mb-0">{DateTime.fromISO(blogPost.post_date).toLocaleString(DateTime.DATE_MED)}</i>
                    </div>
                  <p className="lead text-dark my-3">{blogPost.summary}</p>
                </div>
                <div className="col-lg-8 d-flex justify-content-center">
                  <img className="py-md-3 w-75 h-auto bg-light rounded-circle mb-3" src={`${image_url}${blogPost.image_filename}`} alt="Generic placeholder" />
                </div>
                <div className="order-md-0 col-lg-8 px-0 text-dark" dangerouslySetInnerHTML={{ __html: blogPost.body}}>
                </div>
                <div className='col-lg-8 pt-3 d-flex flex-column justify-content-between'> 
                  <i style={{color: '#f7882f'}} className="">Tags: {tagList.join(' / ')}</i>
                  <Link className="w-100 my-3 text-muted text-left text-decoration-none" to={{
                    pathname:`/`, 
                  }}>Back to Blog Home</Link>
                </div>
              </div>
            </>
          )
          : null 
        }
      </>
    )
  }

export default BlogDetailPage;