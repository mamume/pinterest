# Pinterest Back-End

A back-end clone for the Pinterest website made with Django Rest Framework.

- The front-end project can be found [here](https://github.com/mamume/pinterest-front/).
- The Deployment of the project can be found [here](https://pinterest-final.herokuapp.com/)

## Overview

This project is a back-end clone for the Pinterest website made with Django Rest Framework. The project contains four apps:

- **account**: for user account models, follow relations, authentications, and models serializers.
- **board**: for the board, notes, and section models, their relations with pins and account models and models serializers.
- **pin**: for pins, notes, comments models, their relations with account models and models serializers.
- **user_profile**: for customizing returned data from other apps models.

## Installation

- Clone Project
  - `git clone https://github.com/mamume/pinterest-back.git`
- Enter project folder
  - `cd pinterest-back`
- Install `venv`
  - `pip install venv`
- Create a virtual environment
  - `python -m venv <venv_name>`
- Enter virtual environment
  - `source <venv_name>/bin/activate`
- Install requires libraries
  - `pip install -r requirements.txt`
- Add a secret key to `.env` file

## Database Processing

- Download & install PostgreSQL:
  - [Download Link](https://www.postgresql.org/download/)
- Create database and set its configurations in `.env` file
- Create project migrations
  - `python manage.py makemigrations`
- Apply database migrations
  - `python manage.py migrate`

## Start Project

- To start the project run:
  - `python manage.py runserver`

## Pinterest Front-End

A Pinterest front-end clone using React.js.

- The back-end project can be found [here](https://github.com/mamume/pinterest-back/).
- The Deployment of the project can be found [here](https://pinterest-final.herokuapp.com/)

## Front-End Overview

This project is a front-end clone for the Pinterest website. The project contains:

- **Authentication**: Users can do normal or social login and signup, or reset their password.
- **Homepage**: List website pins.
- **Profile**: User profile page that contains user data, pins, and boards.
- **Settings**: Edit user data.
- **Board**: Board page that contains its pins.
- **Navigation Bar**: Which has the Pinterest logo, logged user profile picture, and a search bar to search for pins.

## Front-End Installation

- Clone the project repo:
  - `git clone https://github.com/mamume/pinterest-front.git`
- In dependencies:
  - Download and Install Node.js
    - [Download Link](https://nodejs.org/en/download/)
  - Install [Yarn](https://classic.yarnpkg.com/en/) package manager:
    - [Yarn Installation](https://classic.yarnpkg.com/lang/en/docs/install)
  - Change directory to the project folder:
    - `cd pinterest-front`
  - Install all dependencies:
    - `yarn` or `yarn install`

## Front-End Start Project

- To start the project run:
  - `yarn start`
- To build the project run:
  - `yarn build`

## Specifications

- **Authentication**: Sends a request to the server with data and receives an access token that is used for each request to the back-end later.
  - **Login**: User can do normal or social login.
    - If the user logged in before, the website will remember their email.
  - **Signup**: Normal or social signup.
- **Homepage**:
  - List pins using masonry style.
  - Each pin has:
    - A select menu for the user board that lets the user save the pin in one of their boards.
      - If the user doesn't have a board yet, a create board button will appear.
    - A download button to download the pin.
    - It has a create pin button to create a pin:
    - To create a pin you must select pin source and type its title.
    - There is also an optional description field.
    - After the creating of the pin, it will appear immediately on the top of the homepage.
- **Profile**:
  - Display user data: profile picture, full name, username, bio and number of followers and following users.
    - Click on folowers or following will open a model with the list for users and a button beside each of them to follow or unfollow.
  - **Follow**: If it is not the logged user profile, this button will appear to follow or unfollow that user.
  - **Share**: to share profile on Facebook, Whatsapp, Twitter or copy the profile link.
  - **Edit Profile**: If it is the logged user profile, this button will appear to navigate to the settings page.
  - **Boards Section**: List all user boards and shows with a preview of their pins.
    - If the board is private no one can view it or its pins but the owner.
    - If there are no boards a message will be displayed to inform the user there are no boards yet.
    - It has a create board button:
      - To create a board you should specify the board name and share option.
  - **Pins Section**: List all user pins.
    - On each pin, there is a button to delete the pin and a button to download it.
    - If there are no pins a message will be displayed to inform the user there are no pins yet.
    - It has a create pin button to create a pin with the same functionality as create pin button on the homepage.
  - **Board**: List all pins on the board.
    - If the board is private no one can access it but its owner.
    - Each pin has two buttons:
      - Remove pin from the board.
      - Download the pin.
    - It has a delete board button to delete the board.
    - It has an edit board button to edit the board name or share option.
  - **Settings**: Edit user data.
    - To access it click on the **Edit Profile** button on the profile page.
    - Contains three pages:
      - **Public Profile**: To edit profile picture, first name, last name, website, bio, and username.
      - **Account Settings**: To edit email address, gender, country, or delete the user account.
      - **Security**: To change the user password by adding, old, new, and confirm passwords.
        - There are validations to check if the fields are empty or new and confirm passwords aren't the same.

## Dependencies

- This project is built using create-react-app using these packages.
  - Material UI
  - Axios
  - React Router Dom

## Team Members

- [Ahmed Saied](https://github.com/AhmedSaied94)
- [Amr Magdy](https://github.com/Amr-Magdy95)
- [Andrew Roshdy](https://github.com/andrew-roshdy13)
- [Mahmoud Metwally](https://github.com/mamume)
- [Momen Awad](https://github.com/momen-awad)
