# Agent Development Conventions

This file outlines the conventions and guidelines for agents working on this project.

## General

*   **Code Style:** Follow standard coding conventions for the respective languages (e.g., PEP 8 for Python, Prettier for JavaScript/React).
*   **Commit Messages:** Write clear and concise commit messages. Start with a verb in the imperative mood (e.g., "Add feature," "Fix bug").
*   **Branching:** Create a new branch for each new feature or bug fix. Use a descriptive branch name (e.g., `feature/user-authentication`, `fix/login-button`).

## Frontend

*   **Framework:** React (Create React App)
*   **Styling:** Use CSS modules or a CSS-in-JS library like styled-components for styling. Avoid global CSS.
*   **State Management:** For simple state, use React's built-in hooks (useState, useContext). For more complex state, consider using a library like Redux or Zustand.

## Backend

*   **Framework:** FastAPI (Python)
*   **Database:** We will decide on a database later. For now, we will use in-memory data structures.
*   **API Design:** Follow RESTful principles for API design. Use clear and consistent naming for endpoints.
*   **Dependencies:** All Python dependencies should be listed in `backend/requirements.txt`.
