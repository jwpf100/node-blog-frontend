import React, { useState, useEffect } from 'react';

import BlogHeader from './BlogHeader'
import BlogList from './BlogList'

const BlogHomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Replace set date et.c with set BlogPosts
  const [blogPosts, setBlogPosts] = useState([]); 

  const image_url = 'images/blog/'

  useEffect(() => {
    
    const allBlogPostsURL = `https://josephfletcher.co.uk/blog-backend/api/blogposts`
    fetch(allBlogPostsURL, {})
    .then((res) => res.json())
    .then((response) => {
      setBlogPosts(sortPostsMostRecent(response));
      setIsLoading(false);
    })
    .catch((error) => console.log(error));
  }, []);
  
  //Transact On The State


  //Functions

  //Arrange items by date - most recent first
  const sortPostsMostRecent = (array) => array.sort((a, b) => {
  let c = new Date(a.post_date);
  let d = new Date(b.post_date);
  return d - c;
})

  return (
    <>
      { !isLoading ? 
        (
          <>
            <BlogHeader blogArray={blogPosts[0]} image_url={image_url} />
            <BlogList blogArray={blogPosts} image_url={image_url} />
          </>
        )
        : null 
      }
    </>
  );
}

export default BlogHomePage;