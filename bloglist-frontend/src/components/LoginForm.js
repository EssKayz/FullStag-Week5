import PropTypes from 'prop-types'
import React from 'react'

const LoginForm = ({ handleLogin, setUsername, setPassword, username, password }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
        <h2>Log in to application
        </h2>käyttäjätunnus
        <input type="text" value={username.value} name="Username" onChange={setUsername} />
      </div>
      <div>salasana<input type="password" value={password} name="Password"
        onChange={setPassword} />
      </div>
      <button type="submit">kirjaudu</button></form>)
}

LoginForm.propTypes = { handleLogin: PropTypes.func.isRequired, setPassword: PropTypes.func.isRequired, username: PropTypes.string.isRequired, password: PropTypes.string.isRequired }

export default LoginForm