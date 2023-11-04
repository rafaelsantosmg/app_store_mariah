import { Product } from '@/interfaces/Products'
import { formateValueUnitKg, formatedCurrency } from '@/utils/formate-values'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'
import theme from '../../theme'
import styles from './listProductPrint.module.css' // Importe o arquivo de estilos

type ProductProps = {
  products: Product[]
}

export default function ListProductPrint({ products }: ProductProps) {
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
              <th className={styles.tabelaTh}>Cod.</th>
              <th className={styles.tabelaTh}>Nome</th>
              <th className={styles.tabelaTh}>Tipo do Estoque</th>
              <th className={styles.tabelaTh}>Estoque</th>
              <th className={styles.tabelaTh}>Preço de Venda</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product: Product) => (
              <tr key={product.id}>
                <td className={styles.tabelaTd}>{product.code}</td>
                <td className={styles.tabelaTd}>{product.name}</td>
                <td className={styles.tabelaTd}>{product.stockType}</td>
                <td className={styles.tabelaTd}>{product.stock}</td>
                <td className={styles.tabelaTd}>
                  {formatedCurrency(product.salePrice)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
