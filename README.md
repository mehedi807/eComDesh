# eComDesh

Guide to set up and run the eComDesh UI and Server locally.

## Prerequisites

Make sure you have the following installed on your machine:

*   Node.js 
*   npm 

## Server Setup and Running

1.  Navigate to the `server` directory in your terminal:
    ```bash
    cd server
    ```
2.  Install server dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `server` directory .Add required environment variables (eg. Mongo_URI and PORT).
4.  Start the server:
    ```bash
    npm run dev
    ```
    The server should now be running

## UI Setup and Running

1.  Navigate to the `UI` directory in your terminal:
    ```bash
    cd UI
    ```
2.  Install UI dependencies:
    ```bash
    npm install
    ```
3.  Start the UI application.
    ```bash
    npx expo start
    ```
## Installing packages

    ```bash
    #Use this command to install packages to avoid conflicts
    npx expo install <package name>
    ``` 