import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders every core section', () => {
    render(<App />)
    ;['hero', 'about', 'leadership', 'skills', 'projects', 'ai-initiatives', 'contact', 'request-demo'].forEach(
      (id) => {
        expect(document.getElementById(id)).toBeInTheDocument()
      },
    )
  })
})
