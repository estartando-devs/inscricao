import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Subscriber } from '@/view/pages/subscriber';
import './view/styles/global.css';
import { Toaster } from "sonner";

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <StrictMode>
      <Subscriber />
      <Toaster richColors position="top-center" />
    </StrictMode>,
  )

