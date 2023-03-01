# BoardCamp :world_map:

### 📄👀 Documentação do Software 
Esta é a implementação Back-end (API) do BoardCamp, um sistema de gestão que simula uma locadora de jogos de tabuleiro, onde foram implementados o gerenciamentos das categorias, dos jogos, dos clientes e dos alugueis.

<details>
  <summary><strong>Instalação</strong></summary>

  ## 🛠️💻 Instalação do Sistema
Para rodar o projeto, primeiro clone este repositório usando o comando:

``` bash
git clone https://github.com/seu-usuario/nome-do-projeto.git
```
Em seguida, instale as dependências usando o gerenciador de pacotes de sua escolha. Recomendo o uso do npm:
  
``` bash
npm install
```
Crie um arquivo <span style="color: green"> .env </span> na raiz do projeto e defina as seguintes variáveis de ambiente:
``` env
DATABASE_URL=postgresql://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}
``` 
</details>



<details>
<summary><strong>Utilização</strong></summary>
  
 ## 🚀💡 Utilização
  
Para rodar o projeto em um servidor de desenvolvimento, execute o seguinte comando:

``` bash
npm start

npm run dev
```
</details>

<details>
  <summary><strong>Tecnologias Utilizadas</strong></summary>
   
  ## 🔧📦 Tecnologias
  
- Node.js 
- Express 
- PostgreSQL
- Joi
- Visual Studio Code
- Git e GitHub

  O projeto foi desenvolvido em Node, Express e PostgreSQL. Para o desenvolvimento, utilizei o Visual Studio Code como IDE e o Git para controle de versão e o GitHub como repositório remoto.

Links úteis:
- [Visual Studio Code](https://code.visualstudio.com/docs)
- [Git](https://git-scm.com/doc)
- [GitHub](https://docs.github.com/) 
</details>


<details>
  <summary><strong>Estrutura das Pastas </strong></summary>

## 🌳📂 A estrutura do projeto é organizada da seguinte maneira:
```markdown
- `src/`                        # Contém todo o código-fonte da aplicação
  - `controllers/`              # Contém os controladores 
    - categories.controller.js
    - customers.controller.js
    - games.controller.js
    - rentals.controller.js
  - `database/`                 # Contém o arquivo de configuração do banco de dados
    - database.js
  - `middleware/`               # Contém os middlewares utilizados pela aplicação
    - middleware.js
    - rentals.middleware.js
  - `routes/`                   # Contém as rotas para cada modelo
    - categories.routes.js
    - customers.routes.js
    - games.routes.js
    - rentals.routes.js
  - `schemas/`                  # Contém os esquemas 
    - customers.schema.js
    - games.schema.js
  - server.js                   # Arquivo principal da aplicação

``` 
</details>

<details>
  <summary><strong>API - Endpoints</strong></summary>
  
  ## 📋 Segue abaixo o resumo dos endpoints do BoardCamp:
  - Categories
    - `POST /categories`: Criar categoria do jogo.
    - `GET /categories`: Lista todas as Categorias de jogos.
  - Games
    - `GET /games`: Lista todos os jogos.
    - `POST /games`: Inserido jogos para alugar.
  - Customers
    - `GET /customers`: Lista todos os clientes.
    - `GET /customers/:id`: Busca cliente por id.
    - `POST /customers`: Cadastra de um novo cliente.
    - `PUT /customers/:id`: Atualiza o cadastro do cliente.
  - Rentals
    - `GET /rentals`:  Lista com todos os aluguéis, contendo o customer e o game.
    - `POST /rentals`: Cria um novo aluguel.
    - `POST /rentals/:id/return`: Retorno do aluguel.
    - `DELETE /rentals/:id`: Exclusão do aluguél.
  
   
</details>
