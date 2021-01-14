import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';


const axios = require('axios');

const ReadMoreButton = props => {
  return (
  <button 
    type="button" 
    className='btn btn-outline-dark mt-3 mx-auto col-4'
    onClick={() => props.onClick(props.blogSelected)}
  >Read More</button>
  )
}

const BackMainPageButton = props => {
  return (
    <button 
      type="button" 
      className='btn btn-outline-dark mt-3 mx-auto col-4'
      onClick={() => props.onClick(() => props.onClick)}
    >Back to Blog Home</button>
    )
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
          <ReadMoreButton onClick={props.onClick} blogSelected={blogData}/>
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
          <ReadMoreButton onClick={props.onClick} blogSelected={blogData}/>
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



const MainPage = props => {

return (
  <>
    <BlogHeader blogArray={props.allBlogPosts[2]} image_url={props.imageUrl} onClick={props.onClick}/>
    <BlogList blogArray={props.allBlogPosts} image_url={props.imageUrl} onClick={props.onClick}/>
  </>
)

}


const BlogPage = props => {
  return (

    <>
    <div className="p-4 p-md-5 mb-4 text-white rounded bg-light d-flex flex-column flex-md-row">
      <div className="order-md-1 col-md-6 p-0 d-flex justify-content-center align-items-center">
        <img className="rounded-circle bg-light" src={`${props.imageUrl}${props.selectedBlogPost.image_filename}`} alt="Generic placeholder" height='200px' width='200px'/>
      </div>
      <div className="order-md-0 col-md-6 px-0">
        <h1 className="display-4 font-italic text-dark">{props.selectedBlogPost.title}</h1>
      {/* <p className="lead text-dark my-3">{props.selectedBlogPost.summary}</p>
      <p className="lead mb-0"><a href="#" className="text-dark fw-bold">Continue reading...</a></p> */}
      </div>
    </div>
    <div className="p-4 p-md-5 mb-4 text-white rounded bg-light d-flex flex-column flex-md-row">
      <div className="order-md-0 col px-0">
        <p className="lead text-dark my-3">{props.selectedBlogPost.body}</p>
      </div>
    </div>
    <BackMainPageButton onClick={props.onClick} />
    </>
  )
}

const BlogApp = props => {
  const [blogPostSelected, setblogPostSelected] = useState({});
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


  //Transact On The State

  const handleReadMoreClicked = (blogObject) => {
    window.scrollTo({
      top:0,
      //behaviour: 'auto',
      duration: 0,
      transition: 'none',
    })
    setblogPostSelected(blogObject);
  }

  const handleBackMainPageButtonClicked = () => {
    window.scrollTo({
      top:0,
      //behaviour: 'auto',
      duration: 0,
      transition: 'none',
    })
    setblogPostSelected({});
  }

  const image_url = 'images/blog/'

  function isEmptyObject(value) {
    return value && Object.keys(value).length === 0 && value.constructor === Object;
  }


  return (
      <div>
      {isEmptyObject(blogPostSelected) ? (  
        <MainPage allBlogPosts={blogPosts} imageUrl={image_url} onClick={handleReadMoreClicked}/>
      ) : (
        <BlogPage selectedBlogPost={blogPostSelected} imageUrl={image_url} onClick={handleBackMainPageButtonClicked}/>
      )}
      </div>   
      
  )
}

ReactDOM.render(
  <div>
    <BlogApp />
  </div>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
