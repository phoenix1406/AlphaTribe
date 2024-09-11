**Stock Post Management API (MERN Stack)**

This is a backend API built using the MERN stack (MongoDB, Express.js, React, and Node.js) that allows users to create and manage stock-related posts. It supports JWT-based authentication, post creation, commenting, liking, and profile management with image uploads stored as base64-encoded strings.

**Features**

User Authentication: Register, login, and manage user profiles with JWT-based authentication.
Stock Post Management: Create, read, update, and delete posts related to stock symbols (e.g., AAPL, TSLA) with optional tags.
Commenting System: Users can comment on posts.
Like System: Users can like or unlike posts.
Profile Management: Users can update their profile, including uploading a profile picture as an image, stored in the database as a base64-encoded string.
Filtering and Sorting: Filter posts by stock symbols or tags, and sort them by creation date or the number of likes.
Pagination: Basic pagination for fetching posts.
Real-time Updates (Optional): Supports Socket.io for real-time updates on new comments and likes.
Technologies
Node.js: Backend runtime environment.
Express.js: Web framework for building APIs.
MongoDB: NoSQL database for storing user data, posts, comments, and likes.
Mongoose: ODM library for MongoDB.
JWT (JSON Web Tokens): For secure authentication.
Multer: Middleware for handling multipart/form-data (used for file uploads).
Socket.io (Optional): Real-time communication for comments and likes.
Cors: To enable cross-origin requests.


**Getting Started**
Follow the steps below to set up and run this project on your local machine.

**Prerequisites**
Node.js installed on your system: Download Node.js
MongoDB installed locally or a cloud MongoDB instance (e.g., MongoDB Atlas).

1.Installation
Clone the repository:
git clone https://github.com/phoenix1406/AlphaTribe.git
cd your-repo-name

2.Install dependencies:

Run the following command in the root directory to install the necessary npm packages:
npm install

3.Set up environment variables:

Create a .env file in the root directory and add the following environment variables:
   
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key

MONGO_URI: The connection string to your MongoDB instance.
JWT_SECRET: A secret key for signing JSON Web Tokens.

4.Set up the database:

Ensure that MongoDB is running locally or that your MongoDB Atlas connection is working.


.
├── config
│   └── db.js           # MongoDB connection setup
    └── jwt.js          # for jsonwebtoken setup 
    └── multerConfig.js # for setting up multer
├── controllers
│   ├── authController.js    # Controller for user authentication
│   ├── postController.js    # Controller for stock posts
│   ├── userController.js    # Controller for user profiles
    ├── commentController.js # controller for comments on the post
    ├── likeController.js    # controller for likes on the post
├── middlewares
│   └── authMiddleware.js    # Middleware for protecting routes
├── models
│   ├── User.js              # User schema
│   ├── Post.js              # Post schema
│   ├── Comment.js           # Comment schema
│   
├── routes
│   ├── authRoutes.js        # Routes for authentication
│   ├── postRoutes.js        # Routes for posts
│   ├── commentRoutes.js     # Routes for comments
│   ├── likeRoutes.js        # Routes for likes
│   └── userRoutes.js        # Routes for user profiles
├── uploads
│   └── # Directory for storing uploaded files (temporary if needed)
├── utils
│   └── errorHandler.js      # Error handling middleware
├── .env                # Environment variables
├── server.js           # Entry point for the app
└── README.md           # Project README file

Running the Application
Start the server:

Run the following command to start the application:

npm run dev


This will start the server on http://localhost:5000.



**API Endpoints**
User Authentication and Management
Register - POST /api/auth/register

Request body: { username, email, password }
Response: { success: true, message: 'User registered successfully', userId }

Login - POST /api/auth/login

Request body: { email, password }
Response: { token, user: { id, username, email } }

Get User Profile - GET /api/user/profile/:userId

Headers: { Authorization: Bearer <token> }
Response: { id, username, bio, profilePicture }

Update User Profile - PUT /api/user/profile

Headers: { Authorization: Bearer <token> }
Form data: { username, bio, profilePicture (file) }
Response: { success: true, message: 'Profile updated', user } 

Stock Post Management
Create a Stock Post - POST /api/posts

Headers: { Authorization: Bearer <token> }
Request body: { stockSymbol, title, description, tags }
Response: { success: true, postId, message: 'Post created successfully' }

Get All Stock Posts (with filters and sorting) - GET /api/posts

Query params: stockSymbol (optional), tags (optional), sortBy (optional)
Response: [ { postId, stockSymbol, title, description, likesCount, createdAt } ]

Get a Single Stock Post (with comments) - GET /api/posts/:postId

Response: { postId, stockSymbol, title, description, likesCount, comments: [...] }

Delete a Stock Post - DELETE /api/posts/:postId

Headers: { Authorization: Bearer <token> }
Response: { success: true, message: 'Post deleted successfully' }

Comments Management
Add a Comment - POST /api/posts/:postId/comments
Headers: { Authorization: Bearer <token> }
Request body: { comment }
Response: { success: true, commentId, message: 'Comment added successfully' }

Like System
Like a Post - POST /api/posts/:postId/like
Headers: { Authorization: Bearer <token> }
Response: { success: true, message: 'Post liked' }


**Postman Collection**
To test all the API routes using Postman, you can use the provided Postman collection in the project. Import the collection into Postman and set up your environment variables like BASE_URL and token.