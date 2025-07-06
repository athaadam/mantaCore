import { useEffect, useState } from 'react'
import { getProfile, getToken } from '@/libs/api/auth'

export default function useProfile() {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = await getToken()
                const data = await getProfile(token)
                setProfile(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [])

    return { profile, loading }
}
