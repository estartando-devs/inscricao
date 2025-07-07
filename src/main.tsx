import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Home } from '@/view/pages/home'


const root = createRoot(document.getElementById('root') as HTMLElement)

  root.render(
    <StrictMode>
      <Home />
    </StrictMode>,
  )

