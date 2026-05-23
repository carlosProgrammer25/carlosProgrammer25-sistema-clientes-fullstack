import { useState } from 'react'
import Clientes from './Pages/Clientes/Clientes'
import Painel from './Pages/Painel/Painel'
import { Erro } from "./components/Erro/Erro"


import './App.css'


function App() {
  const [erro, setErro] = useState(null);
  const [logado, setLogado] = useState(false)

  return (
    <>
      {erro && (
        <div className="erro">
          <Erro erro={erro} />
        </div>
      )}

      {logado ?
        <Clientes setErro={setErro} />
        :
        <Painel setErro={setErro} setLogado={setLogado} />
      }
    </>



  )
}

export default App
