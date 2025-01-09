## Atividade: Mapeando o Domínio
Clique no link para ver a atividade: [https://www.notion.so/](https://efficient-sloth-d85.notion.site/Atividade-Mapeando-o-dom-nio-38963358ffd74289b824ff73b187165d)

### Solução
Sistema de Gerenciamento de Estoque

---
#### Entidades de Domínio

1. Produto
2. Usuário
3. Venda
4. Ordem de Compra
5. Fornecedor

---
#### Casos de Uso

- Gerenciar Produtos
  - Criar, atualizar ou excluir produtos no sistema
  - Atribuir informações extras (como tamanho, cor, etc.) e identificador único.
- Configurar Estoque Mínimo
  - Definir quantidade mínima por produto.
  - Receber alertas quando o estoque atingir ou estiver abaixo do limite.
- Visualizar Histórico de Movimentações
  - Consultar vendas por período.
  - Observar tendências de estoque e vendas.
  - Gerar relatórios com lucro por produto e produtos mais vendidos.
- Integrar com Fornecedores
  - Receber atualizações automáticas sobre os prazos de entrega e disponibilidade de produtos.
- Enviar alertas
  - Notificar usuários por e-mails e sistema, sobre:
    - Estoque abaixo do limite.
    - Atualizações de ordens de compra.

---
#### Regras de Negócio

1. O sistema deve enviar alertas de baixa no estoque por e-mail e notificações internas.
2. Ordens de compra devem ser geradas automaticamente quando o estoque estiver abaixo do limite definido.
3. Informações de tendências de vendas devem ser calculadas com base em dados históricos de vendas.
4. Produtos com atibutos personalizados devem ser rastreáveis de forma independente.
