import React from 'react'
import styles from './ListaDeProdutos.module.css' // Importe o arquivo de estilos
import { Button } from '@mui/material'
import theme from '../../theme'
import { useRouter } from 'next/navigation'

const ListaDeProdutos = ({ produtos }: any) => {
  const router = useRouter()
  return (
    <div className={styles.listaDeProdutos}>
      <div className={styles.buttonsWrapper}>
        <Button
          variant="outlined"
          type="button"
          onClick={() => window.print()}
          sx={{
            color: theme.white,
            backgroundColor: theme.brown,
            '&:hover': {
              backgroundColor: theme.lightBrown,
            },
            displayPrint: 'none',
          }}
        >
          Imprimir Lista
        </Button>
        <Button
          variant="outlined"
          type="button"
          onClick={() => router.back()}
          sx={{
            color: theme.white,
            backgroundColor: theme.brown,
            marginLeft: '10px',
            '&:hover': {
              backgroundColor: theme.lightBrown,
            },
            displayPrint: 'none',
          }}
        >
          Voltar
        </Button>
      </div>
      <div className={styles.container}>
        <h2 className={styles.title}>Lista de Produtos</h2>

        <table className={styles.tabela}>
          <thead>
            <tr>
              <th className={styles.tabelaTh}>ID</th>
              <th className={styles.tabelaTh}>Nome</th>
              <th className={styles.tabelaTh}>Tipo do Estoque</th>
              <th className={styles.tabelaTh}>Estoque</th>
              <th className={styles.tabelaTh}>Preço de Venda</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto: any) => (
              <tr key={produto.id}>
                <td className={styles.tabelaTd}>{produto.id}</td>
                <td className={styles.tabelaTd}>{produto.name}</td>
                <td className={styles.tabelaTd}>{produto.stockType}</td>
                <td className={styles.tabelaTd}>{produto.stock}</td>
                <td className={styles.tabelaTd}>{produto.salePrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListaDeProdutos
