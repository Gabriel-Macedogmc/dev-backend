# Desafio para Vaga Backend

### Projeto consiste em um cadastro de usuário passando seus dados e em seguida o cadastro de seu endereço com validação de email, autenticação através de token e testes unitátios. Foi construído sob uma arquitetura DDD junto ao Typescript e princípios SOLID.

# Libs Utilizadas: 

### 1. ExpressJs (Requisições HTTPS)
### 2. Jest (Testes Unitátios)
### 3. jsonwebtoken (Geração de Token)
### 4. bcrypt (Hash de Senhas nível médio)
### 5. typeorm (ORM para comunição entre models e migrations do Banco)
### 6. tsyringe (Containers para injeção de dependências)

### Rodar projeto:
```console
$ yarn //instala dependências

$ yarn dev //starta o servidor

$ yarn test //inicia todos os tests

$ yarn typeorm migration:run //rodar todas as migration
```

# Usando Docker Compose:
```yml
version: '3.7'
services:
  db:
    image: postgres:latest
    container_name: vaga-dev
    environment:
      - POSTGRES_USER=docker
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DATABASE=vaga
    ports:
      - '5435:5432'

```

## Rodando Projeto com Docker Compose:
- Antes de startar o servidor deve-se iniciar o docker utilizando o comando "docker compose -d up"
- após iniciado, deve-se criar uma Database chamada "desafio".
- Feito isso e startando o servidor node, utilizar endpoint: http://localhost:3333/


## OrmConfig: 
```javascript
 {
  type: "postgres",
  url: process.env.DATABASE_URL,
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations"
  }
}
```

# Exemplos de Endpoints

-Criar Usuário

POST /user

```jsx
{
 "name": "John Doe",
 "email": "johndoe@email.com",
 "password": "123",
 "telephone": 000000,	
 "age": 11,
 "weight": 11.1,
 "ethnicity": "any"
}
```

- Somente será aceito no campo ethnicity valores como: branca, preta, parda ou indigina
- outros campos como age e weight não permitem valores menores que 0.


-Logar Usuário

POST /session/

```jsx
{
  email:"johndoe@email.com",
  password:"123",
}
```
- após a requisição sera retornado um token, o token deve ser usado para autenticar o usuário nas rotas protegidas
- o exemplo de retorna da rota acima seria um Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MTkyMDIxMjQsImV4cCI6MTYxOTgwNjkyNCwic3ViIjoiZjM0Y2UwYzQtMDQ0NC00NDQ3LTlhYzAtMDg1MDVlNTMxYWRhIn0.XmMY9wgypXeOywOCJLBPEF-S_jiCUOJUd-GHod70GK4"


-Listar Todos Usuários
 	 
GET /user
  
exemplo de retorno:
  
 ```jsx 
  [
     {
       "id": "682f71cb-92f8-4b83-a662-2c53d97bd90a",
       "name": "user1",
       "email": "user1@email.com",
       "password": "$2b$10$cjWb2fAlpwInKHbYcC./F.lT9QFCSHbS91x.xvdZzVMwfhrgfi7vq",
       "telephone": 0000000,
       "age": 11,
       "weight": 11.11,
       "ethnicity": "any"
     },
     {
       "id": "86a2434d-0ad4-4a79-bdb6-06fc93227ce5",
       "name": "user2",
       "email": "user2@email.com",
       "password": "$2b$10$GJ5Qgk4eSwC0OAp85cPIReYPA3r.YjUiZprNTTWODkb5/SAFeCzqK",
       "telephone": 0000000,
       "age": 11,
       "weight": 11.11,
       "ethnicity": "any"
     }
   ]
  ```
  
-Listar Único Usuário
  
GET /user/profile/:user_id

- a rota receberá um user_id como parâmentro e exibira seu perfil, como no exemplo:

```jsx 
{
  "id": "8b03d733-9559-4cde-af47-931a14a81432",
  "name": "user",
  "telephone": "1234566",
  "email": "user@email.com",
  "age": 20,
  "weight": 50,
  "ethnicity": "any",
  "created_at": "2021-03-05T21:00:22.217Z",
  "updated_at": "2021-03-05T21:00:22.217Z"
}
```
- por segurança ao retorna o usuário sua senha foi tirada do retorno.


-Atualizar Usuário 

PUT /user/profile/:user_id
 
- a rota receberá um user_id como parâmentro e atualizara o perfil, caso todos os dados estejam preenchidos

```jsx 
{
 "name": "user_atualizado",
 "telephone": "1234566",	
 "email": "email_atualizado@email.com",
 "password": "123123",
 "old_password": "123123",
 "age": 20,
 "weight": 50
}
```

