# Project Overview (https://presidio-assignment-indol.vercel.app/)

This project is a comprehensive web application that integrates Firebase Authentication and Firestore Database with a React frontend to create a dynamic user experience. It supports user authentication, allowing users to sign in using their email/password. Once authenticated, users can perform CRUD (Create, Read, Update, Delete) operations on rental properties if they are sellers, or view and express interest in properties if they are buyers. The application utilizes React Router for navigation and Bootstrap for styling, ensuring a responsive and intuitive user interface.


## Key Features

- **User Authentication**: Secure login and registration functionality using Firebase Authentication. Supports email/password and Google sign-in methods.
- **CRUD Operations**: Allows authenticated sellers to add, view, update, and delete their property listings.
- **Interest Expression**: Enables buyers to express interest in properties, revealing the seller's contact details.
- **Responsive Design**: Utilizes Bootstrap to ensure the application is accessible and visually appealing across various devices.
- **Dynamic Navigation**: Implements React Router for seamless navigation between different components of the application.

## How to Operate the Webpage

### Setting Up

1. **Firebase Configuration**: Ensure Firebase is configured with your project. Initialize Firebase Authentication and Firestore Database, enabling email/password and Google sign-in methods.

2. **Running the Application**:
    - Clone the repository to your local machine.
    - Install dependencies using `npm install`.
    - Start the application using `npm start`.

### Navigating the Application

1. **Login/Register**: 
    - Access the login page from the navigation bar.
    - New users can register by clicking the "Register" link and filling out the form.
    - Existing users can log in using their email/password or Google account.

2. **Dashboard (Sellers)**:
    - Upon logging in, sellers are directed to their dashboard where they can view their property listings.
    - Sellers can add a new property by filling out the property form.
    - Each property listing has options to edit or delete the property.
    - Sellers can update property details by clicking the "Edit" button and submitting the updated form.

3. **Viewing Properties (Buyers)**:
    - Buyers can view all listed properties on the "Properties List" page accessible from the navigation bar.
    - Buyers can express interest in a property by clicking the "I'm Interested" button, revealing the seller's contact details.

4. **Applying Filters**:
    - Buyers can apply filters to search for properties based on criteria like city, area, number of bedrooms, etc., to find properties that match their preferences.

5. **Logout**:
    - Users can log out by clicking the "Logout" button in the navigation bar. This will redirect them to the login page.
