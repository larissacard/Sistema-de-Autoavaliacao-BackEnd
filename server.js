const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan')

const authRoutes = require('./routes/auth');
const pesquisa = require('./routes/pesquisas')
const usuario = require('./routes/usuarios')
const pergunta = require('./routes/perguntas')
const resposta = require('./routes/resposta')
const grupo = require('./routes/grupo')
// const { route } = require('../routes/auth');

const host = '0.0.0.0';
const port = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());
app.use(morgan('dev'))
// app.use(route);

app.use('/auth', authRoutes);
app.use(pesquisa)
app.use(usuario)
app.use(pergunta)
app.use(resposta)
app.use(grupo)

app.listen(port, host, () => {
    console.log(`API funcionando no host:`, host, `e na porta:`, port)
})

