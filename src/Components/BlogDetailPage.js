import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

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
  
    return (
      <>
        {!isLoading ? 
          (
            <>
              <div className="p-4 p-md-5 mb-4 text-dark rounded bg-light d-flex flex-column flex-md-row">
                <div className="order-md-1 col-md-6 p-0 d-flex justify-content-center align-items-center">       
                  <img className="rounded-circle bg-light" src={`${image_url}${blogPost.image_filename}`} alt="Generic placeholder" height='200px' width='200px'/>
                </div>
                <div className="order-md-0 col-md-6 px-0">
                  <h1 className="display-4 font-italic text-dark">{blogPost.title}</h1>
                </div>
              </div>
              <div className="p-4 p-md-5 mb-4 text-dark rounded bg-light d-flex flex-column flex-md-row">
                <div className="order-md-0 col px-0 text-dark" dangerouslySetInnerHTML={{ __html: blogPost.body}}>
                </div>
              </div>
              <Link to={{
                      pathname:`/`, 
                      }}>Back to Blog Home</Link>
              </>
          )
          : null 
        }
      </>
    )
  }

export default BlogDetailPage;