# RF: Recursos funcionais

- [x] O usuário deve poder criar uma nova transação.
- [x] O usuário deve poder obter um resumo da sua conta.
- [x] O usuário deve poder listar todas as transações que já ocorreram.
- [x] O usuário deve poder visualizar uma transação única.

# RN: Regras de negócio

- [x] A transação pode ser do tipo crédito (somará ao valor total), ou débito que irá subtrair.
- [ ] Deve ser possível identificarmos o usuário entre as requisições.
- [ ] O usuário só pode visualizar transações no qual ele criou.

# RNF: Recursos não funcionais

- [ ] Em planejamento ...

---

SETUP nodejs@18.13.0

```
winget install Schniz.fnm
fnm env --use-on-cd | Out-String | Invoke-Expression
fnm use --install-if-missing 18.13.0
```
