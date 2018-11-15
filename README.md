# NodeJS - JWT Auth

## Table of contents

+ [Requirements](#requirements)
+ [Deployment](#deployment)
+ [Authenticate](#authenticate)
+ [Users](#users)

## Requirements

Install `Node.JS` and `npm`:

```sh
sudo apt install nodejs
node -v
npm -v
```

`npm` is a package manager for Javascript that also keeps track of the packages in your projects.

Then install the following NodeJS packages:

+ `express` - our web application framework
+ `body-parser` - parses `Content-Type`s in Request
+ `jsonwebtoken` - our JWT token manager
+ `mongodb` - our database
+ `mongoose` - communicates with our MongoDB database
+ `morgan` - logs our middleware

```sh
npm express body-parser jsonwebtoken mongodb mongoose morgan --save
```

+ `--save` just makes sure our packages are saved in our `package.json` file

Then install `nodemon` which is a library that helps our server reload everytime a file is changed and saved. Without `nodemon` we'd have to shut down the server and restart it:

```sh
npm install --save-dev nodemon
```

+ `--save-dev` saves `nodemon` as a development dependecy

## Deployment

Run:

```sh
nodemon server.js
```

## Authenticate

**POST**

`/api/authenticate`

**Request:**

```json
{
    "email":"test@mail.com",
    "password":"password"
}
```

**Response;**

```json
{
    "id": "5beca3a6d118642f620fe04b",
    "email": "test@mail.com",
    "first_name": "Nick",
    "last_name": "Cerminara",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiaWF0IjoxNTQyMjM3MTY2LCJleHAiOjE1NDIzMjM1NjZ9.96a4g7Btd6DCgBzt4Ysx6Hu5y60nBMu8fYiQ0pJ1LnI"
}
```

**Status Codes:**

+ 200 - OK - If authentication was validated
+ 404 - Not Found - If user is not found
+ 403 - Forbidden - Wrong password

## Users

This endpoint return a list of all the users in the database. This happens only because my 'dummy' user is and `admin`.

**GET**

`/api/users`

**Request:**

A request can be made different ways:

Header:

`x-access-token`

Parameter on the url request:

`localhost:8080/api/user?token=2394829384`

Or an `application/json` body

```json
{
    "token":"akdh9384wherofa"
}
```

**Response:**

```json
[
    {
        "id": "5beca3a6d118642f620fe04b",
        "email": "test@mail.com",
        "first_name": "Nick",
        "last_name": "Cerminara"
    }
]
```

**Status Codes:**

+ 200 - OK - If authentication was validated
+ 403 - Forbidden - No token given