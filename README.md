# Codeway Project

This repository contains a project developed for Codeway.

## Technologies Used

The project is built using Vue.js, Node.js, Express.js, and Firestore.

## Project Overview

This project manages the CRUD operations for various configurations and includes authentication with Firebase. On the frontend, Vue Router is utilized for navigation.

### Backend

The backend application is implemented as a REST API. The available endpoints are:

- **GET** `api/config?client=X` - Returns a different format of output depending on whether the client parameter is `web` or `mobile`.
- **POST** `api/config`
- **PUT** `api/config`
- **DELETE** `api/config`
- **POST** `signIn` - Logs in a user with email and password. A test user is pre-configured in the code, and their credentials will be auto-filled on the login page when you run the application.
- **POST** `logout`

### Running the Project

- To run the backend application: `npm run dev`
- To run the frontend application: `npm run serve`

Below are some screenshots of the project.

![mobile-view](https://github.com/user-attachments/assets/7ad3e291-d45c-45a8-8abc-5a91222cf0e7)
<img width="1790" alt="Panel2" src="https://github.com/user-attachments/assets/74ddd782-9c4c-433a-9daf-d4b105cd13d7">
<img width="1790" alt="Panel1" src="https://github.com/user-attachments/assets/81b4ce98-ccc3-4c39-9076-df36aff873f7">
