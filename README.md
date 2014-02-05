# Unisul 50 anos

> Website oficial dos 50 anos da Universidade.

## Instalação

### Pré-requisitos

Você já deve ter instalado no seu computador:

- [NodeJS](http://nodejs.org/)
- [Git](http://git-scm.com/)

### Baixando e instalando o projeto e as dependências

1. Clone o projeto `git clone git@github.com:unisul/50anos.git`
2. Abra a pasta do projeto `cd 50anos`
3. Instale o Grunt de forma global `npm install -g grunt-cli`
4. Instale todas as dependências usando `npm install`

### Desenvolvendo

**Digite no terminal:** `grunt`

A partir deste momento, qualquer alteração no [stylus](http://learnboost.github.io/stylus/) e nos [ejs](http://embeddedjs.com/) já serão assistidas e compiladas automaticamente.

### Build e Deploy

Desenvolveu, mexeu... agora temos que mandar para o servidor.

> Atenção: Para as tarefas de deploy, veja as [configurações do FTP](#configuracoes-do-ftp).

**Para Build:** `grunt build`

**Para Deploy de tudo:** `grunt deploy:all`

**Para Deploy de HTML/CSS/JS:** `grunt deploy`

## Configurações do FTP

Para este projeto estamos usando um plugin para o Grunt chamado [Grunt FTP Upload](https://github.com/websiteflash/grunt-ftp-upload), no qual ele precisa de um arquivo na raiz do projeto chamado `.ftppass` que dentro dele possui dados de login e senha do ftp. Para isso, siga as instruções:

1. Crie um arquivo na raiz do projeto chamado `.ftppass`
2. Dentro dele, coloque os seguintes dados:

```javascript
{
  "key1":{
     "username":"USER",
     "password":"PASS"
    }
}
```

## Créditos
[Diogo Moretti](http://github.com/diogomoretti)