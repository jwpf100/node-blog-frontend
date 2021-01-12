import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';


const axios = require('axios');

const testData = [
  {
    _id:"5f97d9696c94ef5b0a6a5c47",
    title:"New Blog Post Title 1",
    author:
      {
        _id:"5f970506ac7954477e5f6fa4",
        first_name:"Joe",
        family_name:"Fletcher",
        date_of_birth:"1983-09-01T00:00:00.000Z",
        __v:0
      },
    summary:"New Blog Post Summary 1"
  },
  {
    _id:"5f97d98b0b18cc5b2db95bef",
    title:"New Blog Post Title 2",
    "author":
      {
        "_id":"5f970506ac7954477e5f6fa4",
        first_name:"Joe",
        family_name:"Fletcher",
        date_of_birth:"1983-09-01T00:00:00.000Z",
        __v:0
      },
    summary:"New Blog Post Summary 2"
  }
]

const BlogList = props => (
  <div className='row text-center pb-5'>
    {props.blogArray.map(blog => <Blog key={blog._id} blogInfo={blog} />)}
  </div>
)


const Blog = props => {
  const blogData = props.blogInfo
  return (
    <div className='col-lg-4 px-4 pb-2 d-flex flex-column'>
      <h3 className='pb-2'>{blogData.title}</h3>
      <p className='blog-trailer'>{blogData.summary}</p>
    </div>
  )
}

const BlogHeader = props => {
  const blogData = props.blogArray
  console.log(blogData)
  if (blogData !== undefined) {
  return (
    <div className='row text-center pb-5'>
      <div className='col-lg-12 px-4 pb-2 d-flex flex-column'>
        <h1>Temporary</h1>
        <h3 className='pb-2'>{blogData.title}</h3>
        <p className='blog-trailer'>{blogData.summary}</p>
      </div>
    </div>
  )
      } else {
        return (
          <div className='row text-center pb-5'>
          <div className='col-lg-12 px-4 pb-2 d-flex flex-column'>
            <h1>Loading</h1>
          </div>
        </div>
        )
      }
}

const App = props => {

  const [blogPosts, getBlogPosts] = useState([]);

  useEffect(() => {
    ///This is getting all blogpost info when the page loads.  We only need to do this once. 
    if (blogPosts.length > 0 ) {
      return
    } else {
    
    const allBlogPostsURL = `http://localhost:4000/api/blogposts`
  
    const getAllBlogPosts = () => {
      axios.get(`${allBlogPostsURL}`)
        .then((response) => {
          const allBlogPosts = response.data;
          getBlogPosts(allBlogPosts)
    })
    .catch(error => console.error(`Error: ${error}`));
    }
    getAllBlogPosts();
  }
  }, [blogPosts.length, getBlogPosts])

return (
  <>
    <BlogHeader blogArray={blogPosts[0]}/>
    <BlogList blogArray={blogPosts}/>
  </>
)

}

ReactDOM.render(
  <div>
    <App />
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
