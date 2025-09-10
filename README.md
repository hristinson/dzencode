# dZENcode Test Task

This is a test task for **dZENcode** aimed at assessing skills in working with modern web technologies. The project uses **Node.js**, **React**, **TypeScript**, **MongoDB**, and other related technologies.

## Getting Started

Follow the steps below to get the project up and running on your local machine.

### 1. Clone the Repository

Clone the repository using git:
git clone <repository_url>

### 2. Install Dependencies

Navigate to the root folder of the project and run the following command to install all necessary dependencies:
npm install

### 3. Create the .env File

In the root folder of the project, you need to create a .env file to store sensitive information and configuration variables that should not be committed to version control.

The .env file should include the following environment variables:

MONGODB_URI=<your_mongodb_connection_url>

REACT_APP_API_URL=http://localhost:8888/.netlify/functions/

MONGODB_URI: This is the MongoDB connection URL. You can get this URL from your MongoDB instance (if using MongoDB Atlas, you will find this URL in your Atlas dashboard).

Example:

MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/database_name?retryWrites=true&w=majority

REACT_APP_API_URL: This is the base URL for your serverless API endpoints, typically used when deploying functions on Netlify (or any other serverless platform). It's important that the backend API can interact with the frontend, so this variable tells React where to send requests.

In this case, it's set to http://localhost:8888/.netlify/functions/, which would be valid for local development if you're running your functions locally.

### 4. Run the Project

Once the dependencies are installed and your .env file is properly set up, you can run the project locally using the following command:

netlify dev

### 5. Technologies Used

React: For building the frontend of the application.
Netlify functions: For the backend and server-side logic.
MongoDB: For the database to store and manage data.
SASS: For styles.

test 2
