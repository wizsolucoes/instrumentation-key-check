# Wiz Instrumentation Key Check

Adicione verificação do fornecimento da chave de instrumentação do Application
Insights ao pipeline de aplicações.

## Sobre

Esta biblioteca irá executar o pacote `@wizsolucoes/instrumentation-key-check`
no pipeline de build das nossas aplicações.

## Uso

Para utilizar, basta executar o comando:

> npx @wizsolucoes/instrumentation-key-check --shared-key=\<SHARED_KEY_DO_APP_INSIGHTS\> --storage-name=\<STORAGE_NAME\> --instrumentation-key=\<INSTRUMENTATION_KEY_DO_APP\>

Caso a `--shared-key`, `--storage-name` e `--instrumentation-key` sejam válidos,
o programa irá retornar uma mensagem informando que a aplicação que a chave é
válida para uma dada aplicação.

Caso algum dos dados esteja incorreto, ocorra um erro de acesso ao serviço ou a
chave de instrumentação não exista, o programa irá retornar uma mensagem de
erro.

## Desenvolvimento, por onde começar

 ```bash
 # Instalar dependências
 npm install

 # Build lib
 npm run build
 ```

Recomenda-se a instalação do ESLint, Prettier e EditorConfig para que todo
código siga o mesmo padrão.

## Testando Lib localmente

1. Gere um distribuível da lib

```bash
# Instalar dependências
npm install

# Build lib
npm run build

# Gerar tarball e.g. wizsolucoes-instrumentation-key-check-1.x.y.tgz
npm pack
```

 2. Instale e execute a lib em qualquer lugar

```bash
# Executar a Lib
npx @wizsolucoes/instrumentation-key-check --storage-name=<STORAGE_NAME> --shared-key=<SHARED_KEY> --instrumentation-key=<CHAVE_DE_INSTRUMENTAÇÃO>
```
