# Desafio Rocketseat - Meetup
Projeto realisado utilizando: ReactJS, React-Native and NodeJS


Além do github, utilizei também o Azure DevOps para gerenciar as tarefas. 
https://phmelo.visualstudio.com/Meetup
Nele é possível rastrear cada tarefa originada de histórias ou de bugs encontrados e os commits/pull requests realizados.

<br>

## Passo a passo para configuração do ambiente:
- Pré requisitos: Postgree, MongoDB e Redis instalados
Caso prefira, pode utilizar o docker e instalar os seguintes containers:
docker run --name postgresDB -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres
docker run --name redis -p 6379:6379 -d -t redis:alpine

Crie um cadastro Sentry para controle de log:
https://sentry.io
Crie uma organização, crie um projeto express e Gere uma Client Key DSN que será usada no arquivo .ENV da API.


Crie um cadastro no mailtrap, caso só queira fazer testes:
https://mailtrap.io/

<br>

## Passo a passo de instalação da aplicação:<br>
>  **API**<br>
1 - Clone o repositório para a sua máquina.<br>
2 - Entre na pasta API, digite: yarn ou yarn install<br>
3 - Renomeie o arquivo .env.example para .env<br>
4 - Configure as variáveis de ambiente no arquivo .env**<br>

Exemplo do arquivo .env:<br>
			
	APP_URL=http://localhost:3333
	NODE_ENV=development
	
	#Auth
	APP_SECRET=suasupersenhasecreta
	
	#Database
	DB_HOST=localhost
	DB_USER=postgres
	DB_PASS=postgres
	DB_NAME=meetup
	
	#Redis
	REDIS_HOST=127.0.0.1
	REDIS_PORT=6379
	
	#Mail
	MAIL_HOST=smtp.mailtrap.io
	MAIL_PORT=2525
	MAIL_USER=
	MAIL_PASS=
	
	#Sentry
	SENTRY_DSN=https://exemplo@sentry

> 5 - Carregue as tabelas no banco Postgree usando: <br> 
5.1 - yarn sequelize db:migrate<br>
6 - Depois abra dois novos prompts de comando / terminais e digite:<br>
6.1 - yarn dev (Para iniciar a API)<br>
6.2 - yarn queue (para iniciar o processo de fila que envia email)




> **Website**<br>
1 - Entre na pasta website, digite: yarn ou yarn install<br>
2 - Para executar o projeto, digite: yarn start<br>



> **Mobile**<br>
1 - Entre na pasta mobile, digite: yarn ou yarn install<br>
2 - Para executar o projeto, digite: react-native run-android<br>

<br><br>



### Possíveis Problemas: 
---
**Comando pare resolver problema de acesso no android/gradlew**
> chmod 755 android/gradlew

**Comando para gerar chave RSA faltando**
> keytool -genkey -v -keystore debug.keystore -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000

**Caso não consiga conectar no celular android** <br>
> adb devices<br>
adb reverse tcp:8081 tcp:8081<br>
adb reverse tcp:3333 tcp:3333

<br>




### TODO: 
---
* Fazer testes unitários com Jest na API, Website e Mobile.
* Fazer testes de integração com Jest no Website e Mobile.
* Fazer Documentação usando Storyboards
* Refatorar tratamento de expiração de token
* Fazer Deploy de toda a aplicação.
* Configurar Continuous Integrations no AzureDevOps
* Testar o AppCenter para fazer build no IOS (https://appcenter.ms/apps)









