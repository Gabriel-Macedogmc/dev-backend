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

# Exemplos de Endpoints

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
  ethnicity:ethnicity
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
