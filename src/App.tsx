import { RouterProvider } from 'react-router-dom'
import { TripProvider } from '@/context'
import StorageResetToast from '@/features/trips/components/StorageResetToast'
import { router } from './routes'

const App = () => (
  <TripProvider>
    <RouterProvider router={router} />
    <StorageResetToast />
  </TripProvider>
)

export default App
