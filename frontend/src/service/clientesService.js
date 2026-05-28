//logica de comunicacao com a api/ camada de serviços
const API_URL = import.meta.env.VITE_API_URL;


export async function cadastrarUsuario(usuario) {
    try {
        const res = await fetch(`${API_URL}painelRegistrar`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        const dados = await res.json()
        
        //se registro existir no banco
        if (!res.ok) {
            return dados; // vem do backend
        }

        return dados
    }
    catch (error) {
        throw error;
    }
}

export async function logUsuario(usuario) {
    try {
        const API_URL = import.meta.env.VITE_API_URL;

        const res = await fetch(`${API_URL}paineLogin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        const dados = await res.json()

        //sucesso
        if (!res.ok) {
            console.log('erro')
            return
        }
        console.log('sucesso')

        return res
    }
    catch (error) {
        throw error
    }


}

export async function buscarClientes() {
    try {
        //enviando req para o servidor
        const res = await fetch(`${API_URL}clientes`);
        const data = await res.json();

        return data;

    } catch (error) {
        //erro no servidor
        console.error("Erro ao buscar clientes:", error);
        throw error
    };
};

export async function buscarCliente(registroId) {
    try {
        const res = await fetch(`${API_URL}cliente/${registroId}`)

        //se nao existir o registro no banco
        if (!res.ok) {
            return null;
        };

        //retorno sucesso
        const data = await res.json()
        return data;

    } catch (error) {
        throw error;
    };
};


export async function atualizarDados(cliente) {
    try {
        const res = await fetch(`${API_URL}atualizar/${cliente.ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });
    } catch (error) {
        console.error("Erro ao atualizar o registro:", error);
        throw error
    };
};


export async function criarRegistro(cliente) {
    try {
        //contruindo a req 
        const res = await fetch(`${API_URL}criar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });

        //sucesso
        return res.json()
    } catch (error) {
        console.error("Erro ao criar o registro:", error);
        throw error;
    };


};

//deletar registro
export async function deleteCliente(cliente) {
    try {
        const res = await fetch(`${API_URL}deletar/${cliente.ID}`,
            { method: "DELETE" }
        );
    } catch (error) {
        //erro no servidor
        console.error("Erro ao deletar o registro:", error);
        throw error;
    };
};



