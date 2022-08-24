select * from usuario

insert into usuario(tipo, nome, email, senha, cpf, foto) VALUES(3, 'aluno', 'aluno', '123', '00000000001', 'aaaaaa')

select * from tipo_pesquisa

insert into tipo_pesquisa(nome) values('tipo 1')

select * from pesquisa

insert into pesquisa(descricao, fk_tipo_pesquisa, fk_usuario, fk_grupo, titulo) values('descricao', 1, 1, 1, 'titulo')

select * from grupo

insert into grupo(nome, status) values('grupo 1', 1)

select * from perguntas

insert into perguntas(enunciado, fk_pesquisa) values('enunciado 1', 1), ('enunciado 2', 1), ('enunciado 3', 1)

select * from respostas

insert into respostas(fk_usuario, nota, fk_pergunta) values(2, 5, 1), (2, 3, 2)

delete from perguntas where id=1

delete from pesquisa where id=1