# MERN TODOLIST

this todo list app built with the MERN stack. Create, read, update, and delete todo items. Front-end built with React, back-end with Node.js, Express, and MongoDB. Filter by completed and uncompleted items.

## Features

- **CRUD Operations:** Create, read, update, and delete todo items with ease.
- **Reminders:** Set reminders for your todo items to stay on track.
- **Notifications:** Get notifications for all CRUD operations to stay up to date.
- **Authentication and Authorization:** Secure your app with user authentication and authorization using JWT.
- **User Profile:** Update user avatar and data to personalize your experience.
- **FAQ:** Answer frequently asked questions to help users get started.
- **Animations:** Add a touch of interactivity to your app with Framer Motion animations.

- **User Profile:** Update user avatar and data to personalize your experience and save avatars in Cloudinary using Multer.
- **Form Validation:** Validate all forms using React Hook Form and Yup to ensure data accuracy and consistency.

- **Responsive Design:** Ensure a seamless user experience on any device with a responsive design that adapts to different screen sizes.

## Skills

### Front-end

- **React:** Built the front-end using React, a popular JavaScript library for building user interfaces.
- **TypeScript:** Used TypeScript, a typed superset of JavaScript, to improve code quality and maintainability.
- **Framer Motion:** Used Framer Motion, a production-ready motion library, to create smooth and interactive animations.
- **Form Validation:** Validated all forms using React Hook Form and Yup to ensure data accuracy and consistency.

### Back-end

- **Express:** Built the back-end using Express, a popular Node.js web framework for building APIs and web applications.
- **MongoDB:** Used MongoDB, a NoSQL database, to store and manage data efficiently.
- **RESTful API:** Used Express to create a RESTful API to handle CRUD operations.
- **JWT Authentication:** Implemented user authentication and authorization using JSON Web Tokens (JWT).
- **Cloud Storage:** Saved user avatars in Cloudinary using Multer and Multer-Storage-Cloudinary.
- **Linting:** Used ESLint to maintain code quality and consistency.

Sure, here's an example "How to Install" section for a MERN app:

## How to Install

1. Clone the repository to your local machine:
   ```
   git clone https://github.com/Mahmoudaboelenien19/fullStack-typeScript-React-postgres-Scss-toDoList
   ```
2. Navigate to the project directory:
   ```
   `cd your-repo-name`
   ```
3. Install the dependencies for both the client and the server:

   ```
   npm install && cd client && npm install && cd ..
   ```

4. Create a `.env` file in the root directory of the project and add the following variables:

```
MongoDB_URL=<your-[mongodb] >
SALT=<your-salt>
ACCESS_TOKEN_SECRET=<your-access-token-secret>
REFRESH_TOKEN_SECRET=<your-refresh-token-secret>
Cloud_name=<your-cloudinary-cloud-name>
Api_key=<your-cloudinary-api-key>
Api_`secret=<your-cloudinary-api-secret>
```

Replace the values in angle brackets with your own values. You can obtain your MongoDB URI and Cloudinary credentials by signing up for free accounts on their respective websites.

5. Start the development server:
   ```
   npm run build
   ```
   This will start both the client and the server with hot reloading, allowing you to see changes as you make them.
6. Open your browser and navigate to `http://localhost:3000` to view the app.

That's it! Follow these steps to install the app and start developing. Let me know if you need any further assistance.
