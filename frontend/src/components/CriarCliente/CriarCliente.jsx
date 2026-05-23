
export function CriarCliente({ registrar }) {
    return (
        <div className="container-criar-registro">
            <h1 className="titulo-principal">Criar Cliente</h1>

            <div className="criar-registro-container">
                <form className="form-criar" onSubmit={registrar}>
                    <input type="text" name="nome" placeholder="nome"/>
                    <input type="text" name="uf" placeholder="Estado"/>
                    <input type="text" name="idade" placeholder="idade"/>

                    <button>Criar</button>
                </form>
            </div>
        </div>
    )
}

/*registro criado com sucesso */
export function Registrado({ registrado, setRegistrado }) {
    return (
        <div className="registrado-card">
            <div className="center">
                <div className="div-h">
                    <h2 className="h-principal">Cliente Criado Com Sucesso</h2><span><p>ID</p>{registrado.ID}</span>
                </div>
                <div className="campo">
                    <span style={{ paddingRight: "5px" }}>Nome:</span><p>{registrado.Nome.toUpperCase()}</p>
                </div>

                <div className="campo">
                    <span>Idade: </span><p>{registrado.Idade}</p>
                </div>

                <div className="campo">
                    <span>UF: </span><p>{registrado.UF.toUpperCase()}</p>
                </div>

                <div className="center-fechar">
                    <button className="buton-fechar" onClick={() => { setRegistrado(null) }}>X</button>
                </div>
            </div>
        </div>
    );
}


