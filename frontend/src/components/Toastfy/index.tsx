import React from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Toastfy() {
  const showToast = () => {
    toast('Esta é uma notificação simples!', { autoClose: 3000 }) // 'autoClose' define o tempo de exibição em milissegundos
  }

  return (
    <div>
      <button onClick={showToast}>Mostrar Notificação</button>
    </div>
  )
}

export default Toastfy
