//Servidor HTTP com rotas Express / Rodar API para Postman
import "dotenv/config";
//framework de produção com node, facilita a criacao do servidor http
//npm install --save-dev @types/express => ts nao entende typagem do express
import express from "express";
import cors from "cors";
import { getClientes, getCliente, UpdateCliente, addCliente, deleteCliente, painelReg, paineLog, buscarUsuarioPorEmail } from "./repositories/clientesRepository.js"

const PORT = process.env.PORT || 3000;
//instancia o servidor 
const app = express();
app.use(cors()); // comunicacao front e back
//ler o corpo da requisicao em formato json e transformar em obj js
app.use(express.json());


// ROTAS


app.post('/painelRegistrar', async (req, res) => {
    //fazer o cadastro no banco
    try {
        {/*verificando se existe usuario no cadastro */ }
        const existe = await buscarUsuarioPorEmail(req.body.usuario)

        if (existe) {
            return res.status(400).json({
                message: "Usuário já existe",
                ok:false
            })
        }

        //cria se nao existir o  usuario
        const resposta = await painelReg(req.body.usuario, req.body.senha)

        return res.status(201).json(resposta)

    }
    catch (error) {
        return res.status(500).json({
            message: "Erro ao criar Usuario"
        })
    }
})

app.post('/paineLogin', async (req, res) => {
    try {
        const resposta = await paineLog(req.body.usuario, req.body.senha)

        //encontrou o usuairo
        if (resposta) {
            //liberar acesso a clientes
            return res.status(200).json({
                sucesso: true,
                mensagem: "login efetuado",
                usuario: resposta.Email
            })
        }

        //pega nan, null, underfine nao encontar na tabela
        return res.status(401).json({
            sucesso: false,
            mensagem: "Usuário ou senha inválidos"
        })
    }
    catch (error) {
        res.status(500).json({ message: 'erro ao criar' })
    }
})

// Buscar todos os dados da tabela
app.get('/clientes', async (req, res) => {
    try {
        //consulta
        const resultado = await getClientes();
        return res.status(200).json(resultado)
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'erro na busca' });
    };
});


// Buscar somente um registro com base no id
app.get("/cliente/:id", async (req, res) => {

    try {
        const id = Number(req.params.id);
        //isNaN converte o valor antes de verificar, se id for igual a NaN, entra no if
        //number.isNan() nao converte, verifica exatamente o valor
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        };

        const resultado = await getCliente(id);

        //se nao encontrar registro retorna null
        if (resultado === null) {
            return res.status(404).json({ erro: `Cliente com id ${req.params.id} nao encontrado` })
        };

        //ao acessar o retorno no front, os dados estao dentro da propriedade data do obj retornado da api
        return res.status(200).json({
            success: true,
            data: resultado
        });
    }
    catch (error) {
        console.error(error);
        //falha servidor => banco
        res.status(500).json({ message: 'erro ao buscar registro pelo id' })
    };
});


// Atualizar dados na tabela
app.put('/atualizar/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);

        //dados corpo da requisicao
        const dadosAtualizar = {
            Nome: req.body.Nome,
            Idade: req.body.Idade,
            UF: req.body.UF
        };

        if (Number.isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        };

        const consulta = await UpdateCliente(id, dadosAtualizar);

        //se nao encontrar registro para ser editado
        if (!consulta) {
            return res.status(404).json({ erro: 'nao atualizado' })
        };

        //se encontrar o id do registro e atualizar o campo
        return res.status(200).json(consulta);
    }
    catch (error) {
        //se nao atualizr update retorna erro
        console.error('erro ao atualizar', error);
        throw error
    };
});


// Criar registro na tabela
app.post('/criar', async (req, res) => {
    try {

        /*
        idade valor enviado do input
        valor input padrao é string
        convertendo valor para inserir na tabela
        onde campo idade é int 
        */
        const idade = Number(req.body.idade);

        //se idade nao for um numero
        if (isNaN(idade)) {
            return res.status(400).json({ erro: "Idade inválida" });
        }

        //se idade for igual a numero
        req.body.idade = idade;

        const consulta = await addCliente({
            Nome: req.body.nome,
            Idade: req.body.idade,
            //no schema uf esta configurado até 2 caracters max
            UF: req.body.uf
        });

        //sucesso ao criar novo registro
        return res.status(201).json(consulta)
    }
    catch (error) {
        //se nao inserir dados na tabela, retorna erro
        console.error(error);
        throw error
    };
});


//Deletar registro
app.delete('/deletar/:id', async (req, res) => {
    try {
        //pega valor da url que esta em string e transforma em numero
        const id = Number(req.params.id);

        //se id nao for um numero => is not a number
        if (Number.isNaN(id)) {
            return res.status(400).json({ error: "ID inválido" });
        }

        const resultado = await deleteCliente(id);

        //se nao existir id na tabela, delet retorna null
        if (resultado === null) {
            return res.status(404).json({ erro: "Cliente não encontrado" })
        };

        //sucesso ao deletar 
        return res.status(200).json({
            mensagem: "sucesso",
            data: resultado
        });
    }
    catch (error) {
        //se ocorrer erro com o banco retorna para o cath
        console.error(error);
        return res.status(500).json({ error: 'nao rodou' })
    };
});

//se nenhuma rota for chamada
app.use((req, res) => {
    res.status(404).json({ erro: "Rota não encontrada" });
});


//inicia o servidor/liga
app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`);
});
