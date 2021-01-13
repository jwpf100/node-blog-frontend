import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';


const axios = require('axios');

// const testData = [
//   {
//     _id:"5f97d9696c94ef5b0a6a5c47",
//     title:"New Blog Post Title 1",
//     author:
//       {
//         _id:"5f970506ac7954477e5f6fa4",
//         first_name:"Joe",
//         family_name:"Fletcher",
//         date_of_birth:"1983-09-01T00:00:00.000Z",
//         __v:0
//       },
//     summary:"New Blog Post Summary 1"
//   },
//   {
//     _id:"5f97d98b0b18cc5b2db95bef",
//     title:"New Blog Post Title 2",
//     "author":
//       {
//         "_id":"5f970506ac7954477e5f6fa4",
//         first_name:"Joe",
//         family_name:"Fletcher",
//         date_of_birth:"1983-09-01T00:00:00.000Z",
//         __v:0
//       },
//     summary:"New Blog Post Summary 2"
//   }
// ]

const BlogList = props => (
  <>
    <div className='row mb-2'>
      {props.blogArray.map(blog => <FeaturedPost key={blog._id} blogInfo={blog} image_url={props.image_url} />)}
    </div>
  </>
)

const FeaturedPost = props => {
  const blogData = props.blogInfo
  const tagList = blogData.tags.map(tag => tag.name)
  console.log(tagList)
  return (
  <div class="col-md-6">
      <div class="row g-0 border rounded overflow-hidden flex-column mb-4 shadow-sm h-md-250 position-relative justify-content-center align-items-center text-center">
        <div class="col p-4 d-flex flex-column position-static">
          <h3 class="mb-0">{blogData.title}</h3>
          <img className="rounded-circle bg-white align-self-center" src={`${props.image_url}${blogData.image_filename}`} alt="Generic placeholder" width="150" height="150" /> 
          <strong class="d-inline-block mb-2 text-muted">{tagList.join(' / ')}</strong>
          <div class="mb-1 text-muted">{blogData.post_date}</div>
          <p class="mb-auto">{blogData.summary}</p>
          <a href="#" class="stretched-link">Continue reading</a>
        </div>
      </div>
    </div>
  )
}

const Blog = props => {
  const blogData = props.blogInfo
  return (
    <div className='col-lg-4 px-4 pb-2 d-flex flex-column'>
      <img className="rounded-circle bg-white align-self-center" src={`${props.image_url}${blogData.image_filename}`} alt="Generic placeholder" width="150" height="150" />
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
      <div class="p-4 p-md-5 mb-4 text-white rounded bg-light d-flex flex-column flex-md-row">
        <div className="order-md-1 col-md-6 p-0 d-flex justify-content-center align-items-center">
          <img className="rounded-circle bg-light" src={`${props.image_url}${blogData.image_filename}`} alt="Generic placeholder" height='200px' width='200px'/>
        </div>
        <div class="order-md-0 col-md-6 px-0">
          <h1 class="display-4 font-italic text-dark">{blogData.title}</h1>
          <p class="lead text-dark my-3">{blogData.summary}</p>
          <p class="lead mb-0"><a href="#" class="text-dark fw-bold">Continue reading...</a></p>
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

const Button = props => {

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
    console.log('Called UseEffect')
  }
  }, [blogPosts.length, getBlogPosts])

const image_url = 'images/blog/'

return (
  <>
    <BlogHeader blogArray={blogPosts[2]} image_url={image_url}/>
    <BlogList blogArray={blogPosts} image_url={image_url}/>
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
