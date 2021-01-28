## Blog App - React Frontend

The front end of a blogging app, displaying blogposts using React. Consists of two main pages, the front page displaying summary information for all blogposts, and an individual blogpost page showing the blogpost in full.

Built using React and Bootstrap.  Data comes from API located at http://josephlfletcher.co.uk/blog-backend/api/. Eslint and prettier are set up to ensure code meets acceptable standards. 

Live version hosted on AWS EC2 Instance, served using NginX at my personal domain [josephfletcher.co.uk](https://josephfletcher.co.uk/blog).

## Project Status

This is the MVP.  Need to add navbar and footer, and add functionality to sort blogposts by tag, date, and to search. 

## Project Screen Shot(s)

#### Example:   

## Installation and Setup Instructions

Clone down this repository. You will need `node` and `npm` installed globally on your machine.  

Installation:

`npm install`  

To Start Server:

`npm start`  

To Visit App:

`http://localhost:3000/blog`  

## Reflection

This was a project I undertook while learning React.  I set out to build a simple blog, that would display articles automatically as they are added, with minimal input when it comes to updating the layout.  As such the aim is to allow the user/admin to select the header article, the 4 leading articles, and then the rest will load below.   

It dovetails with another main project I'm undertaking (essentialcoaching.co.uk) and the next step will be to add this front end to replace the current blog page on that project, and allow the client to update blogposts as and when they like. 

One of the main challenges, or areas that still needs to be addressed is that of security.  Allowing the user to display formatted text in the main body means that currently I'm using the dangerouslySetInnerHTML property which can leave the site open to XSS attacks.  Although in this situation, there is only a single user accessing the backend, and therefore the risk is low, a next step would be to make that part of the process more secure. 

Another challenge was getting the routing correct across the server and the static files as in testing I was hosting the react app at the localhost route, but then in production I switched it to /blog.  It won't be a problem next time now I'm clear how it all works, and all the various places I need to update routes, but as a learning exercise it was very valuable. 

I chose to use the `create-react-app` boilerplate to minimize initial setup and invest more time in learning the fundamentals of how react works. In the next iteration I plan on starting from scratch and creating a `webpack.config.js` file to more fully understand the build process.

