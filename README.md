# Fretebras

Aplicativo para gestão de fretes.

## 🚨 Tela em Branco Após Deploy?

Se a tela ficar em branco após fazer deploy, acesse:

```
https://seu-dominio.com/force-reload.html
```

Esta página vai limpar automaticamente todo o cache antigo e recarregar a aplicação.

**Exemplo:** `https://fretebras.netlify.app/force-reload.html`

## 🚀 Desenvolvimento

```bash
npm install
npm run dev
```

## 📦 Build

```bash
npm run build
npm run preview
```

## 📖 Documentação Completa

Veja o arquivo [DEPLOYMENT.md](./DEPLOYMENT.md) para instruções detalhadas de deploy e troubleshooting.

## 🔧 Tecnologias

- React 18
- TypeScript
- Vite
- React Router
- SCSS
- PWA (Service Worker)

## 📂 Estrutura

```
src/
├── pages/          # Páginas da aplicação
│   ├── Home.tsx           # Página inicial (lista de fretes)
│   └── FreightDetail.tsx  # Página de detalhes do frete
├── styles/         # Estilos SCSS
├── data/           # Dados mockados (JSON)
└── App.tsx         # Configuração de rotas
```

## 🐛 Problemas Conhecidos

### Tela em branco após deploy
**Causa:** Service Worker com cache antigo tentando carregar arquivos JS/CSS que não existem mais.

**Solução:** Acesse `/force-reload.html` no seu domínio ou limpe o cache manualmente (veja DEPLOYMENT.md).

### Rotas não funcionam em produção
**Causa:** Servidor não configurado para SPA routing.

**Solução:** O arquivo `netlify.toml` e `public/_redirects` já estão configurados para Netlify. Para outros servidores, veja DEPLOYMENT.md.

## 📝 Licença

Propriedade da Fretebras.
