# 🏢 CondoServ - API Back-end

Repositório da API REST do **CondoServ**, desenvolvida como parte do Projeto Interdisciplinar do curso Superior de Tecnologia em Desenvolvimento de Software Multiplataforma da **Fatec Atibaia**.

## 👥 Equipe
O projeto é desenvolvido de forma colaborativa e multidisciplinar pela seguinte equipe:

- **Ana Carolina Silva de Paula** 
- **Felipe dos Santos Antonio** 
- **Guilherme Nunes de Oliveira**
- **Nicolly Livino Bueno** 
- **Regiane Gonçalves Mendes** 

## 📖 Sobre o Projeto
O **CondoServ** é uma aplicação voltada para condomínios residenciais fechados (como o Ecoville Residence Atibaia), projetada para centralizar e organizar indicações de prestadores de serviços previamente aprovados pela administração. 

Este repositório contém o **Back-end** da aplicação, responsável por gerenciar as regras de negócio, rotas da API, validações e a persistência de dados.

## 🛠️ Tecnologias Utilizadas
- **Ambiente de Execução:** Node.js
- **Linguagem:** TypeScript
- **Framework:** Express.js
- **Banco de Dados:** MongoDB (Cluster em nuvem hospedado no MongoDB Atlas)
- **Ferramentas:** Git e GitHub

## 📋 Principais Endpoints da API
A API disponibiliza rotas estruturadas para o gerenciamento completo do sistema:
- `/api/condominios` - Gestão de condomínios
- `/api/moradores` - Gestão e cadastro de moradores
- `/api/prestadores` - Cadastro e consulta de prestadores de serviços
- `/api/categorias` / `/api/categorias-sugeridas` - Gestão de categorias de serviços
- `/api/avaliacoes` - Registro e moderação de avaliações
- `/api/denuncias` - Canal de denúncias e segurança
