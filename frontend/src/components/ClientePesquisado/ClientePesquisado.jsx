
export function ClientePesquisado({ cliente, editar, deletar, setClientePesquisado }) {
    return (
        <div className="div-pai">
            {cliente.map((c) => (

                <div key={c.data.ID} className="cliente-encontrado-center">
                    <button className="x-editar" onClick={() => { setClientePesquisado([]) }}>X</button>
                    <div className="card-header">
                        <h3 className="nome-registro">{c.data.Nome}</h3>
                        <input type="hidden" value={c.data.ID} />
                    </div>

                    <div className="card-details">
                        <p className="detail-item">
                            <span className="detail-label">📅 Idade:</span>
                            <span className="detail-value">{c.data.Idade} anos</span>
                        </p>
                        <p className="detail-item">
                            <span className="detail-label">📍 UF:</span>
                            <span className="detail-value">{c.data.UF}</span>
                        </p>
                    </div>

                    <div className="card-actions">
                        <button onClick={() => {
                            //fechando janela cliente encontrado na pesquisa
                            setClientePesquisado([])
                            //abrindo a janela editar cliente
                            editar(c.data)
                        }} className="btn-editar">
                            ✏️ Editar
                        </button>
                        <button onClick={() => deletar(c.data)} className="btn-deletar">
                            🗑️ Deletar
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}