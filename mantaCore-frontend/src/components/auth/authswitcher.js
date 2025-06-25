'use client'
import { useState } from 'react'
import LoginForm from './loginform'
import RegisterForm from './registerform'

export default function AuthSwitcher() {
  const [isLogin, setIsLogin] = useState(true)

  const toggleForm = () => setIsLogin(!isLogin)

  return isLogin
    ? <LoginForm onSwitch={toggleForm}/>
    : <RegisterForm onSwitch={toggleForm} />
}
