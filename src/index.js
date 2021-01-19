import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import {useLocation} from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const BlogList = props => (
  <>
    <div className='row mb-2'>
      {props.blogArray.map(blog => <FeaturedPost key={blog._id} blogInfo={blog} image_url={props.image_url} onClick={props.onClick} />)}
    </div>
  </>
)

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
          <div className="mb-1 text-muted">{blogData.post_date}</div>
          <p className="mb-auto">{blogData.summary}</p>
          {/* <a href="#" className="stretched-link"></a> */}
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

const BlogHeader = props => {
  const blogData = props.blogArray
  if (blogData !== undefined) {
  return (
      <div className="p-4 p-md-5 mb-4 text-white rounded bg-light d-flex flex-column flex-md-row">
        <div className="order-md-1 col-md-6 p-0 d-flex justify-content-center align-items-center">
          <img className="rounded-circle bg-light" src={`${props.image_url}${blogData.image_filename}`} alt="Generic placeholder" height='200px' width='200px'/>
        </div>
        <div className="order-md-0 col-md-6 px-0">
          <h1 className="display-4 font-italic text-dark">{blogData.title}</h1>
          <p className="lead text-dark my-3">{blogData.summary}</p>
          <Link to={{
            pathname:`/${blogData._id}`, 
            transferData: {
              blogData:blogData, 
              image_url:props.image_url,
            }
            }}>Read More...</Link>
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

const BlogPage = (props) => {

const {
  params: { blogId }, 
} = props.match;

//Initialise the State

const [isLoading, setIsLoading] = useState(true);
const [blogPost, setBlogPosts] = useState([]); 

// if(props.location.transferData !== undefined ) {

// }

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

}, [blogId]);

  const image_url = 'images/blog/'

  return (
    <>
      {isLoading ? (
        <>
          <h1>Loading</h1>
        </>
      ) : (
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
      )}
    </>
  )
}

const BlogHomePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Replace set date et.c with set BlogPosts
  const [data, setData] = useState();
  const [blogPosts, setBlogPosts] = useState([]); 
  const [blogPostSelected, setblogPostSelected] = useState({});

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

  const image_url = 'images/blog/'

  return (
    <>
      {isLoading ? (
        <>
          <h1>Loading</h1>
        </>
      ) : (
        <>
          <BlogHeader blogArray={blogPosts[2]} image_url={image_url} />
          <BlogList blogArray={blogPosts} image_url={image_url} />
        </>
      )}
    </>
  );
}

const App = () => {

  return (
    <>
      <Router>
          <ScrollToTop />
          <Route exact path="/" component={BlogHomePage} />
          <Route
            path="/:blogId"
            component={BlogPage}
          />
      </Router>
    </>
  );
};



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
