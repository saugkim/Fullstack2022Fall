const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('../utils/test_helper')

describe('task 4.8: HTTP GET initial blogs test', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the first blog author is Michael Chan', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].author).toBe(helper.initialBlogs[0].author)
  })

  test('a specific title is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain(helper.initialBlogs[0].title)
  })
})

describe('task 4.9: returned blog has id props', () => {
  test('blog has id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('task 4.10-4.12: HTTP POST test', () => {
  test('a valid blog can be added, and number of blogs increased by one ', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'kim',
      url: 'https://reactpatterns.com/',
      likes: 5,
      userId: '622f80dae67956199cdaee56'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hdHRpIiwiaWQiOiI2MjJmODBkYWU2Nzk1NjE5OWNkYWVlNTYiLCJpYXQiOjE2NDczMjkxMDB9._J6OBNRnOi9xuGpJENRt4Qto7F_RKFmMfA2fMaemrHc')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain(
      'async/await simplifies making async calls'
    )
  })

  test('blog without likes is added, value of likes of just added blog is zero', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'kim',
      url: 'https://reactpatterns.com/',
      userId: '622f80dae67956199cdaee56'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hdHRpIiwiaWQiOiI2MjJmODBkYWU2Nzk1NjE5OWNkYWVlNTYiLCJpYXQiOjE2NDczMjkxMDB9._J6OBNRnOi9xuGpJENRt4Qto7F_RKFmMfA2fMaemrHc')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs[blogs.length-1].likes).toBe(0)
  })

  test('blog without title or url is not added', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      author: 'nobody'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hdHRpIiwiaWQiOiI2MjJmODBkYWU2Nzk1NjE5OWNkYWVlNTYiLCJpYXQiOjE2NDczMjkxMDB9._J6OBNRnOi9xuGpJENRt4Qto7F_RKFmMfA2fMaemrHc')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

describe('task 4.13: delete blog test', () => {
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[blogsAtStart.length -1]
    console.log(blogToDelete.id)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hdHRpIiwiaWQiOiI2MjJmODBkYWU2Nzk1NjE5OWNkYWVlNTYiLCJpYXQiOjE2NDczMjkxMDB9._J6OBNRnOi9xuGpJENRt4Qto7F_RKFmMfA2fMaemrHc')
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const contents = blogsAtEnd.map(r => r.id)
    expect(contents).not.toContain(blogToDelete.id)
  })
})

describe('task 4.14: modify blog for example likes value', () => {
  test('a blog can be modified', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const toUpdate = blogsAtStart[0]
    const blog = { ...toUpdate, likes: 100 }
    // delete blog.id
    // const blog = {
    //   title: toUpdate.title,
    //   author: toUpdate.author,
    //   url: toUpdate.url,
    //   likes: 100
    // }

    await api
      .put(`/api/blogs/${toUpdate.id}`)
      .send(blog)
      .expect(201)

    const blogsAtEnd = await helper.blogsInDb()
    console.log('end', blogsAtEnd)
    expect(blogsAtEnd[0].likes).toBe(100)
  })
})

describe('view a specific blog', () => {
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()

    const blogToView = blogsAtStart[0]
    //console.log(blogToView)
    const resultNote = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const processedBlogToView = JSON.parse(JSON.stringify(blogToView))

    expect(resultNote.body).toEqual(processedBlogToView)
  })
})

afterAll(() => {
  mongoose.connection.close()
})