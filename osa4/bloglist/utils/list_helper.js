const reducer = (sum, item) => {
  return sum + item
}

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    return blogs.map(b => b.likes).reduce(reducer, 0)
  }
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map( b => b.likes)
  const maxId = likes.indexOf(Math.max(...likes))
  const blog = {
    title: blogs[maxId].title,
    author: blogs[maxId].author,
    likes: blogs[maxId].likes
  }
  return blog
}

const mostBlogs = (blogs) => {
  const authors = [...new Set(blogs.map(b => b.author))]
  let numberofblogs = []

  authors.forEach(a => {
    numberofblogs.push(blogs.filter(b => b.author === a).length)
  })

  const maxId = numberofblogs.indexOf(Math.max(...numberofblogs))
  const result = {
    author: authors[maxId],
    blogs: numberofblogs[maxId]
  }
  return result
}

const mostLikes = (blogs) => {
  const authors = [...new Set(blogs.map(b => b.author))]
  let numberOfLikes = []

  authors.forEach(a => {
    const temp = blogs.filter(b => b.author === a)
    numberOfLikes.push(temp.map(x => x.likes).reduce(reducer, 0))
  })

  const maxId = numberOfLikes.indexOf(Math.max(...numberOfLikes))
  const result = {
    author: authors[maxId],
    likes: numberOfLikes[maxId]
  }
  return result
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}