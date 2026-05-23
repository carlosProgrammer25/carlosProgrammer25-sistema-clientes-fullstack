
export function EditandoID({ editandoId, novosDados, form, setForm, setEditandoId }) {
    return (
        <>
            <div className="container-form-editar">
                <form className="form-editar" onSubmit={novosDados}>
                    <button className="fechar" onClick={()=>{setEditandoId(null)}}>x</button>

                    <h1 className="titulo-registro">Editar Registro</h1>

                    {/* 
                        '...' => spread operator do JavaScript
                        form = estado do react
                        juntos → atualizam estado corretamente 
                        
                        setForm atualiza o estado criando um novo objeto,
                        copiando os valores atuais e alterando o campo desejado*/}
                    <input type="text" placeholder="Nome" value={form.Nome} onChange={(e) => setForm({ ...form, Nome: e.target.value })} />
                    {/*valor novo ao ser passado foi transformado em inteiro -> Idade: Number(e.target.value)*/}
                    <input type="number" placeholder="Idade" value={form.Idade} onChange={(e) => setForm({ ...form, Idade: Number(e.target.value) })} />
                    <input type="text" placeholder="UF" maxLength={2} value={form.UF} onChange={(e) => setForm({ ...form, UF: e.target.value })} />
                    <input type="hidden" value={form.ID} onChange={(e) => setForm({ ...form, ID: e.target.value })} />
                    <button>Salvar</button>
                </form>
            </div>
        </>
    )
}