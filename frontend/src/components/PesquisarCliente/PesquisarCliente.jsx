import {LoadingButton} from "../Loading/LoadingButton"


export function PesquisarCliente({ onSearch, loadingButton}) {
    return (
        < div className="container-pesquisa-cliente" >
            {/*passando a props como paramatro do evento */}
            <form onSubmit={onSearch} action="">

                <label htmlFor="id">ID Regsitro</label>
                <input id="id" type="number" name="registro" />

                <button disabled={loadingButton}>
                    
                    {loadingButton ? (
                        < LoadingButton/>
                    ) : (
                        "Pesquisar"
                    )}
                </button>            
            </form>
        </div >
    )
}