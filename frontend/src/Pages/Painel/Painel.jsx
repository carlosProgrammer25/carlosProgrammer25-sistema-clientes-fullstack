import React from 'react';
import { logUsuario, cadastrarUsuario } from '../../service/clientesService'
import { useState } from 'react'
import { Cadastrar } from '../../Components/Cadastrar/Cadastrar'



function Painel({ setLogado, setErro }) {

    const [cadastrar, setCadastrar] = useState(null)

    async function cadastro(e) {
        try {
            e.preventDefault()
            const dadosForm = new FormData(e.target)

            const dados = {
                usuario: dadosForm.get('usuario'),
                senha: dadosForm.get('senha')
            }

            //verificando se o campo existe
            if (dados.usuario == "" || dados.senha === "") {
                setErro('usuario ou senha incorretos')
                setTimeout(() => {
                    setErro(false)
                }, 2000);
                return;
            }

            const resultado = await cadastrarUsuario(dados, setErro)

            //re usuario existir, respota != ok
            if (resultado.ok == false) {
                setErro('Usuario ja existe')
                setTimeout(() => {
                    setErro(false)
                }, 2000);
                return;
            }

            if (resultado) {
                //se o retorno for sucesso
                setCadastrar(false)
            }
        }
        catch (error) {
            console.log(error)
            setErro('Erro no aaservidor');
            setTimeout(() => {
                setErro(null)
            }, 2000);
        }
    }

    async function loginUsuario(e) {
        try {
            e.preventDefault()

            //pegando dados do form -> obj
            const dadosForm = new FormData(e.target)

            //pegando valores do form
            const dados = {
                usuario: dadosForm.get('usuario'),
                senha: dadosForm.get('senha')
            }
            //usuario ou senha vazio
            if (dados.usuario == "" || dados.senha == "") {
                setErro('Usuario ou senha')
                setTimeout(() => {
                    setErro(null)
                }, 2000);
                return;
            }

            const resultado = await logUsuario(dados)
            
            //sucesso na validacao bd
            if (resultado) {
                //renderizando pagina Clientes
                setLogado(true)
                return
            }
            setErro('erro ao logar')
            setTimeout(() => {
                setErro(null)
            }, 2000);
        }
        catch (error) {
            setErro('Erro no servidor');
            setTimeout(() => {
                setErro(null)
            }, 2000);
        }
    }


    return (
        <div className='center-painel'>
            <div className='center-logar'>
                <form className='logar' onSubmit={loginUsuario} action="">
                    <h1>Logar</h1>
                    <input type="text" name="usuario" />
                    <input type="text" name="senha" />

                    <button>Logar</button>
                </form>

                <button onClick={() => { setCadastrar(true) }}>Cadastrar</button>

            </div>

            <div className='-center-cadastro'>
                <div className='cadastrar'>{cadastrar && <Cadastrar setLogado={setLogado} cadastrar={cadastro} />}</div>
            </div>

        </div>

    )
}

export default Painel