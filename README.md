# Sistema de Gestão de Pedidos Multiempresa
Este sistema foi desenvolvido como parte do Trabalho Prático de Sistemas Distribuídos, com o objetivo de criar uma solução completa para a gestão de pedidos de aprovação em um ambiente multiempresa.


## Visão Geral
O sistema permite que empresas submetam pedidos de diversos tipos, como aquisição de materiais, solicitação de serviços e pedidos de reembolso. Os pedidos passam por um fluxo de validação e aprovação, que pode ser automático (para valores menores que €1.000) ou manual (para valores maiores ou iguais a €1.000).


## Tecnologias Utilizadas
* **Backend:** Node.js com Express
* **Banco de Dados:** PostgreSQL 
* **Integração:** WSO2 Integrator
* **Documentação:** Swagger/OpenAPI
* **Containerização:** Docker e Docker Compose
* **Testes:** Jest e Supertest
* **Comunicação Assíncrona:** RabbitMQ 


## Funcionalidades Principais
* Submissão de pedidos com validação de dados.
* Integração com WSO2 para validação externa e processamento interno.
* Aprovação automática e manual de pedidos.
* Consulta de pedidos por ID ou listagem de todos os pedidos.
* Documentação completa da API com Swagger/OpenAPI.
* Containerização com Docker para facilitar a execução.
* Testes unitários e de integração para garantir a qualidade do código.
* Comunicação assíncrona com RabbitMQ para escalabilidade.


## Pré-requisitos
* Node.js (versão 22)
* npm (versão 8 ou superior)
* Docker e Docker Compose
* PostgreSQL
* RabbitMQ 
* WSO2 Integrator


## Instalação
1.  Clone o repositório:
    Na raiz do projeto:
    git clone <URL_DO_SEU_REPOSITORIO>
    cd sistemaPedidos
    
2.  Instale as dependências do backend:
    ```bash
    npm install
    ```
3.  Configure as variáveis de ambiente:
    * Crie um arquivo `.env` na raiz do projeto.
    * Adicione as seguintes variáveis:
        ```
        DB_HOST=localhost
        DB_USER=seu_usuario
        DB_PASSWORD=sua_senha
        DB_NAME=pedidos_db
        DB_PORT=5432 (para PostgreSQL) ou 3306 (para MySQL)
        RABBITMQ_URL=amqp://localhost (opcional)
        ```
4.  Inicie o banco de dados e o RabbitMQ (opcional).
5.  Execute o WSO2 Integrator (siga as instruções de instalação do WSO2).
## Execução
1.  Inicie o backend:
    ```bash
    npm start
    ```
2.  Acesse a documentação Swagger:
    ```
    http://localhost:3000/api-docs
    ```
3.  Utilize os endpoints da API para submeter e gerenciar pedidos.
4.  Execute os testes:
    ```bash
    npm test
    ```
5.  Execute o sistema com Docker Compose:
    ```bash
    docker-compose up
    ```
## Endpoints da API
* `POST /empresas`: Cria uma nova empresa.
* `GET /empresas`: Lista todas as empresas.
* `GET /empresas/{id}`: Busca uma empresa por ID.
* `POST /pedidos`: Cria um novo pedido.
* `GET /pedidos`: Lista todos os pedidos.
* `GET /pedidos/{id}`: Busca um pedido por ID.
* `PUT /pedidos/{id}/status`: Atualiza o status de um pedido.
## Exemplos de Uso
* **Criar um pedido:**
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{
      "empresa_id": 1,
      "tipo": "Aquisição de materiais",
      "descricao": "Compra de laptops",
      "valor": 500,
      "data_submissao": "2024-05-21"
    }' http://localhost:3000/pedidos
    ```
* **Atualizar o status de um pedido:**
    ```bash
    curl -X PUT -H "Content-Type: application/json" -d '{
      "estado": "APROVADO"
    }' http://localhost:3000/pedidos/1/status
    ```
## Testes
Para executar os testes, utilize o comando:
```bash
npm test

Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.


### Considerações Finais
Sua implementação é uma boa base para um sistema de gestão de pedidos multiempresa. Com as melhorias sugeridas e a implementação dos requisitos pendentes, você poderá criar um sistema robusto e bem documentado. Continue o bom trabalho!


Participantes:
1 - Deusa Sanches
2 - Júlio Ndan
3 - Leila Borges
