<h1 align = "center">
  <img src = "./src/assets/Banner.png">
</h1>

## Sobre o projeto

O projeto final Rocketseat FoodExplorer é uma aplicação web desenvolvida para um restaurante fictício. Nela, todos os usuários devem ter a capacidade de se cadastrar na página e realizar o seu Login. Caso o usuário seja um ***admin***, ele terá a capacidade de, além de visualizar os pratos já cadastrados, criar novos e editá-los. Caso o usuário autenticado seja um ***customer***, ele terá a capacidade de, apenas, visualizar os pratos já cadastrados pelo ***admin*** da aplicação. Há, na aplicação, um menu lateral interativo ao lado esquerdo da página que possui uma barra de pesquisa, em que é possível filtrar os pratos cadastrados por nome e pelos seus ingredientes, e um botão (visível apenas ao usuário ***admin***), que o redireciona à página em que é possível criar os pratos novos para a aplicação. Além disso, todos os usuários podem alterar suas informações de perfil (avatar, nome, e-mail e senha) ao clicar no ícone de perfil no canto superior direito da tela. Por fim, a aplicação em questão foi construída com telas responsivas a diversos aparelhos (mobile e desktop) para melhorar a experiência do usuário.


## Como utilizar o projeto

### Link do deploy da aplicação

https://sitefoodexplorer.netlify.app/

Obs.: como a API está sendo hospedada em um provedor gratuito, após um período de inatividade ela é desligada, o que pode gerar um certo delay nas requisições. Diante disso, basta aguardar o reinício da mesma e utilizar a aplicação normalmente.

### Versão admin da aplicação

```bash

  # E-mail: felipe@admin.com
  # senha: 123

```

### Versão customer (usuário comum) da aplicação

```bash

  # E-mail: joao@email.com
  # senha: 123456

```
 
### Executando o Backend do projeto

```bash

  # Baixe o projeto do GitHub

  # Vá até o diretório do projeto
  $ cd API-Backend-FoodExplorer

  # Crie um arquivo .env e insira os valores desejados para:
    AUTH_SECRET = /*Ex.: default*/
    PORT = /*Ex.: 3333*/

  # Instale a dependência node_modules
  $ npm install

  # Inicie o servidor 
  $ npm run dev

  # Agora, com o frontend também aberto, basta utlizar a aplicação normalmente 

```

## Tecnologias utilizadas 

- [NodeJS](https://nodejs.org/en)
- [Javascript]()
- [Nodemon](https://nodemon.io/)
- [Express](https://expressjs.com/pt-br/)
- [Express Async Errors](https://www.npmjs.com/package/express-async-errors)
- [Insomnia](https://insomnia.rest/download)
- [SQLite](https://www.sqlite.org/)
- [Beekeeper Studio](https://www.beekeeperstudio.io/)
- [KnexJS](https://knexjs.org/)
- [BcryptJS](https://www.npmjs.com/package/bcryptjs)
- [JSON Web Token (JWT)](https://www.npmjs.com/package/jsonwebtoken)
- [Multer](https://www.npmjs.com/package/multer)
- [Cors](https://www.npmjs.com/package/cors)
- [Dotenv (.env)](https://www.npmjs.com/package/dotenv)
- [PM2](https://pm2.keymetrics.io/)
- [Cookie Parser](https://www.npmjs.com/package/cookie-parser)

### - NodeJS

É um ambiente de execução (ou Framework) JavaScript voltado ao lado do servidor (backend). 

### - Javascript

Linguagem de programação de tipagem fraca (não exige que o tipo de uma variável ou função seja declarado quando ela é criada) amplamente utilizada para a criação de páginas Web. Pode ser utilizada tanto no frontend (ex.: ReactJS) quanto no backend (ex.: NodeJS).

### - Nodemon

Ferramenta de linha de comando utilizada para o desenvolvimento de aplicações NodeJS. Sua função é monitorar a aplicação e reiniciá-la quando forem detectadas alterações.

### - Express

Framework NodeJS criado para otimizar a criação de aplicativos e APIs Web.

### - Express Async Errors

Pacote responsável pelo tratamento de erros em aplicações Web.

### - Insomnia

Aplicativo Web que permite o envio de solicitações HTTP a APIs Web para a otimização de sua testagem.

### - SQLite

É um banco de dados relacional de código aberto capaz de funcionar em aplicações Web e Mobile.

### - Beekeeper Studio

Ferramenta de gerenciamento de bancos de dados que permite a criação e a realização de consultas, gerenciar conexões e visualizar dados.

### - KnexJS

É um Query Builder SQL para JavaScript que permite acessar e executar ações em bancos de dados.

### - BcryptJS

É uma biblioteca voltada à criação de hashes seguros para a proteção de senhas, principalmente.

### - JSON Web Token (JWT)

É um padrão de autenticação que permite a transmissão de informações de forma segura entre duas partes em uma aplicação Web. 

### - Multer

Biblioteca NodeJS voltada à realização do upload de arquivos.  

### - Dotenv (.env)

Arquivo oculto que contém variáveis de ambiente de uma aplicação Web. É usado para definir configurações que variam de acordo com o local em que a aplicação está sendo executada.

### - PM2

Gerenciador de processos de código aberto que permite controlar aplicações NodeJS.

### - Cookie Parser

Analisador de cookies em solicitações HTTP. Utilizado, principalmente, para facilitar e melhorar a segurança do processo de autenticação do usuário.