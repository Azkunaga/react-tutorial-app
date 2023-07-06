require('dotenv').config({path: "env/local.env"})

const jwt = require("jsonwebtoken")

const jwtSecret = process.JWT_SECRET;

const adminAuth = (req, res, next) => {
    const token = req.cookies.jwt
    if (token) {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        if (err) {
          return res.status(401).send({ message: "Not authorized" })
        } else {
          if (decodedToken.role !== "admin") {
            return res.status(401).send({ message: "Not authorized" })
          } else {
            next()
          }
        }
      })
    } else {
      return res.status(403)
        .send({ message: "Not authorized, token not available" })
    }
  }

  const studentAuth = (req, res, next) => {
      const token = req.cookies.jwt
      if (token) {
        jwt.verify(token, jwtSecret, (err, decodedToken) => {
          if (err) {
            return res.status(401).send({ message: "Not authorized" })
          } else {
            if (decodedToken.role !== "student") {
              return res.status(401).send({ message: "Not authorized" })
            } else {
              next()
            }
          }
        })
      } else {
        return res.status(403)
          .send({ message: "Not authorized, token not available" })
      }
    }

    const teacherAuth = (req, res, next) => {
        const token = req.cookies.jwt
        if (token) {
          jwt.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
              return res.status(401).send({ message: "Not authorized" })
            } else {
              if (decodedToken.role !== "teacher") {
                return res.status(401).send({ message: "Not authorized" })
              } else {
                next()
              }
            }
          })
        } else {
          return res.status(403)
            .send({ message: "Not authorized, token not available" })
        }
      }


module.exports = {
    adminAuth,
    studentAuth,
    teacherAuth
}