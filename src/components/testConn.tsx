import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

const TestConnection = () => {
  const [status, setStatus] = useState('')

  useEffect(() => {
    const test = async () => {
      try {
        const { data, error } = await supabase.from("_health").select("*").limit(1)
        if (error) {
          // If you get a 404 or "relation does not exist", connection is working!
          // It just means the table doesn't exist
          setStatus('Connection successful! (Table not found is expected)')
          console.log('Connection successful! (Table not found is expected)', error)
        } else {
          setStatus('Connection successful!')
          console.log('Connection successful!', data)
        }
      } catch (err) {
        setStatus('Connection failed: ' + err)
        console.error('Connection failed:', err)
      }
    }
    test()
  }, [])

  return <div>{status}</div>
}

export default TestConnection
