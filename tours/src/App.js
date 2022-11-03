import React, { useState, useEffect } from 'react'
import Tours from './Tours'
import Loading from './Loading'

const url = 'https://course-api.com/react-tours-project'

const App = () => {
  const [loading, setLoading] = useState(true)
  const [tours, setTours] = useState([])

  const fetchTours = async () => {
    setLoading(true)
    try {
      let response = await fetch(url)
      const tours = await response.json()
      console.log(tours)
      setLoading(false)
      setTours(tours)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchTours()
  }, [])

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  return (
    <main>
      <Tours tours={tours} />
    </main>
  )
}

export default App
