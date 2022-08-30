const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

// const getTokenFrom = (request) => {
//   const authorization = request.get('authorization')
//   console.log(authorization)
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.title || !body.url) {
    return response.status(400).end()
  }
  if (!body.likes) {
    body.likes = 0
  }

  // const token = getTokenFrom(request)
  // const decodedToken = jwt.verify(token, process.env.SECRET)
  // if (!token || !decodedToken.id) {
  //   return response.status(401).json({
  //     error: 'token missing or invalid'
  //   })
  // }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  const loggedUser = request.user
  console.log('logged user', loggedUser.id)
  const user = await User.findById(request.body.userId)
  console.log('blog user', user._id.toString())
  if (loggedUser.id.toString() !== user._id.toString()) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  // try {
  //   const saved = await blog.save()
  //   response.status(201).json(saved)
  // } catch (exception) {
  //   next(exception)
  // }

  const saved = await blog.save()
  console.log(saved)

  user.blogs = user.blogs.concat(saved._id)
  await user.save()
  response.status(201).json(saved)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const loggedUser = request.user
  const blog = await Blog.findById(request.params.id)
  console.log('blog user', blog.user.toString())
  console.log('logged user', loggedUser.id.toString())
  if (loggedUser.id.toString() !== blog.user.toString()){
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch(exception) {
    next(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  try {
    const updated = await Blog.findByIdAndUpdate(request.params.id, blog, { new:true })
    response.status(201).json(updated)
  } catch (exception) {
    next(exception)
  }
  // Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  //   .then(updated => {
  //     response.json(updated)
  //   })
  //   .catch(error => next(error))
})

module.exports = blogsRouter