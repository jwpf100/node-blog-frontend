import React, { useState, useEffect } from 'react';

import BlogHeader from './BlogHeader'
import BlogList from './BlogList'

const BlogHomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Replace set date et.c with set BlogPosts
  const [blogPosts, setBlogPosts] = useState([]); 

  const image_url = 'images/blog/'

  useEffect(() => {
    
    const allBlogPostsURL = `http://localhost:4000/api/blogposts`
    fetch(allBlogPostsURL, {})
    .then((res) => res.json())
    .then((response) => {
      setBlogPosts(response);
      setIsLoading(false);
    })
    .catch((error) => console.log(error));
  }, []);
    
  //Transact On The State

  return (
    <>
      { !isLoading ? 
        (
          <>
            <BlogHeader blogArray={blogPosts[2]} image_url={image_url} />
            <BlogList blogArray={blogPosts} image_url={image_url} />
          </>
        )
        : null 
      }
    </>
  );
}

export default BlogHomePage;