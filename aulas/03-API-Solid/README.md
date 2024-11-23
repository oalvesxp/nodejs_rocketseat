# App

GymPass style app.

## Setup 

Instalando as dependências
```sh
npm install
```

Iniciando o container do banco de dados PostgreSQL
```sh
docker compose up -d
```

Criando as tabelas na base de dados
```sh
npx prisma migrate dev
```

## RFs (Requisitos Funcionais)
- [x] Deve ser possível se cadastrar.
- [x] Deve ser possível se autenticar.
- [ ] Deve ser possível obter o perfil de um usuário logado.
- [ ] Deve ser possível obter o número de check-ins realizados pelo usuário logado.
- [ ] Deve ser possível o usuário obter seu histórico de check-ins.
- [ ] Deve ser possível o usuário buscar academias próximas.
- [ ] Deve ser possível o usuário buscar academias pelo nome.
- [ ] Deve ser possível o usuário realizar check-in em uma academia.
- [ ] Deve ser possível validar o check-in de um usuário.
- [ ] Deve ser possível cadastrar uma academia.

## RNs (Regras de Negócio)
- [x] O usuário não deve poder se cadastrar com um e-mail duplicado.
- [ ] O usuário não pode fazer 2 check-ins no mesmo dia.
- [ ] O usuário não pode fazer check-inn, se não estiver perto (100m) da academia.
- [ ] O check-in só pode ser validado até 20 minutos após ser criado.
- [ ] O check-in só pode ser validado por administradores.
- [ ] A academia só pode ser cadastrada por administradores.


## RNFs (Requisitos Não Funcionais)

- [x] A senha do usuário deve estar criptografada.
- [x] Os dados da aplicação precisam estar persistidos em um banco PostGreSQL.
- [ ] Todas as listas de dados devem estar paginadas com 20 itens por página.
- [ ] O usuário deve ser identificado por um JWT (JSON Web Token).
