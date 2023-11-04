const {ObjectId} = require('mongodb');

const data = [{
  "_id":new ObjectId("6539693465248dfb871b5abd"),
  "username": "Teacher",
  "password": "$2a$08$GuJuoFMu6sV1yVfXuSpOLeSWlnNA.Dfz1w1jUjzsVXqsD1Y/DVDV2",
  "firstName": "Teacher",
  "lastName": "Teacher",
  "email": "teacher@gmail.com",
  "code": null,
  "role": "teacher",
  "state": "active",
  "initialLevel": null,
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlYWNoZXIiLCJyb2xlIjoidGVhY2hlciIsImlhdCI6MTY5ODU0NzIyNCwiZXhwIjoxNjk4NjMzNjI0fQ.3gol9UkSWZHfWKTaXkE3Qgv0LCnfrv0-GgxpNX1Forc",
  "profileImage": "",
  "__v": 0
},
{
  "_id":new ObjectId("6539696165248dfb871b5ac4"),
  "username": "Admin",
  "password": "$2a$08$I29AVf9igRzMq3pfUYXGRejLXAlAWCdBQ76uSP5yEKiG5FR2dkcp6",
  "firstName": "Admin",
  "lastName": "Admin",
  "email": "admin@gmail.com",
  "code": null,
  "role": "admin",
  "state": "active",
  "initialLevel": null,
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjk4OTQ1MjY4LCJleHAiOjE2OTkwMzE2Njh9.8y47opZKwUNH5CHABUYxO4eXAZuahW48ZyjVQiSHPEc",
  "profileImage": "",
  "__v": 0
},
{
  "_id":new ObjectId("654411875f5bd835772e0387"),
  "username": "Student",
  "password": "$2a$08$6Ghq9wyCnhBRX8nOt8L8V.kLpxyiUEDRLBjWhxJbzJaSYcEG5XgjK",
  "firstName": "Student",
  "lastName": "Student",
  "email": "student@gmail.com",
  "code": null,
  "role": "student",
  "state": "active",
  "initialLevel": null,
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN0dWRlbnQiLCJyb2xlIjoic3R1ZGVudCIsImlhdCI6MTY5ODk1OTc1OCwiZXhwIjoxNjk5MDQ2MTU4fQ.H4EK1DZ7PiVpUsJ_y-L5frcWv0HIWnYvvBjLZpJ7tnA",
  "profileImage": "",
  "__v": 0
}]

module.exports = data;