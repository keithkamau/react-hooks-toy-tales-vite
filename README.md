# Toy List Application

## Description
A React CRUD application that allows users to manage a toy collection.
Connected to a local JSON server backend running on `http://localhost:3001`.

## Screenshot
![Toy List App](./screenshot.png)

## Features
- **View all toys** on page load via GET request
- **Add a new toy** by submitting the form via POST request
- **Like a toy** to increment its likes via PATCH request
- **Donate a toy** to remove it from the list via DELETE request

## Setup
1. Clone the repository
2. Run `npm install`
3. Start the backend: `json-server --watch db.json --port 3001`
4. Start the frontend: `npm run dev`

## Tech Stack
- React (useState, useEffect)
- fetch API for HTTP requests
- JSON Server for the backend