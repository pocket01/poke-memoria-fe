import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Home from '@/app/page'

describe('Home Page', () => {
  it('should render "Hello, Pokememoria World!" text', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { name: /Hello, Pokememoria World!/i })
    expect(heading).toBeInTheDocument()
  })
})
