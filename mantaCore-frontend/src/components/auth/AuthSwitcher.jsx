'use client'
import { useState } from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

export default function AuthSwitcher() {
  const [isLogin, setIsLogin] = useState(true)

  const toggleForm = () => setIsLogin(!isLogin)

  return isLogin
    ? <LoginForm onSwitch={toggleForm}/>
    : <RegisterForm onSwitch={toggleForm} />
}
