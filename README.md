
# Backend Of Movies App 🍿 
This is the backend codebase of the [reelink](https://reelink.vercel.app) project that handles user authentication using Google authentication and allows users to create accounts, sign in, and manage their movie watchlists.


### Prerequisites

Before running the backend server, make sure you have the following prerequisites installed:
- Node.js and npm (Node Package Manager)
- MongoDB
- Google OAuth 2.0 credentials (client ID and client secret)

### Installation

Clone the repository to your local machine:  
- cd reelink-backend  
- npm install  
- npm start  

## Authentication
This application uses Google OAuth 2.0 for user authentication. So after installation ensure that you have obtained the required Google OAuth credentials (client ID and client secret) and set them in the .env file.   

## Database
This project uses MongoDB as the database. Make sure you have MongoDB installed and provide the database URI in the .env file. And make sure your .env is in the root directory.

These are the variables you'll need

````
PORT = 8000                # Port on which the server will run
MONGO_URL = your-uri       # URI of your MongoDB database
CLIENT_ID  = your-client-id
CLIENT_SECRET = your-client-secret
CLIENT_URL = 'http://localhost:3000'

````

## API Endpoints
- '/authRoute/callBack' : Handles the Google OAuth callback and creates or authenticates the user.
- '/logout' : Logs the user OAuth
- '/getUser' : Retrieves the user's profile information.
- '/addToWatchlist' : Adds a title to users watchlist collection



## Frontend
The Frontend of this App can be found [here](https://github.com/dev-palwar/movie-app). So follow the REDME file for Frontend setup




## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

_Fork the repository  
_Create a new branch for your feature or bug fix   
_Make your changes and commit them   
_Push to your branch    
_Create pull request  

> If you have any other questions or need further assistance, feel free to reach out to me on Twitter [@dev_palwar2](https://twitter.com/dev_palwar2).
