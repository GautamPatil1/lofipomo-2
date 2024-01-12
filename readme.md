# [LofiPomo: A Productivity Dashboard](https://lofipomo.gautampatil.tech)

![LofiPomo](/lofipomo-desktop.png)

## LofiPomo: A Productivity Dashboard

Lofipomo is a MERN (MongoDB, Express, React, Node) full-stack web application designed to enhance productivity by combining a variety of features. It includes a Lofi Radio for tuning into your favorite chill tunes, a Todo List manager, a Notepad for jotting down your thoughts, and a Pomodoro Timer for effective time management.

![LofiPomo](/lofipomo-mobile.png)

## Features

- **Lofi Radio Streams:** Tune into your favorite lofi songs while you work.Enjoy a curated selection of Lofi music streams to create a relaxed atmosphere while working.
- **Todo List:** Keep track of your tasks and mark them off as you complete them.
- **Notepad:** Quickly jot down your thoughts, ideas, or anything you want to remember in the Notepad section.
- **Pomodoro Timer:** Stay focused and boost productivity with the Pomodoro Timer, a technique for time management.

## Tech Stack

LofiPomo is a MERN stack application, which stands for MongoDB, Express, React, and Node.js:

- **MongoDB:** A NoSQL database used to store todo items and notes.
- **Express:** A web application framework for Node.js, used to build the API.
- **React:** A JavaScript library for building the user interface.
- **Auth0:** An authentication library that provides authentication and authorization for users.
- **Node.js:** A JavaScript runtime used to run the server.

## Containerization and Deployment

The application is containerized using Docker, with separate containers for the frontend and backend. These containers are managed together using Docker Compose.

### Automation

- Terraform is used to provision an EC2 Instance with AWS.
- Ansible is used to configure the Instance to install required services.
- Github Actions is used for Continuous Integration and Continuous Deployment.

## Getting Started

To get a local copy up and running, follow these steps:

1. Clone the repo
2. Run Docker Compose `docker-compose up`.

OR 

1. Clone the repo
2. Install packages in the said frontend & backend directories.
3. run `npm start` in both directories.
