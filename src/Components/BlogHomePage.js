import React, { useState, useEffect } from 'react'

import BlogHeader from './BlogHeader'
import BlogList from './BlogList'

const BlogHomePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  // Replace set date et.c with set BlogPosts
  const [blogPosts, setBlogPosts] = useState([])

  const imageUrl = 'images/blog/'

  // Arrange items by date - most recent first
  const sortPostsMostRecent = (array) =>
    array.sort((a, b) => {
      const c = new Date(a.post_date)
      const d = new Date(b.post_date)
      return d - c
    })

  useEffect(() => {
    const allBlogPostsURL = `https://josephfletcher.co.uk/blog-backend/api/blogposts`
    fetch(allBlogPostsURL, {})
      .then((res) => res.json())
      .then((response) => {
        setBlogPosts(sortPostsMostRecent(response))
        setIsLoading(false)
      })
      .catch((error) => console.log(error))
  }, [])

  // Transact On The State

  // Functions

  return (
    <>
      {!isLoading ? (
        <>
          <BlogHeader blogArray={blogPosts[0]} imageUrl={imageUrl} />
          <BlogList blogArray={blogPosts} imageUrl={imageUrl} />
        </>
      ) : null}
    </>
  )
}

export default BlogHomePage
