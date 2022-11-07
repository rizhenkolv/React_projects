import React from 'react'
import { useEffect } from 'react'

const Alert = ({ msg, list, removeAlert }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert()
    }, 2000)
    return () => clearTimeout(timeout)
  }, [list])
  return <p className='alert'>{msg}</p>
}

export default Alert
