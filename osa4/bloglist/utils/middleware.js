const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const userExtractor = (req, res, next) => {
  if (req.get('authorization')) {
    const token = req.get('authorization')
    if (!token) {
      return res.status(403).json({ error: 'Access denied.' })
    }
    const decodedToken = jwt.verify(token.split(' ')[1], process.env.SECRET)
    //console.log(decodedToken.id)
    if (!decodedToken.id) {
      return res.status(401).json({
        error: 'token missing or invalid'
      })
    }
    req.user = decodedToken
    next()
  } else {
    next()
  }
}

const tokenExtractor = (req, res, next) => {
  if (req.get('authorization')) {
    const token = req.get('authorization')
    console.log(token)
    if (!token) {
      return res.status(403).json({ error: 'Access denied.' })
    }
    req.token = token.substring(7)
    next()
  } else {
    next()
  }
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).json({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError'){
    return response.status(401).json({
      error: 'token expired'
    })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}