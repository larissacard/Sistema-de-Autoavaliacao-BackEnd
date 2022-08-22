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
```
https://aasa-senai.herokuapp.com/auth/login
``` 

- User comum
```
{
	"cpf": "12301"
}
```

-  User ADMIN
```
{
	"cpf": "12302131",
	"senha": "1201"
}
```

