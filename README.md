# Desafio Fullstack

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
