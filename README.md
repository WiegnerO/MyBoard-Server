# MyBoard-Server
This repository is the backend RESTful API for the MyBoard application
The application is writen using Express.js

Schema Representation

maybe can combine Users and Profile

table Users(
    unique u_id PK
    unique username
    hashed_pass
)

table Profile(
    unique u_id FK referances Users
    f_name
    l_name
    bio
)

//one person creates this board
//one person can make multi boards
table Boards(
    unique b_id PK
    unique u_id 
    b_name
)

//one post can only come from a single user
//one user can make many posts
table user_posts(
    unique p_id PK
    unique u_id FK referances Users
    post
)

//one board can have many posts
//each post belongs to a single board
table board_posts(
    unique p_id PK
    unique b_id FK referances Boards
)

npx knex migrate:rollback
npx knex migrate:latest

