import React from 'react';
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


async function getBlogs() {
  try {
    const response = await axios.get(`http://localhost:4000/api/blogposts`);
    console.log(response);
  } catch (error) {
    console.error(error);
  }
}

getBlogs()


const BlogList = props => (
  <div>
    {props.blogArray.map(blog => <Blog blogInfo={blog} />)}
  </div>
)


const Blog = props => {
  const blogData = props.blogInfo
  return (
    <div>
      <div>{blogData.title}</div>
      <div>{blogData.summary}</div>
    </div>
  )
}

ReactDOM.render(
  <div>
    <BlogList blogArray={testData}/>
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
