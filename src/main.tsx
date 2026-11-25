import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import { Theme } from '@radix-ui/themes'
import { MotionConfig } from 'motion/react'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'
import '@radix-ui/themes/styles.css'
import App from './App'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Theme accentColor="gray" grayColor="slate" radius="large" scaling="100%" panelBackground="solid">
      <MotionConfig reducedMotion="user" transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}>
        <HashRouter><App /></HashRouter>
      </MotionConfig>
    </Theme>
  </StrictMode>,
)
