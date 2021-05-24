# Desafio Fullstack

## Requisitos

- [x]  Usuário poderá criar um projeto
- [x]  Usuário poderá criar uma atividade para o projeto escolhido
- [x]  Usuário poderá listar um projeto específico junto com as atividades
- [x]  Usuário poderá editar um projeto e as atividades dele
- [x]  Usuário poderá excluir um projeto
- [x]  Usuário poderá listar todos os projetos e atividades
- [x]  Usuário poderá marcar uma atividade como concluída

## Regras

- [x]  Os campos "nome", "data início" e "data fim" do projeto devem ser obrigatórios
- [x]  Os campos "id", "nome da atividade", "data inicio", "data fim" das atividades devem ser obrigatórios
- [x]  Não deverá ser possível criar uma atividade em um projeto inexistente
- [ ]  Mostrar a porcentagem de projetos já finalizados
- [x]  Mostrar a porcentagem de andamento do projeto ( numero de atividades finalizadas x atividades não finalizadas )
- [x]  Mostrar se o projeto terá atrasos ( data final do projeto deve ser comparada com a maior data final das atividades dele )
- [x]  Ao excluir o projeto, as atividades dele serão excluídas também
- [x]  As exclusões deverão ser confirmadas pelo usuários
- [x]  A data de início do projeto deverá ser sempre menor que a data final
- [x]  A data de início da atividade deverá ser sempre menor que a data final
- [ ]  Ordenar as tabelas por id (ultimos por primeiro)
- [ ]  Zerar valores do modal de cadastro de atividades

---

## Instalação do PostgreSQL

- Fazer o download e instalação no link [https://www.postgresql.org/download/](https://www.postgresql.org/download/)
- Editar a variável de ambiente PATH inserindo as duas linhas abaixo conforme o caminho feito na instalação

```html
C:\Program Files\PostgreSQL\13\bin
C:\Program Files\PostgreSQL\13\lib
```

- Criar a base de dados executando os comandos abaixo

```html
psql -U postgres
CREATE DATABASE euax;
\c euax
```

---

## Backend

Para iniciar o backend da aplicação, precisará rodar as migrations para criar as tabelas que serão utilizadas.

- Dentro da pasta "backend", executar o comando

```html
npx knex migrate:latest
```

isso fará com que todas as migrations sejam rodadas e as duas tabelas sejam criadas.

- Para instalar as dependências, rodar o comando:

```html
yarn install
```

ou

```html
npm install
```

- Por fim, executar o comando

```html
yarn start
```

ou

```html
npm start
```

---

## Frontend

Para iniciar o frontend, rodar os comandos conforme o gerenciador de pacotes instalado:

```html
yarn install
```

ou

```html
npm install
```

- Por fim, para rodar utiliza-se um dos comandos baseado no gerenciador de pacotes

```html
yarn start
```

ou

```html
npm start
```
