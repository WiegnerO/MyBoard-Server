# MyBoard
MyBoard is a web application allowing users to create message boards also known as MyBoards based on their favourite topics. In these boards users can share how they feel on these topics and comment on each other posts.

# MyBoard-Server
This repository is the backend API for the MyBoard application. <br>
The API was desgined using the RESTful architecture<br>
This API is written using the Express Node.js web application framework <br>
The database is sqlite3 using Knex SQL query builder


# MyBoard Schema Representation

## users
table users(<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unique u_id PK <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unique username <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;first_name <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;last_name <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;about_user<br>
)

## MyBoards
table MyBoards(<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unique id pK<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;creator_id FK on users table <br>
)

## messages
table messages(<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;unique id pK<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;board_id FK on MyBoards table <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;creator_id FK on users table <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;parent_message FK on messages table <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;post_title <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;post_content <br>
)

# Installation
## Requirements
### node
- node -v12.x.x
### npm
- npm -v6.x.x

## Installation Steps
1. Clone or donwload the repistory
2. Ensure the correct version of node and npm are installed
3. In the terminal type npm install to install the necessary dependencies 
4. Open the app in a IDE and in the console type <b>yarn start</b> or <b>npm start</b>
5. When testing the API recommended to use an API Testing Tool such as Postman or Insomnia or the front end application which can be found at https://github.com/WiegnerO/MyBoard-FrontEnd/edit/main/README.md

npx knex migrate:rollback
npx knex migrate:latest

