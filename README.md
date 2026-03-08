# The Personal Book Manager

## Overview
The Personal Book Manager is a web application for organizing, tracking, and managing your personal book collection. It allows users to add, edit, and view books, manage authentication, and provides a dashboard for statistics.

## Features
- User authentication (login, sign-up, logout)
- Add, edit, and view books
- Dashboard with statistics
- Filtering and searching books
- Responsive UI

## Installation & Setup
1. Clone the repository:
	```bash
	git clone <repo-url>
	```
2. Navigate to the project directory:
	```bash
	cd The-Personal-Book-Manager-main
	```
3. Install dependencies:
	```bash
	npm install
	```
4. Set up environment variables in `.env.local`:
	- `MONGODB_URL`: MongoDB connection string
	- `SECRET_KEY`: Secret key for authentication
	- `PUBLIC_BASE_URL`: Base URL for the app (e.g., https://the-personal-book-manager-gamma.vercel.app)
5. Start the development server:
	```bash
	npm run dev
	```

## Environment Variables
Example `.env.local`:
```
MONGODB_URL=mongodb+srv://<user>:<password>@cluster.mongodb.net/?appName=Cluster0
SECRET_KEY=<your-secret-key>
PUBLIC_BASE_URL=https://the-personal-book-manager-gamma.vercel.app
```

## Folder Structure
```
The-Personal-Book-Manager-main/
├── public/
├── src/
│   ├── middleware.js
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.js
│   │   ├── page.js
│   │   └── (root)/
│   │       └── auth/
│   │           ├── layout.jsx
│   │           └── login/
│   │           └── sign-up/
│   ├── api/
│   │   └── auth/
│   │   └── books/
│   │   └── test/
│   ├── books/
│   │   └── add/
│   │   └── edit/
│   ├── dashboard/
│   ├── components/
│   │   └── Applications/
│   │   └── ui/
│   ├── lib/
│   ├── models/
│   └── redux/
├── .env.local
├── package.json
├── README.md
```

## Usage
- Visit the app at your `PUBLIC_BASE_URL`.
- Sign up or log in to manage your books.
- Use the dashboard to view statistics.
- Add, edit, or filter books as needed.

## Contribution
1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a clear description.

## License
This project is licensed under the MIT License.
