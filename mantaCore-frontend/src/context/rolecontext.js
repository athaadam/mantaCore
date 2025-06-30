'use client'
import { createContext, useContext, useState } from 'react'

const RoleContext = createContext()

export const RoleProvider = ({ children }) => {
  const [role, setRole] = useState('') // kosong saat awal

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  )
}

export const useRole = () => useContext(RoleContext)
