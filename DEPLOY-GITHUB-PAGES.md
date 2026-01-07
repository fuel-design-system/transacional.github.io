# Deploy no GitHub Pages

## ✅ Configuração Atual

O projeto está configurado para:
```
https://fuel-design-system.github.io/transacional.github.io/
```

## 🚀 Como Fazer Deploy

### 1. Build do Projeto

```bash
npm run build
```

Isso vai gerar a pasta `dist/` com os arquivos prontos para produção.

### 2. Deploy para GitHub Pages

Você tem duas opções:

#### Opção A: Deploy Manual

1. Acesse as Settings do repositório
2. Vá em **Pages**
3. Em **Source**, selecione a branch onde estão os arquivos built (geralmente `gh-pages` ou `main`)
4. Em **Folder**, selecione `/dist` ou `/root` dependendo de onde você colocou os arquivos
5. Clique em **Save**

#### Opção B: Deploy Automatizado com GitHub Actions

Crie o arquivo `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    permissions:
      contents: write
      
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build
        run: npm run build
        
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

Após criar este arquivo:
1. Faça commit e push
2. O GitHub Actions vai automaticamente fazer build e deploy
3. Acesse as Settings > Pages e configure a branch `gh-pages` como source

### 3. Verificar Deploy

Acesse: `https://fuel-design-system.github.io/transacional.github.io/`

✅ Deve carregar a página inicial  
✅ Navegação entre rotas deve funcionar  
✅ Hard refresh em qualquer rota deve manter a página  
✅ Sem erros no console  

### 4. Limpar Cache (Se necessário)

Se a tela ficar em branco após o deploy, acesse:

```
https://fuel-design-system.github.io/transacional.github.io/force-reload.html
```

Esta página vai:
1. ✅ Remover todos os Service Workers antigos
2. ✅ Limpar todo o cache do navegador
3. ✅ Redirecionar automaticamente para a home

## 🔧 Configurações Importantes

### vite.config.ts

O `base` DEVE estar configurado corretamente:

```typescript
export default defineConfig({
  base: '/transacional.github.io/',  // ⚠️ IMPORTANTE!
  // ... resto da config
});
```

**NUNCA use `base: '/'`** para GitHub Pages com subdiretório!

### Estrutura de URLs

Com `base: '/transacional.github.io/'`, os arquivos são carregados de:

- HTML: `https://fuel-design-system.github.io/transacional.github.io/`
- JS: `https://fuel-design-system.github.io/transacional.github.io/assets/index-ABC.js`
- CSS: `https://fuel-design-system.github.io/transacional.github.io/assets/index-XYZ.css`
- Images: `https://fuel-design-system.github.io/transacional.github.io/assets/image.png`

## 🐛 Troubleshooting

### Tela em branco após deploy?

**Causa:** Service Worker com cache antigo ou `base` incorreto no `vite.config.ts`

**Solução:**
1. Acesse `/force-reload.html` no seu domínio
2. Ou limpe o cache manualmente (F12 > Application > Clear storage)

### Erros 404 nos arquivos JS/CSS?

**Causa:** `base` configurado incorretamente no `vite.config.ts`

**Solução:**
1. Verifique se o `base` está como `'/transacional.github.io/'`
2. Faça rebuild: `npm run build`
3. Faça redeploy

### Rotas não funcionam (404 ao dar refresh)?

**Causa:** GitHub Pages não está configurado corretamente para SPA

**Solução:**
- O arquivo `public/404.html` já está configurado para redirecionar
- Certifique-se que ele foi copiado para a pasta `dist/` no build

### Como testar localmente o build de produção?

```bash
npm run build
npm run preview
```

Isso vai servir a pasta `dist/` localmente em `http://localhost:4173/transacional.github.io/`

## 📝 Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] `vite.config.ts` tem `base: '/transacional.github.io/'`
- [ ] Build local funciona: `npm run preview`
- [ ] Sem erros no console
- [ ] Todas as rotas funcionam localmente
- [ ] Service Worker está atualizado (versão v21)
- [ ] Arquivo `public/404.html` existe
- [ ] Arquivo `public/force-reload.html` existe

Após o deploy:

- [ ] Página inicial carrega
- [ ] Navegação funciona
- [ ] Hard refresh funciona
- [ ] `/force-reload.html` está acessível

## 🎯 URL Final

**Produção:**
```
https://fuel-design-system.github.io/transacional.github.io/
```

**Limpar Cache:**
```
https://fuel-design-system.github.io/transacional.github.io/force-reload.html
```

## 📚 Mais Informações

- [Vite - Base Public Path](https://vitejs.dev/config/shared-options.html#base)
- [GitHub Pages - Configuring a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Guia geral de deployment
