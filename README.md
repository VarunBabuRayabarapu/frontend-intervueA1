React + Vite Frontend

This project is a React frontend built with Vite. It supports HMR (Hot Module Replacement), uses ESLint for code quality, and has a service-based architecture for API calls.

Features

React 18 with functional components and hooks

Vite for fast development and optimized builds

ESLint integrated for code quality

Socket.io integration for real-time updates

Config-based API URLs for flexible environment setup

Service layer for API calls

Clean separation of components, services, and styles

Folder Structure
src/
 ├─ components/          # React components
 ├─ services/            # API service functions
 ├─ App.jsx              # Main app entry
 ├─ main.jsx             # Vite entry point
 └─ utils                # API & environment configuration
Config

API base URL is centralized in config.js:

const config = {
    API_URL: "http://localhost:5000"
};
export default config;

This allows consistent API calls and easy switching between environments (dev, staging, production).

Use commands :
npm install --for installations

npm run dev -- for running the app