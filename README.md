# Desafio para Vaga Backend

### Projeto consiste em um cadastro de usuário passando seus dados e em seguida o cadastro de seu endereço com validação de email, autenticação através de token e testes unitátios. Foi construído sob uma arquitetura DDD junto ao Typescript e princípios SOLID.

# Libs Utilizadas: 

### 1. ExpressJs (Requisições HTTPS)
### 2. Jest (Testes Unitátios)
### 3. jsonwebtoken (Geração de Token)
### 4. bcrypt (Hash de Senhas nível médio)
### 5. typeorm (ORM para comunição entre models e migrations do Banco)
### 6. tsyringe (Containers para injeção de dependências)

# Funcionalidades:

#### Criação do User
#### Login do User
#### Listagem do User
#### Update do User
#### Deleção do User
#### Criação do Endereço
#### Listagem do Endereço junto ao User
#### Update do Endereço 
#### Deleção do Endereço

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
      - POSTGRES_PASSWORD=docker
      - POSTGRES_DATABASE=vaga
    ports:
      - '5435:5432'

```

## Rodando usando Docker Compose:
```console
$ docker compose up -d
```

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
- Todos parâmetros passados as rotas são do tipo string, e o modo de Auth está Bearer no Insomnia.  
- Antes de todas as rotas http://localhost:3333/

POST /users/
```
{
  name:name,
  telephone:telephone,	
  email:email,
  password:password,
  age:age,
  weight:weight,
  ethnicity:ethnicity
}
```
PUT /users/:user_id
```
{
  name:name,
  telephone:telephone,	
  email:email,
  password:password,
  old_password:old_password
  age:age,
  weight:weight,
}
```

POST /session/
```
{
  email:email,
  password:password,

}
```

POST /address/
```
{
  user_id:user_id,
  address:address,
  number:number,
  complement:complement,
  cep:cep,
  city:city,
  state:state,
}
```

PUT /address/:address_id
```
{
  user_id:user_id,
  address:address,
  number:number,
  complement:complement,
  cep:cep,
  city:city,
  state:state,
}
```
