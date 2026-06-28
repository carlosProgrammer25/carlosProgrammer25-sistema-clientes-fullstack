// Lógica de comunicação com a API / camada de serviços
const RAW_API_URL = import.meta.env.VITE_API_URL || '';

// 1. Limpa possíveis colchetes que vieram da Netlify
let cleanUrl = RAW_API_URL.replace(/[\[\]]/g, '');

// 2. Garante que sempre comece com https:// para forçar rota externa
if (!cleanUrl.startsWith('http')) {
    cleanUrl = `https://${cleanUrl}`;
}

// 3. Garante que a URL base sempre termine com uma barra '/'
const URL_SEGURA = cleanUrl.endsWith('/') ? cleanUrl : `${cleanUrl}/`;


export async function cadastrarUsuario(usuario) {
    try {
        const res = await fetch(`${URL_SEGURA}painelRegistrar`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        const dados = await res.json();

        if (!res.ok) {
            return dados;
        }
        return dados;
    } catch (error) {
        throw error;
    }
}

export async function logUsuario(usuario) {
    try {
        const res = await fetch(`${URL_SEGURA}paineLogin`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        const dados = await res.json();

        if (!res.ok) {
            console.log('erro');
            return;
        }
        console.log('sucesso');
        return res;
    } catch (error) {
        throw error;
    }
}

export async function buscarClientes() {
    try {
        const res = await fetch(`${URL_SEGURA}clientes`);
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        throw error;
    }
}

export async function buscarCliente(registroId) {
    try {
        const res = await fetch(`${URL_SEGURA}cliente/${registroId}`);

        if (!res.ok) {
            return null;
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export async function atualizarDados(cliente) {
    try {
        const res = await fetch(`${URL_SEGURA}atualizar/${cliente.ID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });
        return res;
    } catch (error) {
        console.error("Erro ao atualizar o registro:", error);
        throw error;
    }
}

export async function criarRegistro(cliente) {
    try {
        const res = await fetch(`${URL_SEGURA}criar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(cliente)
        });

        return res.json();
    } catch (error) {
        console.error("Erro ao criar o registro:", error);
        throw error;
    }
}

export async function deleteCliente(cliente) {
    try {
        const res = await fetch(`${URL_SEGURA}deletar/${cliente.ID}`, {
            method: "DELETE"
        });
        return res;
    } catch (error) {
        console.error("Erro ao deletar o registro:", error);
        throw error;
    }
}
