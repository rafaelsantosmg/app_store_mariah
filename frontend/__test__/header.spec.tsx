import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Header from '../src/components/Header'

describe('Teste do component Header', () => {
  beforeEach(() => {
    render(<Header />)
  })

  it('Testa se o elemento h5 esta renderizando em tela', () => {
    const heading = screen.getByRole('heading', { level: 5 })
    expect(heading).toBeInTheDocument()
  })

  it('Testa se o elemento h5 possui o texto corrento', () => {
    const heading = screen.getByRole('heading', { level: 5 })
    expect(heading).toHaveTextContent('APP de Produtos RADIX')
  })

  it('Testa se a imagem de logo renderiza na tela.', () => {
    const logo = screen.getByRole('img', { name: /Picture of the author/i })
    expect(logo).toBeInTheDocument()
  })
})
