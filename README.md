# Imobiliária Amir

Um site para a imobiliária Amir em São Paulo, desenvolvido com Next.js.

## Funcionalidades

- Página inicial com apresentação da imobiliária
- Catálogo de imóveis
- Página de contato
- Painel admin para adicionar imóveis

## Como executar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Estrutura do Projeto

- `app/` - Páginas e componentes
- `public/` - Arquivos estáticos, incluindo `properties.json` para os imóveis
- `app/api/properties/` - API para gerenciar imóveis

## Adicionando Imóveis

Acesse `/admin` para adicionar novos imóveis via formulário.