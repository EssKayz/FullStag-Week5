import PropTypes from 'prop-types'
import React from 'react'

const LoginForm = ({ handleLogin, setUsername, setPassword, username, password }) => {
  return (<form onSubmit={handleLogin}><div><h2>Log in to application</h2>käyttäjätunnus<input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} /></div><div>salasana<input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} /></div><button type="submit">kirjaudu</button></form>)
}

LoginForm.propTypes = { handleLogin: PropTypes.func.isRequired, setUsername: PropTypes.func.isRequired, setPassword: PropTypes.func.isRequired, username: PropTypes.string.isRequired, password: PropTypes.string.isRequired }

export default LoginForm