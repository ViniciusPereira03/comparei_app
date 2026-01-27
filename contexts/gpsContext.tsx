import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react'
import * as Location from 'expo-location'

type LocationCoords = {
  latitude: number
  longitude: number
}

type GpsContextData = {
  location: LocationCoords | null
  loading: boolean
  error: string | null
  refreshLocation: () => Promise<void>
}

const GpsContext = createContext<GpsContextData>({} as GpsContextData)

type GpsProviderProps = {
  children: ReactNode
}

export function GpsProvider({ children }: GpsProviderProps) {
  const [location, setLocation] = useState<LocationCoords | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  async function requestPermission() {
    const { status } = await Location.requestForegroundPermissionsAsync()

    if (status !== 'granted') {
      setError('Permissão de localização negada')
      setLoading(false)
      return false
    }

    return true
  }

  async function getCurrentLocation() {
    try {
      setLoading(true)
      setError(null)

      const hasPermission = await requestPermission()
      if (!hasPermission) return

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      })

      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      })
    } catch (err) {
      setError('Erro ao obter localização')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  return (
    <GpsContext.Provider
      value={{
        location,
        loading,
        error,
        refreshLocation: getCurrentLocation,
      }}
    >
      {children}
    </GpsContext.Provider>
  )
}

export function useGps() {
  return useContext(GpsContext)
}
