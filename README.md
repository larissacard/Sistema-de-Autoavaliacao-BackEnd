# Sistema-de-Autoavaliação---BackEnd


# Desenvolvedores
<ul>
  <li><a href="https://github.com/larissacard">Larissa Cardoso</a></li>
  <li><a href="https://github.com/VinicciusSantos">Vinicius Guedes</a></li>
  <li><a href="https://github.com/PedroMiguel7">Pedro Miguel</a></li>
  <li><a href="https://github.com/cadumeneses">Carlos Eduardo</a></li>
  <li><a href="https://github.com/Ndav07">Nikollas David</a></li>
</ul>

# Menu
- [Desenvolvedores](#desenvolvedores)
- [Menu](#menu)
- [Sobre o Sistema](#sobre-o-sistema)
- [Funcionalidades](#funcionalidades)

# Sobre o Sistema
- O Sistema de Avaliação e Pesquisa -SAP deve ser capaz de gerenciar avaliações de desempenho  e pesquisas de satisfação a ser executado com colaboradores e cliente fazendo uso de diversas metodologias.
-  O Banco de Dados e a BackEnd estão hospedadas no [Heroku](https://www.heroku.com).
- Foi desenvolvido com [NodeJs](https://nodejs.org/en/), [Express](https://expressjs.com/pt-br/) e [PostgreSQL](https://www.postgresql.org);

# Funcionalidades
- SISTEMAS DE GESTÃO DE USUÁRIOS 
- PERFIS DE USUÁRIOS
  - ROOT
  - ADMINISTRADOR 
  - CLIENTE
  - COLABORADOR
- GESTÃO DE PESQUISA DE SATISFAÇÃO 
  - metodologia NPS

# Rotas

## Login
Usando o método POST podemos acessar o seguinte endereço:
```
https://aasa-senai.herokuapp.com/auth/login
``` 

São esperadas as seguintes entradas:

- User comum
```
{
	"cpf": "12345678900"
}
```

-  User ADMIN
```
{
	"cpf": "12345678900",
	"senha": "1234"
}
```

## Cadastrar User
Usando o método POST podemos acessar o seguinte endereço:
```
https://aasa-senai.herokuapp.com/auth/cadastrar
``` 

São esperadas as seguintes entradas:
```
{
	"nome": "larissa",
	"email": "larissa@gmail.com";
	"senha": "1234",
	"tipo": "1",
	"cpf": "12345678900",
	"foto": ""
}
```

## Pesquisa

- Buscar Pesquisa Especifica
Acessar a seguinte rota usando o método GET:
```
https://aasa-senai.herokuapp.com/auth/pesquisa/:id
```
O retorno esperado é um objeto com as seguintes informações:
- Dados (infomações básicas);
- Perguntas
- Respostas

```
{
	"descricao": "",
	"tipo_pesquisa": "",
	"id_usuario": ""
}
```




