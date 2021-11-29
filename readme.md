<h1 align="center">Sigma test task<h1>

## Description

This is an express.js app, which is written on **TypeScript**, it's using **Mongoose.js** to connect the DB on **MongoDb Atlas** cloud server.

## How to use this app

- First of all you need to go to https://sigma-new-test-task.herokuapp.com/ , to make sure that app is running it should be a **Cannot GET /** on the preview page
- Then you you must open **Postman** app, to send requests to our app
- So, when Postman is opened, you have to import this collection:
  https://www.postman.com/collections/242fc1d3ffe09d04667a

press **import** button on the left side of **Postman** window

<p align="center">
  <img  src="./readme_assets/importButton.png" width="80%">
</p>

- When it's done, lets set some environment variables

  <p align="center">
    <img  src="./readme_assets/environmentalVars.png" width="80%">
  </p>

set he value as

```
https://sigma-new-test-task.herokuapp.com
```

- Then you have to login to system, to create new session, use:

  **create session** request,

  and request body like this:

```
{
    "email": "rubicsCube@gmail.com",
    "password": "1CubeIsCool!"
}
```

It's a hosted user, so if you'll use another data, it may not work

- Then u'll get an Access Token and Refresh Token which will look like:

  ```
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWE0ZTc5MjkzM2ExNjAwMDQ0OWU3NTEiLCJlbWFpbCI6InJ1Ymljc0N1YmVAZ21haWwuY29tIiwiYWdlIjoxOSwibmFtZSI6IlJ1YmljayIsImNyZWF0ZWRBdCI6IjIwMjEtMTEtMjlUMTQ6NDU6MzguNTcyWiIsInVwZGF0ZWRBdCI6IjIwMjEtMTEtMjlUMTQ6NDU6MzguNTcyWiIsIl9fdiI6MCwic2Vzc2lvbiI6IjYxYTRlN2I0OTMzYTE2MDAwNDQ5ZTc1NCIsImlhdCI6MTYzODE5NzE3MiwiZXhwIjoxNjM4MTk4MDcyfQ.mRvFnSgQKbFNsXnudmMV2sjzRgrTjj9LoawFQYmTVaU",
  ```

  ## Its important!!!

  You have to set it up as environment variable called **accessToken**

  Do the same thing with **refreshToken**

## After this preparation you're ready to use the app

- Click on the **create User** request, and change body as you wish, but
  - user's email must be valid and unique
  - age must be greater then 0
  - password must be a string that has minimum length of 8, at least one upper-case, one lowercase English letter, one digit and one symbol from the list '~!@#$%^&\*()\_+{}[]'
  - name is required
  
  That's how you can create new User

- Click on the **get all users** request, to see all users
  choose random user, and set his "_id" value as environment variable called **userId**

- Click on the **get user by id** request, to see info about chosen user

- **delete user** request will delete chosen user

-  **get user's sessions** will show you all of YOURS sessions
  
-  **delete session** will stop YOUR current session

- To create post you have to use **create post** request, just add text in body
  
- You can use **postId** from your created post, or another from db