import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Subscriber } from '@/view/pages/subscriber';
import './view/styles/global.css';

const root = createRoot(document.getElementById('root') as HTMLElement)

root.render(
    <StrictMode>
      <Subscriber />
    </StrictMode>,
  )

