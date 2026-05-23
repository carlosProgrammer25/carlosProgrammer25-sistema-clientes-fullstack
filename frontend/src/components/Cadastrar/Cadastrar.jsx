
export function Cadastrar({cadastrar}/*setLogado*/) {
    return (
        <>
        <form onSubmit={cadastrar} action="">
            <h3>Cadastrar Usuario</h3>

            <input type="text" placeholder='ususario' name='usuario'/>
            <input type="text" placeholder='senha' name='senha'/>

            <button >Cadastrar</button>

        </form>
        </>
        
    )
}