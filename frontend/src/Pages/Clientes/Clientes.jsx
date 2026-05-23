import { useEffect, useState } from "react";
import { CriarCliente, Registrado } from "../../Components/CriarCliente/CriarCliente"
import { PesquisarCliente } from "../../Components/PesquisarCliente/PesquisarCliente"
import { ClientePesquisado } from "../../Components/ClientePesquisado/ClientePesquisado"
import { EditandoID } from "../../Components/EditandoID/EditandoID"
import { ListaClientes } from "../../Components/ListaClientes/ListaClientes"
import { Erro } from "../../Components/Erro/Erro"
import { buscarClientes, buscarCliente, atualizarDados, criarRegistro, deleteCliente, } from "../../service/clientesService"
import { Loading } from "../../Components/Loading/Loading";
import { LoadingButton } from "../../Components/Loading/LoadingButton"

function Clientes({ erro, setErro }) {
    //estado -> valor atual, funcao que altera o valor
    //renderizar tabela clientes
    const [clientes, setClientes] = useState(null);
    // renderizar form edicao dados do registro tabela
    const [editandoId, setEditandoId] = useState(null);
    // buscar um unico registro
    const [clientePesquisado, setClientePesquisado] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingButton, setLoadingButton] = useState(false)
    const [registrado, setRegistrado] = useState(false)

    //estado que aloca o dado que sera alterado(funcao editar)
    const [form, setForm] = useState({
        //parametros do obj sao em maiscula, servidor recebe no corpo da requisicao Maiscula
        Nome: "",
        Idade: "",
        UF: ""
    });


    //useEffect roda automaticamente, quem controla é array =>[]
    useEffect(() => {
        carregarClientes();
    }, []);


    async function carregarClientes() {
        let time;
        try {
            time = setTimeout(() => {
                setLoading(true)
            }, 500)
            //se permanecer nesse bloco por x tempo

            const data = await buscarClientes();
            setClientes(data);
        }
        catch (error) {
            //erro no servidor, mudando valor do estado para array vazio
            setErro('Erro no Servidor')
        }
        finally {
            clearTimeout(time)
            setLoading(false) //sempre roda
            setTimeout(() => {
                setErro(null)
            }, 2000);
        }
    }


    async function carregarCliente(e) {
        e.preventDefault();
        let registroId;
        setErro(null)
        try {
            //valor do estado loading na pesquisa de cliente
            setLoadingButton(true)

            // form data pega valores dos inputs de um form e armazena como chave=valor
            const obj = new FormData(e.target);
            // = o valor da chave registro dentro do FormData
            registroId = obj.get("registro");

            //pega capo id vazio
            if (registroId === "") {
                setLoadingButton(false)
                setErro('Campo ID Vazio')
                return
            }

            const data = await buscarCliente(registroId);
            e.target.reset()

            //codigo continua, roda callback Xms dps
            setTimeout(() => {
                //se o registro nao existir
                if (data === null) {
                    setLoadingButton(false)
                    setErro(`O registro com o id ${registroId} nao existe`);
                    return
                };

                //se busca for sucesso
                setClientePesquisado([data]);
                setLoadingButton(false)
            }, 1000);
        }
        catch (error) {
            console.error("Erro na requisição:", error);
            setLoadingButton(false)
            setErro('Erro no servidor');
            setTimeout(() => {
                setErro(null)
            }, 2000);
        }
    }


    //pegando dados do cliente que sera editado /preparando form de edicao
    async function editar(cliente) {

        setEditandoId(cliente.ID);
        //estado form
        setForm({
            Nome: cliente.Nome,
            Idade: cliente.Idade,
            UF: cliente.UF,
            ID: cliente.ID
        });
    }


    //envar novos dados ao servidor (atualizar)
    async function novosDados(e) {
        try {
            e.preventDefault();

            //passando o estado com novos valores
            await atualizarDados(form);

            // fecha edição
            setEditandoId(null);
            //fechando janela de resultado da pesquias do cliente
            setClientePesquisado([]);
            await carregarClientes();
            setErro(null)

        }
        catch (error) {
            setErro('Erro no servidor');
            console.error(error)
        }
    }


    async function registrar(e) {
        setClientePesquisado([])
        setErro(null)
        const estados = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
        ]
        try {
            e.preventDefault();
            const formData = new FormData(e.target);

            //criando obj que sera passado ao back
            const novoCliente = {
                nome: formData.get("nome"),
                uf: formData.get("uf"),
                //number tenta converter qualquer valor para número, mas só funciona corretamente quando a string representa um número válido
                idade: Number(formData.get("idade"))
            };

            //if nome vazio (0 = false) // validando texto .test() // d = numbero 0 a 9
            if (!novoCliente.nome || novoCliente.nome.trim() === "" || !/^[A-Za-zÀ-ÿ\s]+$/.test(novoCliente.nome) || /\d/.test(novoCliente.nome)) {
                setErro('Nome invalido')
                setTimeout(() => {
                    setErro(null)
                }, 2000);
                return
            }
            //se estado for enviado errado 
            else if (novoCliente.uf.length != 2 || !/^[A-Za-zÀ-ÿ\s]+$/.test(novoCliente.uf) || !estados.includes(novoCliente.uf.toUpperCase())) {
                //nao vai criar
                e.target.reset();
                setErro('UF invalida')
                setTimeout(() => {
                    setErro(null)
                }, 2000);
            }
            //se idade é number ou NaN
            else if (Number.isNaN(novoCliente.idade) || novoCliente.idade === 0) {
                e.target.reset();
                setErro('Idade invalido')
                setTimeout(() => {
                    setErro(null)
                }, 2000);
                return
            }
            else {
                //criar registro
                e.target.reset();
                const dados = await criarRegistro(novoCliente);
                if (dados) {
                    setRegistrado(dados)
                    await carregarClientes();
                };
                return
            }
        }
        catch (error) {
            setErro('Erro no servidor - Erro ao criar registro');
            setTimeout(() => {
                setErro(null)
            }, 2000);
            console.error(error)
        }
    }


    async function deletar(cliente) {
        try {
            await deleteCliente(cliente);
            await carregarClientes();
            setClientePesquisado([]);
            setErro(null)


        } catch (error) {
            setErro('Erro no servidor');
            console.error(error)
        }
    }



    return (
        <div className="container-principal">
            <h1 className="titulo-principal-0">Clientes Cadastrados</h1>


            {loading && (
                <div>
                    <Loading />
                </div>
            )}

            {registrado && (
                <div>
                    <Registrado registrado={registrado} setRegistrado={setRegistrado} />
                </div>
            )}

            <div className="section card-box">
                <CriarCliente registrar={registrar} />
            </div>

            < div className="section card-box">
                {/*se cliente foi encontrado*/}
                <PesquisarCliente onSearch={carregarCliente} loadingButton={loadingButton} />
            </div>

            {/*se o retorno da busca for vazio nao ira retornar nada */}
            {clientePesquisado.length > 0 && (
                <div className="section card-box">
                    <ClientePesquisado
                        cliente={clientePesquisado}
                        editar={editar}
                        deletar={deletar}
                        setClientePesquisado={setClientePesquisado}
                    />
                </div>
            )}

            {editandoId && (
                <div className="section card-box">
                    <EditandoID
                        editandoId={editandoId}
                        novosDados={novosDados}
                        form={form}
                        setForm={setForm}
                        setEditandoId={setEditandoId}
                    />
                </div>
            )}


            {/*null valor inicial do estado, ainda sera fazendo req*/
                clientes !== null && (
                    <div className="section">
                        <ListaClientes clientes={clientes} deletar={deletar} />
                    </div>
                )}


        </div >
    );
}


//ao exportar com padrao nao obrigda importar entre {} e pode ser chamado de qlqer nome ao importar
export default Clientes;