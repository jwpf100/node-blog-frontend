import React, { useEffect } from 'react';

import { BrowserRouter as Router, Route, useLocation } from "react-router-dom";

import BlogDetailPage from './BlogDetailPage'
import BlogHomePage from './BlogHomePage'

//Function below is added so that on longer blog posts the window doesn't remain scrolled down the screen when switching screens.

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {

  return (
    <>
      <Router>
          <ScrollToTop />
          <Route exact path="/" component={BlogHomePage} />
          <Route
            path="/:blogId"
            component={BlogDetailPage}
          />
      </Router>
    </>
  );
};

export default App;
