# project2-group7


![MIT](https://img.shields.io/badge/license-MIT-green)


## Description


This is a full-stack CMS-style  site where users can access to the last NBA game results. With login authentication, logged-in users  can search for specific team results,  they can also create upadate or edit or delete their posts.
Moreover, this application is MVC structured and  uses o multiple packages such as handlebars, bcrypt, express.sessions, sequelize  to eenhance the app experience.


## Table of Contents 


 
- [project2-group7](#project2-group7)
  - [Description](#description)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [License](#license)
  - [How to Contribute](#how-to-contribute)
  - [Tests](#tests)
  - [Questions](#questions)
  - [Features](#features)
  - [Credits](#credits)

## Installation

 

                                                First:

In order to use this project make sure to have the following programs installed on your computer:

1. VS Code

2. GitBash

3. Node.js

4. Mysql2

5. Heroku







                                                Second:

In order to initialize the project:


Copy Link: click the `Code` button within this GitHub SSH repository to copy link

Clone: inside GitBash, use the command `git clone paste link here`



link to application : 

https://github.com/restas13/sport-spot.git


link to deployed application:

link to deplyed application:


https://git.heroku.com/sport-spot-group7.git


https://












                                                 Third: 

If you don't have the dependencies :
In the terminal, use the command `npm init -y` to initialize and create a `package.json file` .

Then you will have to install 
-some node_modules and `package-lock.json` dependencies by running `npm install `.


You will need to install `npm i mysql2` 

Also you will need to install `npm i dotenv`


`npm i sequelize`

`npm i express`

`npm i express session`

`npm i bcrypt`

`npm i express-handlebars`

`npm i connect-session-sequelize`



Create a `.env file` in the root directory of the app.
Create three variables in the `.env file`:

-`DB_NAME`=ecommerce_db
-`DB_USER`=[your MySQL username]
-`DB_PW`=[your MySQL password]
-`DB_SESSION_SECRET`= [your secret word or sentence]

 


Then, you will need to run :

`mysql -u root -p`

then
`SOURCE db/schema.sql` to create the database and initialize the database.


TIPS: Open a second time, the repository in the integrated terminal and run : ``node seeds/index.js` to seed the databse.(you don't have to close the frist one in the case you want to interact with mysql, otherwise you can close mysql and then run  the two node actions)



Finally, you will want to run `node server.js` to start the app.



## Usage

After the installation process:

Open the terminal  and run the command `npm start` or `node server.js`

In you browser you will want to run `localhost:3001/`,

![Screenshot1](https://github.com/restas13/sport-spot/assets/120201085/04c18cc8-8d2b-409d-8a2d-2dba893568d8)
![Screenshot 2](https://github.com/restas13/sport-spot/assets/120201085/cfa72ed4-7e0d-4303-a778-4fc080d3eeb6)
![Screenshot 3](https://github.com/restas13/sport-spot/assets/120201085/8acee9fa-7a87-4787-8294-d2118e09fe28)
![Screenshot 2023-06-08 170642](https://github.com/restas13/sport-spot/assets/120201085/64a76672-1edf-4b6d-8b64-6c2c656f082c)





## License

This project is licensed under the MIT license.

## How to Contribute

Please contact us

## Tests

N/A

## Questions

If you have any questions about this repository, you might want to open an issue or contact us at 

## Features


## Credits

This application has been made by  Anurag Mishra, Caurissa N, Kinson Metayer, Reed Wilson and Gérard Del Vechhio  during the UCF bootcamp program.
 