- o campo ethnicity não esta liberado para alterações

-Deletar Usuário

 DELETE /user/profile/:user_id

- a rota receberá um user_id como parâmentro e deletará o perfil

```jsx
{
 "user deleted" 
}
```

### -Todas Rotas com prefixo 'address' deve receber um token para ter acesso a elas

-Criar um Endereço

POST /address/

```jsx
{
 "address": "any_address",
 "number": 294,
 "complement": "any_complement",
 "cep": 974216714,
 "city": "any_city",
 	"state": "any_state",
 	"user_id": "f34ce0c4-0444-4447-9ac0-08505e531ada"
}
```

- deve-se passar o campo user_id, com o Id de algum usuário já criado

-Listar todos Endereços

GET /address

- a rota retornará todos os endereços, com o usuário pertencente aquele endereço

```jsx
[
  {
    "id": "897c0e25-eee3-4d57-9592-166bfab1930f",
    "address": "any_address",
    "number": "294",
    "complement": "any_complement",
    "cep": 974216714,
    "city": "any_cityP",
    "state": "any_state",
    "user_id": "f34ce0c4-0444-4447-9ac0-08505e531ada",
    "created_at": "2021-04-23T21:31:25.595Z",
    "updated_at": "2021-04-23T21:31:25.595Z",
    "user": {
      "id": "f34ce0c4-0444-4447-9ac0-08505e531ada",
      "name": "user1",
      "telephone": "123123123123",
      "email": "user1@email.com",
      "password": "$2b$08$TYoHewXrTjk4pYT.qph8NudZgj6jXDZr4j1jT/wzapRRC3fTYWPsa",
      "age": 20,
      "weight": 50,
      "ethnicity": "any",
      "created_at": "2021-04-23T21:19:59.377Z",
      "updated_at": "2021-04-23T21:19:59.377Z"
    }
  },
  {
    "id": "779b2163-2271-4f83-a1fe-14f9d89257da",
    "address": "any_address2",
    "number": "295",
    "complement": "any_complement2",
    "cep": 974216714,
    "city": "any_city2",
    "state": "any_state2",
    "user_id": "f34ce0c4-0444-4447-9ac0-08505e531ada",
    "created_at": "2021-04-23T21:44:07.125Z",
    "updated_at": "2021-04-23T21:44:07.125Z",
    "user": {
      "id": "f34ce0c4-0444-4447-9ac0-08505e531ada",
      "name": "user2",
      "telephone": "123123123123",
      "email": "user2@email.com",
      "password": "$2b$08$TYoHewXrTjk4pYT.qph8NudZgj6jXDZr4j1jT/wzapRRC3fTYWPsa",
      "age": 20,
      "weight": 50,
      "ethnicity": "any",
      "created_at": "2021-04-23T21:19:59.377Z",
      "updated_at": "2021-04-23T21:19:59.377Z"
    }
  }
]
```

-Listar Único Endereço

GET /address/:address_id

- a rota recebe um address_id como parâmetro, e retornará um único endereço associado a tal usuário

```jsx
 {
    "id": "897c0e25-eee3-4d57-9592-166bfab1930f",
    "address": "any_address",
    "number": "294",
    "complement": "any_complement",
    "cep": 974216714,
    "city": "any_cityP",
    "state": "any_state",
    "user_id": "f34ce0c4-0444-4447-9ac0-08505e531ada",
    "created_at": "2021-04-23T21:31:25.595Z",
    "updated_at": "2021-04-23T21:31:25.595Z",
    "user": {
      "id": "f34ce0c4-0444-4447-9ac0-08505e531ada",
      "name": "user1",
      "telephone": "123123123123",
      "email": "user1@email.com",
      "password": "$2b$08$TYoHewXrTjk4pYT.qph8NudZgj6jXDZr4j1jT/wzapRRC3fTYWPsa",
      "age": 20,
      "weight": 50,
      "ethnicity": "any",
      "created_at": "2021-04-23T21:19:59.377Z",
      "updated_at": "2021-04-23T21:19:59.377Z"
    }
  }
```

-Atualizar Endereço

PUT /address/:address_id

- a rota recebe um address_id como parâmetro, e atualizará um único endereço podendo mudar o usuário.

```jsx 
{
  "address": "any_address",
  	"number": 294,
  	"complement": "any_complement",
  	"cep": 974216714,
  	"city": "any_city",
  	"state": "any_state",
	  "user_id": "f34ce0c4-0444-4447-9ac0-08505e531ada"
}
```

-Deletar Endereço

DELETE /address/:addres_id

- a rota recebe um address_id como parâmetro, e deletará um único endereço

```jsx
{
 "address deleted"
}
```
