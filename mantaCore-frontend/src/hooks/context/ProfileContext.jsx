import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { apiHit } from '@/libs/api/fetch'

export default function useProfile() {
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await apiHit('user', Cookies.get('auth'))
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
