import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { useField } from './hooks'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const username = useField('text')
  const password = useField('text')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs),
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.value, password: password.value
      })
      console.log(user)
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      console.log(user)
    } catch (exception) {
      console.log(exception)
    }
  }

  const loginForm = () => (
    <LoginForm
      setUsername={ username.onChange }
      setPassword={ password.onChange }
      handleLogin={handleLogin}
      username={username.value} password={password.value} />
  )

  function logout() {
    window.localStorage.clear()
    window.location.reload(true)
  }

  const blogForm = () => (
    <div>
      <button onClick={logout}>Logout</button>
      {blogCreation()}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  function newBlog() {
    console.log(user)
    const newBlo = { author: blogAuthor, title: blogTitle, url: blogUrl, likes: 0, user: user.id }
    blogService.create(newBlo)
  }

  const blogCreation = () => (
    <Togglable buttonLabel="Create new">
      <form style={{ outline: '5px solid green', margin: '2px' }} onSubmit={newBlog}>
        <h2>create new</h2>
        <div>
          Title
          <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            value={blogUrl}
            name="URL"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <p><button type="submit">Create</button></p>

      </form >
    </Togglable>
  )

  return (
    <div>
      <h1>Muistiinpanot</h1>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          {blogForm()}
        </div>
      }

    </div>
  )
}

export default App