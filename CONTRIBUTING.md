# Contribuindo para px-voo

É recomendado ler o [Developer Guide - px-project](https://github.com/wesleifreitas/px-project/tree/master/docs/guide-pt-BR) antes de prosseguir. 
**Atenção**: após ler os tópicos do *Developer Guide - px-project*, volte para esta documentação.


 - [Requisitos](#requirements)
 - [Fork px-voo](#fork)
 - [Clonar px-voo](#clone)
 - [Upstream](#upstream)
 - [Pull Request](#pullrequest)
 - [Pull Request aceito](#merged)
 - [Commit Message (Formato)](#commit)
 - [Building px-voo](#build)

## <a name="requirements"></a> Requisitos

* Adobe ColdFusion: [Instruções de instalação](https://github.com/wesleifreitas/px-project/blob/master/docs/guide-pt-BR/2.2-cf-install.md)
* Bower: Para instalar o Bower(Gerenciador de pacotes) abra o prompt de comando ou Git Bash e execute:

```shell
npm install -g bower
```
Mais detalhes em [http://bower.io/](http://bower.io/)

## <a name="fork"></a> Fork px-voo

Faça um fork (clicando no botão **Fork**) do repositório oficial [px-voo](https://github.com/wesleifreitas/px-voo)

## <a name="clone"></a> Clonar px-voo

* Execute o Git Bash (Caso não possua acesse e leia os itens do Developer Guide)
 - [Developer Guide pt-BR](https://github.com/wesleifreitas/px-project/blob/master/docs/guide-pt-BR)
* Navegue até a pasta ColdFusion11/cfusion/wwwroot (Caso não possua o ColdFusion acesse as [Instruções de instalação](docs/guide-pt-BR/2.2-cf-install.md))

![git_cd_wwwroot](https://github.com/wesleifreitas/px-project/blob/master/docs/guide-pt-BR/images/git_cd_wwwroot.png)

* Execute o comando git clone para clonar px-voo do seu respositório

```shell
git clone git@github.com:YOUR-GITHUB-USERNAME/px-voo.git
```

## <a name="upstream"></a> Upstream

* Acesse a pasta do projeto px-voo clonado:

```shell
cd px-voo
```

* Crie um git remote chamdo **upstream** do repositório oficial:

```shell
git remote add upstream git@github.com:wesleifreitas/px-voo.git
```

## <a name="pullrequest"></a> Pull Request

* Faça suas alterações em um novo git branch:

```shell
git checkout -b my-fix-branch master
```

* Após desenvolver e testar suas alterações faça o commit:

```shell
git commit -a
```
* Envie seu branch para o GitHub

```shell
git push origin my-fix-branch
```
* Acesse seu respositório no site GitHub e envie um Pull Request para o projeto oficial

## <a name="merged"></a> Pull Request aceito

Depois que seu Pull Request for aceito (merged), o branch pode ser removido com segurança e suas alterações devem ser atualizadas do repositório oficial (upstream):


* Remover branch remote:

```shell
git push origin --delete my-fix-branch
```

* Checkout no branch master:

```shell
git checkout master -f
```

* Remover o branch local:

```shell
git branch -D my-fix-branch
```

* Atualizar seu branch master com a última versão (upstream)

```shell
git pull --ff upstream master
```

## <a name="commit"></a> Git Commit

Regras para o commit.

### <a name="commit"></a>Commit Message (Formato)
Cada mensagem de commit deve possuir um **header**(obrigatório), e pode conter um **body** e um **footer**.  O header inclui um **type**(obrigatório), um **scope**(obrigatório) e um **subject**(obrigatório):

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### Type
Deve ser um destes:

* **feat**: Um novo recurso
* **fix**: Uma correção de bug
* **docs**: Mudanças referentes a documentação
* **style**: Alterações que não afetam o código (espaço em branco, formatação, falta de ponto e vírgula, etc)
* **refactor**: Melhoria de código que não corrige um bug e nem adiciona um novo recurso
* **perf**: Alteração no código que melhora o desempenho
* **chore**: Processo de construção (build) ou ferramentas auxiliares e bibliotecas, tais como geração de documentação.

### Scope
O escopo pode ser qualquer coisa especificando o que o commit está alterando. Por exemplo `login`,
`px-grid`, `px-form`, etc...

### Subject
Descrição objetiva da mudança:

* use frases no presente e modo imperativo: "alterar" e não "alterado" nem "alterações", por exemplo: `alterar o formulário de login`
* não utilize letra maiúscula na primeira letra
* não inclua o ponto no final no título

###Body
Assim como o **subject**, utilize frases no presente e modo imperativo.
O body pode descrever a motivação da alteração e comparar seu comportamento atual com a anterior.

###Footer
Considerações finais.

## <a name="build"></a> Building px-voo

###Bower

Se não possui o Bower (Gerenciador de pacotes) instalado execute o seguinte comando no Git Bash

```shell
npm install -g bower
```
Mais detalhes em [http://bower.io/](http://bower.io/)

Com o Bower devidamente instalado instale as dependências do projeto:

```shell
bower install
```

Após conclusão do building verifique se o sistema está rodando em [http://localhost:8500/px-voo](http://localhost:8500/px-voo)
