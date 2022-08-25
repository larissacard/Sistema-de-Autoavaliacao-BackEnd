# Sistema-de-Autoavaliação---BackEnd


# Desenvolvedores
<ul>
  <li><a href="https://github.com/Brun0Nasc">Bruno Nascimento</a></li>
  <li><a href="https://github.com/caiosousaf">Caio Sousa</a></li>
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
- [x] SISTEMAS DE GESTÃO DE USUÁRIOS 
- [x] PERFIS DE USUÁRIOS
- [x] ROOT
- [x] ADMINISTRADOR 
- [x] CLIENTE
- [x] COLABORADOR
- [x] GESTÃO DE PESQUISA DE SATISFAÇÃO 
- [x] metodologia NPS

# User

## Login
Usando o método POST podemos acessar o seguinte endereço:
```
https://aasa-senai.herokuapp.com/auth/login
``` 

São esperadas as seguintes entradas:

- User comum
```json
{
	"cpf": "92395178901"
}
```

-  User ADMIN
```json
{
	"cpf": "12395178901",
	"senha": "123123123"
}
```

## Cadastrar User
Usando o método POST podemos acessar o seguinte endereço:
```
https://aasa-senai.herokuapp.com/auth/cadastrar
``` 

São esperadas as seguintes entradas:

```json
{
	"nome": "",
	"email": "",
	"senha": "",
	"tipo": "",
	"cpf": "",
	"foto": ""
}
```

## DELETAR User
Para apagar um, é necessário acessar o seguinte endereço usando o método DELETE, sendo ":id" um identificador de um user:
```
https://aasa-senai.herokuapp.com/user/:id
```
Observações:

	- ":id" se refere ao código identificador de um user

## EDITAR User
Usando o método PUT, podemos acessar o seguinte endereço:
```
https://aasa-senai.herokuapp.com/user/:id
```

	- ":id" se refere ao código identificador de um user

É necessario passar os seguintes campos:

```json
{
	"nome": "",
	"email": "",
	"senha": "",
	"tipo": "",
	"cpf": "",
	"foto": ""
}
```

# Pesquisa

## Cadastrar Pesquisa
Usando o método POST podemos acessar o seguinte endereço:

```
https://aasa-senai.herokuapp.com/pesquisa
```

São esperadas as seguintes entradas:

```json
{
	"titulo": "Aloha",
	"descricao": "aloha para todos, todas e todes",
	"fk_grupo": 5,
	"fk_tipo_pesquisa": 5,
	"fk_usuario": 3
	
}
```
Observações:

	- Não é possível cadastrar pesquisa com grupos não existentes
	- Não é possível cadastrar pesquisa com tipos de pesquisa não existentes
	- Não é possível cadastrar pesquisa com usuario não existente


## Buscar Pesquisa Especifica
Acessar a seguinte rota usando o método GET:
```
https://aasa-senai.herokuapp.com/pesquisa/:id
```

O retorno esperado é um objeto com as seguintes informações:
	- Dados (infomações básicas)
	- Perguntas (lista de perguntas)

```json
{
	"id": "9",
	"descricao": "Saber quem gosta de Maça",
	"fk_tipo_pesquisa": 5,
	"fk_usuario": 6,
	"fk_grupo": "5",
	"data_inicio": null,
	"data_fim": null,
	"created_at": "2022-08-23T19:34:31.008Z",
	"updated_at": "2022-08-23T19:34:31.008Z",
	"titulo": "Pesquisa 2",
	"perguntas": [
		{
			"id": "10",
			"enunciado": "Teste123",
			"fk_pesquisa": "9"
		},
		{
			"id": "11",
			"enunciado": "Teste123",
			"fk_pesquisa": "9"
		},
		{
			"id": "12",
			"enunciado": "Teste1234",
			"fk_pesquisa": "9"
		},
		{
			"id": "13",
			"enunciado": "Teste1234",
			"fk_pesquisa": "9"
		},
		{
			"id": "14",
			"enunciado": "Teste1234",
			"fk_pesquisa": "9"
		},
		{
			"id": "15",
			"enunciado": "Voce gosta de amora",
			"fk_pesquisa": "9"
		}
	]
}
```

## Buscar Pesquisas
Retorna todas as pesquisas que foram cadastradas em uma lista de objetos

```
https://aasa-senai.herokuapp.com/pesquisa
```

```json
[
	{
		"id": "8",
		"descricao": "Saber quem gosta de Kiwi",
		"fk_tipo_pesquisa": 5,
		"fk_usuario": 6,
		"fk_grupo": "5",
		"data_inicio": null,
		"data_fim": null,
		"created_at": "2022-08-23T18:33:00.338Z",
		"updated_at": "2022-08-23T18:33:00.338Z",
		"titulo": "Pesquisa 1",
		"perguntas": []
	}
	{

	}
	
]
```

## Deletar Pesquisa
Para apagar uma, é necessário acessar o  seguinte endereço usando o método DELETE, sendo ":id" um identificador de uma pesquisa:

```
https://aasa-senai.herokuapp.com/pesquisa/:id
```

	- ":id" se refere ao código identificador de uma pesquisa

## Editar/Atualidar Pesquisa
Usando o método PUT, podemos acessar o seguinte endereço:

```
https://aasa-senai.herokuapp.com/pesquisa/:id
```

	- ":id" se refere ao código identificador da equipe

É necessario passar os seguintes campos: 

```json
{
	"titulo": "Aloha",
	"descricao": "aloha para todos, todas e todes",
	"fk_grupo": 5,
	"fk_tipo_pesquisa": 5,
	"fk_usuario": 3
}
```

# Perguntas

## Cadastrar Pergunta
Usando o método POST podemos acessar o seguinte endereço:
```
https://aasa-senai.herokuapp.com/perguntas
```
São esperadas as seguintes entradas:
```json
{
	"enunciado": "Teste1234",
	"fk_pesquisa": 9
}
```
Observações:

	- Não é possível cadastrar pergunta com pesquisas não existentes

## Buscar Pergunta Especifica
Acessar a seguinte rota usando o método GET:
```
https://aasa-senai.herokuapp.com/resposta/:id
```
O retorno esperado é um objeto com as seguintes informações:
	- Dados (informações basicas)
	- Resposta (todas as respostas dessa pergunta)
```json
{
	"id": "15",
	"enunciado": "Voce gosta de amora",
	"fk_pesquisa": "9",
	"respostas": []
}
```

# Resposta

## Cadastrar Resposta
Usando o método POST podemos acessar o seguinte endereço:
```
https://aasa-senai.herokuapp.com/resposta
```
São esperadas as seguintes entradas:
```json
{
	"fk_usuario": 4,
	"fk_pergunta": 9,
	"nota": ""
}
```
Observações:

	- Não é possível cadastrar respostas com usuarios não existentes
    - Não é possível cadastrar respostas com perguntas não existentes

## Buscar Resposta Especifica
Acessar a seguinte rota usando o método GET:
```
https://aasa-senai.herokuapp.com/resposta/:id
```
O retorno esperado é um objeto com as seguintes informações:
	- Dados (informações basicas)
```json
[
	{
		"fk_usuario": "3",
		"nota": 5,
		"created_at": "2022-08-25T16:47:14.637Z",
		"fk_pergunta": "9",
		"id": 7
	},
	{
		"fk_usuario": "4",
		"nota": 9,
		"created_at": "2022-08-25T17:01:21.275Z",
		"fk_pergunta": "9",
		"id": 8
	}
]
```



