# Card Flip Timing Game

A simple full-stack web game built using React, Express.js, and MongoDB Atlas. The game measures how quickly a player flips and completes all cards, then stores the completion time in a leaderboard database.

The fastest score is highlighted in green to indicate the best player time.

## Project Overview

This project was developed to practice full-stack web development concepts such as:

- Frontend and backend integration
- REST API communication
- MongoDB Atlas database connectivity
- React state management
- Express.js server development

Players can:
- Enter their name
- Play the card flip game
- Record their completion time
- View leaderboard rankings

## Features

- Card flipping gameplay
- Completion timer tracking
- High score leaderboard
- Fastest score highlighted in green
- MongoDB Atlas cloud database integration
- Express.js backend API
- React frontend interface

## Tech Stack

### Frontend
- React
- JavaScript
- HTML/CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas

## Backend APIs

### Save Score

```http
GET /NewScore?player=NAME&time=TIME
```

Stores a player's completion time.

### Retrieve Scores

```http
GET /Scores
```

Fetches all recorded player scores.

## Project Structure

```txt
frontend/
backend/
```

## How to Run

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
npm install
node server.js
```

Backend runs on:

```txt
http://localhost:8000
```

## Demo Video

https://youtu.be/4XvN72DaGEY

## Notes

Database credentials were removed from the uploaded source code for security purposes.
