# Recipe Portal Backend

## Overview

This is the backend for the Recipe Portal application, built using NestJS. It provides a RESTful API for managing recipes, user authentication, and other related functionalities.

## Node Version

Ensure you are using **Node.js v18.x.x** or higher.

## Getting Started

### Prerequisites

- Node.js v18.x.x or higher
- MongoDB installed locally or access to a MongoDB server

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backend
   
2. Install dependencies:
   ```bash
   npm install

3. Create a .env file in the root directory and add the following environment variables:
    ```bash
    ORIGIN_URL (FrontEnd URL)
    MONGO_URI (MongoDb URL)
    PASSWORD_PATTERN (Regex for Password Validation)
    JWT_SCRET (Secret Key)
    JWT_EXPIRE (Expiration time of token)

   Example:
    ORIGIN_URL="http://localhost:3000/"
    MONGO_URI="mongodb://127.0.0.1:27017/database_name"
    PASSWORD_PATTERN="^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])"
    JWT_SCRET ="your_secret_key"
    JWT_EXPIRE="1h"
    
## Running the Application

You can run the application in different modes:

- Development Mode (auto-restarts on changes):
    
    ```bash
    npm run start:dev
    
- Production Mode (builds and starts the app):
    
    ```bash
    npm run build
    npm run start:prod

- Debug Mode (for debugging):
    
    ```bash
    npm run start:debug


