# Fretebras

Aplicativo para gestão de fretes.

## 🌐 URL de Produção

```
https://fuel-design-system.github.io/transacional.github.io/
```

## 🚨 Tela em Branco Após Deploy?

Se a tela ficar em branco após fazer deploy, acesse:

```
https://fuel-design-system.github.io/transacional.github.io/force-reload.html
```

Esta página vai limpar automaticamente todo o cache antigo e recarregar a aplicação.

## 🚀 Desenvolvimento

```bash
npm install
npm run dev
```

## 📦 Build e Preview Local

```bash
npm run build
npm run preview
```

O preview local estará disponível em:
```
http://localhost:4173/transacional.github.io/
```

## 🚢 Deploy para GitHub Pages

Veja o guia completo em [DEPLOY-GITHUB-PAGES.md](./DEPLOY-GITHUB-PAGES.md)

**Resumo:**
1. Execute `npm run build`
2. Faça commit dos arquivos em `dist/`
3. Configure GitHub Pages para usar a branch/pasta correta
4. Acesse `https://fuel-design-system.github.io/transacional.github.io/`

## 📖 Documentação

- [DEPLOY-GITHUB-PAGES.md](./DEPLOY-GITHUB-PAGES.md) - Deploy específico para GitHub Pages
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guia geral de deployment (Netlify, Vercel, etc)

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
├── pages/                  # Páginas da aplicação
│   ├── Home.tsx           # Página inicial (lista de fretes)
│   └── FreightDetail.tsx  # Página de detalhes do frete
├── styles/                 # Estilos SCSS
├── data/                   # Dados mockados (JSON)
└── App.tsx                 # Configuração de rotas

public/
├── force-reload.html       # Página de limpeza de cache
├── 404.html               # Página de erro para SPA routing
└── sw.js                  # Service Worker (PWA)
```

## 🐛 Problemas Conhecidos e Soluções

### 🔴 Tela em branco após deploy

**Causa:** Service Worker com cache antigo tentando carregar arquivos JS/CSS que não existem mais.

**Solução Rápida:** 
```
https://fuel-design-system.github.io/transacional.github.io/force-reload.html
```

**Solução Manual:**
1. Abra DevTools (F12)
2. Vá em Application > Service Workers
3. Clique em "Unregister" em todos
4. Vá em Application > Storage > Clear site data
5. Faça Hard Refresh (Ctrl+Shift+R)

### 🔴 Erros 404 nos arquivos JS/CSS

**Causa:** `base` incorreto no `vite.config.ts`

**Solução:**
Verifique se `vite.config.ts` tem:
```typescript
base: '/transacional.github.io/',  // ✅ Correto
// base: '/',  ❌ Errado para GitHub Pages
```

### 🔴 Rotas não funcionam ao dar refresh

**Causa:** Servidor não configurado para SPA routing.

**Solução:** 
O arquivo `public/404.html` já está configurado. Certifique-se que foi copiado no build.

### 🔴 Service Worker causando problemas

**Solução:**
Acesse `/force-reload.html` para remover automaticamente.

## ⚙️ Configuração Importante

### vite.config.ts

```typescript
export default defineConfig({
  base: '/transacional.github.io/',  // ⚠️ OBRIGATÓRIO para GitHub Pages!
  // ...
});
```

**Nunca use `base: '/'`** quando estiver deployando no GitHub Pages com subdiretório!

## 🧪 Testando Antes do Deploy

1. **Build local:**
   ```bash
   npm run build
   ```

2. **Preview local:**
   ```bash
   npm run preview
   ```

3. **Acesse:**
   ```
   http://localhost:4173/transacional.github.io/
   ```

4. **Verifique:**
   - ✅ Página inicial carrega
   - ✅ Navegação entre rotas funciona
   - ✅ Hard refresh mantém a página
   - ✅ Sem erros no console

## 📋 Checklist de Deploy

Antes de fazer deploy:

- [ ] `vite.config.ts` tem `base: '/transacional.github.io/'`
- [ ] Build local funciona sem erros
- [ ] Preview local funciona corretamente
- [ ] Todas as rotas funcionam no preview

Após o deploy:

- [ ] Site carrega em produção
- [ ] Todas as rotas funcionam
- [ ] Hard refresh funciona
- [ ] Sem erros 404 nos assets

Se algo der errado:

- [ ] Acesse `/force-reload.html` para limpar cache

## 🔗 Links Úteis

- **Produção:** https://fuel-design-system.github.io/transacional.github.io/
- **Limpar Cache:** https://fuel-design-system.github.io/transacional.github.io/force-reload.html
- **Repositório:** (adicione o link do GitHub aqui)

## 📝 Licença

Propriedade da Fretebras.
