const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Configura a conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'turismo_db' 
});

// Conecta ao banco de dados'
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão estabelecida com sucesso ao banco de dados!');
    }
});

// Serve arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Rota para cadastro
app.post('/cadastrar', (req, res) => {''
    console.log('Dados recebidos:', req.body);
    const { email, senha, nome, cpf, telefone } = req.body;
    const query = 'INSERT INTO clientes (email, senha, nome, cpf, telefone) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [email, senha, nome, cpf, telefone], (err, results) => {
        if (err) {
            console.error('Erro ao cadastrar usuário:', err);
            res.status(500).json({ mensagem: 'Erro ao cadastrar usuário' });
        } else {
            res.json({ mensagem: 'Usuário cadastrado com sucesso!' });
        }
    });
});


app.get('/obterDados', (req, res) => {
    const email = req.query.email; // Obtém o email do usuário da solicitação

    // Consulta para obter os dados do usuário pelo email
    const query = 'SELECT nome, email, telefone, cpf, senha FROM Clientes WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            res.status(500).json({ sucesso: false, mensagem: 'Erro ao consultar o banco de dados' });
        } else {
            if (results.length > 0) {
                // Dados do usuário encontrados, retorna-os como resposta
                const usuario = {
                    nome: results[0].nome,
                    email: results[0].email,
                    telefone: results[0].telefone,
                    cpf: results[0].cpf,
                    senha: results[0].senha
                };
                res.json({ sucesso: true, usuario });
            } else {
                // Usuário não encontrado
                res.json({ sucesso: false, mensagem: 'Usuário não encontrado' });
            }
        }
    });
});




// Rota para login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    
    // Consulta para verificar as credenciais de login
    const query = 'SELECT nome FROM Clientes WHERE email = ? AND senha = ?';
    connection.query(query, [email, senha], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            res.status(500).json({ sucesso: false, mensagem: 'Erro ao consultar o banco de dados' });
        } else {
            if (results.length > 0) {
                // Login bem-sucedido, retorna o nome do usuário
                const nomeUsuario = results[0].nome;
                res.json({ sucesso: true, nome: nomeUsuario });
            } else {
                // Credenciais inválidas
                res.json({ sucesso: false, mensagem: 'Credenciais inválidas' });
            }
        }
    });
});
// Rota para obter o nome do usuário logado
app.get('/obterUsuario', (req, res) => {
    const email = req.query.email;
    
    // Consulta para obter o nome do usuário
    const query = 'SELECT nome FROM Clientes WHERE email = ?';
    connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o banco de dados:', err);
            res.status(500).json({ sucesso: false, mensagem: 'Erro ao consultar o banco de dados' });
        } else {
            if (results.length > 0) {
                // Envia o nome do usuário
                const nomeUsuario = results[0].nome;
                res.json({ sucesso: true, nome: nomeUsuario });
            } else {
                // Usuário não encontrado
                res.json({ sucesso: false, mensagem: 'Usuário não encontrado' });
            }
        }
    });
});

app.post('/reservar', (req, res) => {
    const bookingData = req.body;
    console.log('Dados da reserva recebidos:', bookingData);

    // Query SQL para inserir os dados da reserva no banco de dados
    const query = 'INSERT INTO reservas (origem, destino, data_viagem, data_retorno, assento) VALUES (?, ?, ?, ?, ?)';
    const values = [bookingData.from, bookingData.to, bookingData.departureDate, bookingData.returnDate, bookingData.seatSelection];

    connection.query(query, values, (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados no banco de dados:', err);
            res.status(500).json({ message: 'Erro ao realizar a reserva.' });
        }
    });
});

app.get('/ObterReserva', (req, res) => {
    const query = 'SELECT origem, destino, assento, data_viagem FROM reservas';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao executar a consulta:', err);
            res.status(500).send('Erro ao buscar dados');
        } else {
            console.log(results); // Exibe os dados no console
            res.json(results); // Retorna os dados como JSON na resposta da rota
        }
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});