# [facegram](https://facegaram.herokuapp.com/)
An Instagram like app implemented in NodeJS as backend and ReactJs as frontend

This is the Backend Source code

### APIs

1. `GET` - Get all users list

  Send a get request to `/api/users` to get all users list

2. `POST` - Create a new user

  Send a post request to `/api/signup`
  
  Body should look like
  <pre>
  {
    "name": "Your name",
    "email": "your@email.com",
    "password": "GoodPassword",
    "number": 9999999999
  }
  </pre>
  
  
  3. `POST` - Login into account
  
  Send a post request to `/api/login`

  Body should look like
  <pre>
  {
    "email": "your@email.com",
    "password": "GoodPassword",
  }
  </pre>
  
  4. `GET` - get list of all posts
  
  Send a get request to `/api/posts`
  
  
  5. `POST` - Create a new post
  
  Send a post request to `/api/post`

  Body should look like
  <pre>
  {
    "posted_by": "your@email.com",
    "caption": "Your best caption",
    "image": "Your Image URL"
  }
  </pre>
  
