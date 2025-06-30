'use client'
import { createContext, useContext, useEffect, useState } from 'react'

const RoleContext = createContext()

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('')

  // Ambil dari localStorage saat komponen pertama kali di-mount
  useEffect(() => {
    const storedRole = localStorage.getItem('role')
    if (storedRole) {
      setRole(storedRole)
    }
  }, [])

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export const useRole = () => useContext(RoleContext)
