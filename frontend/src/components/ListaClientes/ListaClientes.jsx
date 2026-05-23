
export function ListaClientes({ clientes, deletar }) {
    return (
        <div className="container-list">
            {/*Lista Todos os Clientes */}
            {clientes.length === 0 ? (
                <div className="vazio">
                    <p className="titulo">Sem clientes</p>
                    <p className="sub">Adicione um cliente</p>
                </div>) : (
                clientes.map((c) => (
                    <div key={c.ID} className="card">
                        {/* Dados do Cliente */}
                        <div className="card-header">
                            <h3 className="nome-registro">{c.Nome.toUpperCase()}</h3>
                            <p>ID: {c.ID}</p>
                        </div>

                        <div className="card-details">
                            <p className="detail-item">
                                <span className="detail-label">📅 Idade:</span>
                                <span className="detail-value">{c.Idade} anos</span>
                            </p>
                            <p className="detail-item">
                                <span className="detail-label">📍 UF:</span>
                                <span className="detail-value">{c.UF.toUpperCase()}</span>
                            </p>
                        </div>

                        <div className="deletar-cliente">
                            <button className="button-deletar" onClick={()=>{deletar(c)}}>Deletar</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}