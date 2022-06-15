# Pinterest

A website clone for Pinterest made with Django and React.

- The Deployment of the project can be found [here](https://pinterest-mamume.herokuapp.com/app/)

## Overview

The backend is made with Django Rest Framework and contains four apps:

- **user_profile**: for user and profile models, following system, and authentications.
- **board**: for the board, notes, and section models, their relations with pins and profile models.
- **pin**: for pins, notes, comments models, and their relations with user_profile models.

The frontend is made with React.js and contains:

- **Authentication**: Users can login and sign up.
- **Homepage**: List website pins.
- **Profile**: User profile page that contains user's data, pins, and boards.
- **Settings**: Edit user data or delete the user.
- **Board**: Board page that contains its pins.
- **Navigation Bar**: has a search functionality for pins, logged user's data, and a menu for the website pages.

## Installation

- Clone Project
  - `git clone git@github.com:mamume/pinterest.git`
- Enter project folder
  - `cd pinterest`

### Front-End Installation

- Download and Install Node.js
  - [Download Link](https://nodejs.org/en/download/)
- Install [Yarn](https://classic.yarnpkg.com/en/) package manager:
  - [Yarn Installation](https://classic.yarnpkg.com/lang/en/docs/install)
- Install all dependencies:
  - `yarn` or `yarn install`

### Backend Installation

- Install pipenv
  - [Installation Guide](https://pipenv.pypa.io/en/latest/installing/)
- Create a virtual environment and install packages
  - `pipenv install`
- Enter the virtual environment
  - `pipenv shell`

### Database Processing

- Download & install PostgreSQL:
  - [Download Link](https://www.postgresql.org/download/)
- Create database and set its configurations in `pinterest/settings/dev.py` file.
- Create project migrations
  - `python manage.py makemigrations`
- Apply database migrations
  - `python manage.py migrate`

## Launch the Project

- Build the frontend side:
  - `yarn build`
- Run the project:
  - `python manage.py runserver`

## Specifications

- **Authentication**: Sends a request to the server with data and receives the access and refresh tokens that is used for each request to the back-end later.
- **Homepage**:
  - List pins using masonry style.
  - Each pin has:
    - A select menu to save the pin in a specific board.
      - If the user doesn't have a board yet, a create board button will appear.
    - A download button to download the pin.
  - **Create Pin Button**:
    - To create a pin you must select pin source and type its title.
    - There is also an optional description field.
    - After the creating of the pin, it will appear immediately on the top of the homepage.
- **Profile**:
  - **User Data**:
    - profile picture, full name, username, bio and the number of followers and following users.
    - Click on followers or following will open a modal with the list for users and a button beside each of them to follow or unfollow.
  - **Follow**: If it is not the logged user's profile, this button will appear to follow or unfollow that user.
  - **Share**: to share profile on Facebook, Whatsapp, Twitter or copy the profile link.
  - **Edit Profile**: If it is the logged user's profile, this button will appear to navigate to the settings page.
  - **Boards Section**: List all user's boards and shows a preview of their pins.
    - If the board is private no one can view it or its pins but the owner.
    - If there are no boards a message will be displayed to inform the user there are no boards yet.
    - **Create Board Button**:
      - To create a board you should specify the board name and choose if it's public or private.
  - **Pins Section**: List all user pins.
    - On each pin, there is a button to delete the pin and a button to download it.
    - If there are no pins a message will be displayed to inform the user there are no pins yet.
    - **Create Pin Button**: to create a pin with the same functionality as create pin button on the homepage.
- **Board**: List all pins on the board.
  - If the board is private no one can access it but its owner.
  - **Delete Board Button**: to delete the board.
  - **Edit Board Button**: to edit the board name or share type.
- **Settings**: Edit user's data or delete the user.
  - To access it click on the **Edit Profile** button on the profile page.
  - Contains three pages:
    - **Public Profile**: To edit profile picture, first name, last name, website, bio, and username.
    - **Account Settings**: To edit email address, gender, country, or delete the user account.
    - **Security**: To change the user password by adding, old, new, and confirm passwords.
      - There are validations to check if the fields are empty or new and confirm passwords aren't the same.
