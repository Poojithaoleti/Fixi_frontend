import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import BookingConfirmation from './pages/BookingConfirmation'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BookingConfirmation />
  </StrictMode>,
)
