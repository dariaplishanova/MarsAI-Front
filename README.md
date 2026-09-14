# MarsAI — Frontend

Frontend application for **MarsAI**, a web platform created for an AI-generated film festival.

This project was developed as part of the **DWWM (Développeur Web et Web Mobile)** training at La Plateforme_, for a real-world client project.

## About the project

MarsAI provides a web interface for discovering and managing content related to an AI film festival.

The application includes different interfaces and features depending on the user's role, including:

- Film catalogue and film information
- User authentication
- Film submission and management
- Jury-related features
- Administration and moderation
- Responsive interfaces for different screen sizes

The frontend communicates with a separate backend API.

## Technologies

- React
- TypeScript
- JavaScript
- HTML / CSS
- REST API
- Git

Additional libraries and tools are used depending on the application's features.

## Project structure

The main source code is organized as follows:

```text
src/
├── assets/       # Images and other static resources
├── components/   # Reusable UI components
├── context/      # Application context and shared state
├── hooks/        # Custom React hooks
├── i18n/         # Internationalization
├── pages/        # Application pages
├── schemas/      # Data validation schemas
├── styles/       # Global and shared styles
├── types/        # TypeScript types
├── utils/        # Utility functions
├── App.tsx       # Main application component
├── App.css       # Application styles
├── main.tsx      # Application entry point
└── setupTests.ts # Test configuration
```text

Getting started
Prerequisites

Make sure you have installed:

Node.js
npm
Installation

Clone the repository:

git clone <FRONTEND_REPOSITORY_URL>

Navigate to the project:

cd <PROJECT_FOLDER>

Install the dependencies:

npm install
Environment variables

If environment variables are required, create a .env file in the project root.

Example:

VITE_API_URL=<BACKEND_API_URL>

Do not commit sensitive information or private credentials to the repository.

Run the application

Start the development server:

npm run dev

The application will be available at the local address provided by the development server.

Backend

This repository contains the frontend application.

The MarsAI backend is maintained in a separate repository.

Backend repository:
<BACKEND_REPOSITORY_URL>

Project status

This project was developed as part of the DWWM training program for a real-world client project.

The frontend depends on the backend API and associated services for some features.

Author

Daria Plishanova

Developed as part of the DWWM training at La Plateforme_.
