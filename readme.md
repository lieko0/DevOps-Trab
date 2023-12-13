# Trabalho Final de DevOps (GCC270 2023/2)
- Nome: Marco Magalhães
## Passo 1: Desenvolvimento de uma Aplicação TODO List

A aplicação foi desenvolvida utilizando Node.js e Express. Trata-se de uma aplicação bem simples de lista de tarefa sem o uso de banco de dados.  

---
#### Rotas da Aplicação TODO List

##### 1. Rota Hello World (teste)
- **Descrição**: Retorna informações sensíveis genéricas para testar se as variáveis de ambiente estão chegando corretamente.
- **Método HTTP**: GET
- **URL**: `/`
- **Resposta de Exemplo**:
  ```plaintext
  Username: [Username definido ou 'Username não definido']
  Password: [Senha definida ou 'Senha não definida']
  Database URL: [URL do banco de dados definida ou 'URL do banco de dados não definida']
  API Key: [Chave de API definida ou 'Chave de API não definida']
  ```
##### 2. Obter Todas as Tarefas
- **Descrição**: Retorna todas as tarefas cadastradas.
- **Método HTTP**: GET
- **URL**: `/tasks`
- **Resposta de Exemplo**:
  ```json
  [
    {
      "id": "0",
      "description": "Task Zero",
      "isCompleted": false
    }
    // Outras tarefas...
  ]
  ```
##### 3. Adicionar Nova Tarefa
- **Descrição**: Adiciona uma nova tarefa à lista.
- **Método HTTP**: POST
- **URL**: `/tasks`
- **Corpo da Requisição** (JSON):
  ```json
  {
    "description": "Descrição da nova tarefa"
  }
  ```
- **Resposta de Exemplo**:
  ```json
  {
    "id": "1",
    "description": "Descrição da nova tarefa",
    "isCompleted": false
  }
  ```
##### 4. Atualizar Status de uma Tarefa
- **Descrição**: Atualiza o status de uma tarefa existente.
- **Método HTTP**: PATCH
- **URL**: `/tasks/:id`
- **Parâmetros da URL**: `id` (ID da tarefa a ser atualizada)
- **Resposta de Exemplo**:
  ```json
  {
    "id": "1",
    "description": "Descrição da tarefa atualizada",
    "isCompleted": true
  }
  ```
##### 5. Deletar uma Tarefa
- **Descrição**: Deleta uma tarefa existente.
- **Método HTTP**: DELETE
- **URL**: `/tasks/:id`
- **Parâmetros da URL**: `id` (ID da tarefa a ser deletada)
- **Resposta de Sucesso**: Código de status 204 (No Content)
---
#### Comandos de como rodar a aplicação:

1. **Instale as dependências:**
``` bash
npm install
```
2. **Inicie a aplicação:**
``` bash
node app.js
```
Isso iniciará o servidor localmente. Acesse `http://localhost:3000` para ver a aplicação em funcionamento.

---
---
## Passo 2: Criação do Dockerfile

#### Comandos e explicação de como rodar o Docker:

1. **Construa a imagem Docker:**

``` bash
docker build -t nome-da-imagem .
```
Certifique-se de estar no diretório onde se encontra o Dockerfile.

Exemplo:
``` bash
docker build -t lieko0/devops-trab:v1 .
```

2. **Execute o contêiner Docker:**
``` bash
docker run -p 3000:3000 nome-da-imagem
```
Isso mapeia a porta 3000 do contêiner para a porta 3000 do seu sistema local.
Se tudo estiver configurado corretamente, será possível testar a aplicação acessando `http://localhost:3000`.

Exemplo:
``` bash
docker run -p 3000:3000 lieko0/devops-trab:v1
```
---
---
## Passo 3: Publicação no Docker Hub

Aqui, você publicará a imagem Docker criada no passo anterior no Docker Hub.

#### Comandos de como publicar no Docker Hub:

1. **Faça login no Docker Hub:**
``` bash
docker login
```      
Insira suas credenciais do Docker Hub quando solicitado.

2. **Faça o push da imagem para o Docker Hub:**

``` bash
docker push usuario/nome-da-imagem:tag
```
Isso enviará a imagem para o seu repositório no Docker Hub.

Exemplo:
``` bash
docker push lieko0/devops-trab:v1
```

---
---
## Passo 4: Criação de Artefatos no Kubernetes com Helm

Nesta etapa, você usará o Helm para gerenciar seus artefatos no Kubernetes.

#### Comandos e explicação de como criar artefatos com Helm:

1. **Preparação do ambiente**
Inicie um cluster utilizando o kind:
``` shell
kind create cluster
```
Instale o Helm seguindo a documentação oficial.

2. **Crie um Chart Helm para sua aplicação:**
``` bash
helm create nome-do-chart
```
Isso criará uma estrutura de diretório para seu chart Helm.

3. **Personalize o Chart com os recursos necessários (Deployment, Service, etc.):** Edite os arquivos `values.yaml`, `deployment.yaml`, e outros conforme necessário para sua aplicação.
- O `helm` por default cria vários arquivos de template, mas alguns deles forma modificados e outros criados.
- Para a aplicação em questão, foram **criados** o template de `secret.yaml` e `config.yaml`.
- O tamplate de `deployment.yaml` foi **modificado** para incluir as variáveis de ambiente advindas do Secret e do ConfigMap.
- As modificações principais na `values.yaml` foram as informações da imagem do deployment e as informações do Secret e ConfigMap.

4. **Instale o Chart no Kubernetes:**
``` bash
helm install nome-da-liberacao ./nome-do-chart
```
Isso instalará sua aplicação no cluster Kubernetes usando o Helm.

5. **Verifique se a aplicação está funcionando corretamente:**
``` bash
kubectl get pods
```
Isso deve retornar uma lista com os pods em execução no cluster. Se tudo estiver funcionando corretamente, você verá um pod com o nome da liberação que você criou no passo anterior.

6. **Teste a aplicação:**
``` bash
kubectl --namespace default port-forward $POD_NAME 3000:$CONTAINER_PORT
```