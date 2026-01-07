# Guia de Deploy - Fretebras

## Problemas Corrigidos

✅ Tela em branco após deploy  
✅ Rotas quebradas em produção  
✅ Service Worker com cache antigo  
✅ Configuração para múltiplos hosting providers  
✅ Arquivos JS/CSS com hash não sendo carregados após deploy

## ⚠️ TELA EM BRANCO APÓS DEPLOY?

Se a tela ficar em branco após um deploy, acesse:

**`https://seu-dominio.com/force-reload.html`**

Esta página vai:
1. ✅ Remover todos os Service Workers antigos
2. ✅ Limpar todo o cache do navegador  
3. ✅ Redirecionar automaticamente para a home

**Exemplo**: Se seu site está em `https://fretebras.netlify.app`, acesse:
```
https://fretebras.netlify.app/force-reload.html
```

**Por que isso acontece?**
- O Service Worker cacheia arquivos JS/CSS antigos
- Quando você faz deploy, os arquivos têm novos hashes (ex: `index-ABC123.js` → `index-XYZ789.js`)
- O Service Worker tenta carregar os arquivos antigos que não existem mais (erro 404)
- A página `/force-reload.html` limpa tudo e força o navegador a baixar os arquivos novos

## Configurações Adicionadas

1. **`public/_redirects`** - Para Netlify e serviços similares
2. **`netlify.toml`** - Configuração específica do Netlify
3. **`public/404.html`** - Atualizado para funcionar em qualquer domínio
4. **`public/force-reload.html`** - ⭐ **NOVO!** Página para limpar cache e service worker
5. **Service Worker** - Atualizado para v21, não cacheia mais arquivos JS/CSS com hash

## Como Fazer Deploy

### Netlify (Recomendado)

1. Faça build do projeto:
   ```bash
   npm run build
   ```

2. No Netlify:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - O arquivo `netlify.toml` já está configurado!

3. **Após o deploy**, se a tela ficar em branco:
   - Acesse `https://seu-site.netlify.app/force-reload.html`
   - Aguarde a limpeza automática do cache
   - Você será redirecionado para a home

### GitHub Pages

1. **IMPORTANTE**: Se estiver usando GitHub Pages com subdiretório (ex: `username.github.io/repo-name`):
   
   Atualize o `vite.config.ts`:
   ```typescript
   base: '/nome-do-repositorio/',
   ```

2. Faça build e deploy normalmente

3. **Após o deploy**, se a tela ficar em branco:
   - Acesse `https://username.github.io/repo-name/force-reload.html`

### Outros Hosting Providers

Para Vercel, Cloudflare Pages, etc.:
- Certifique-se que o arquivo `public/_redirects` está sendo copiado para o build
- Build command: `npm run build`
- Output directory: `dist`
- URL de limpeza de cache: `https://seu-dominio.com/force-reload.html`

## Limpando Cache Manualmente (Alternativa)

Se você não conseguir acessar `/force-reload.html`, limpe manualmente:

### Opção 1: DevTools (Recomendado)

1. Abra DevTools (F12 ou Cmd+Option+I)
2. Vá em **Application** > **Service Workers**
3. Clique em **"Unregister"** em todos os service workers
4. Vá em **Application** > **Storage**
5. Clique em **"Clear site data"**
6. Faça Hard Refresh: **Ctrl+Shift+R** (ou **Cmd+Shift+R** no Mac)

### Opção 2: Limpar Cache do Navegador

**Chrome/Edge:**
- Pressione `Ctrl+Shift+Delete` (ou `Cmd+Shift+Delete` no Mac)
- Selecione "Cached images and files"
- Clique em "Clear data"
- Recarregue a página

**Firefox:**
- Pressione `Ctrl+Shift+Delete`
- Selecione "Cache"
- Clique em "Clear Now"
- Recarregue a página

**Safari:**
- Menu Safari > Clear History
- Selecione "all history"
- Clique em "Clear History"
- Recarregue a página

## Verificando o Deploy

Após fazer deploy (e limpar o cache se necessário), verifique:

1. ✅ Página inicial carrega
2. ✅ Navegação entre rotas funciona
3. ✅ Hard refresh em qualquer rota mantém a página
4. ✅ Sem erros no console
5. ✅ Página de detalhes do frete funciona

## Troubleshooting

### Tela em branco após deploy?

**Solução Rápida:** Acesse `/force-reload.html` no seu domínio

**Exemplo:**
```
https://fretebras.netlify.app/force-reload.html
```

### Ainda aparece tela em branco?

1. Verifique se o build foi feito corretamente:
   ```bash
   npm run build
   npm run preview
   ```

2. Verifique se há erros no console do navegador (F12)

3. Verifique se os arquivos estão sendo servidos corretamente:
   - Abra DevTools > Network
   - Recarregue a página
   - Veja se `index.html`, JS e CSS estão carregando com status 200 (não 404)

4. Limpe TODOS os caches manualmente (veja instruções acima)

### Erros 404 em arquivos JS/CSS?

Isso acontece quando o Service Worker está tentando carregar arquivos antigos.

**Solução:**
1. Acesse `/force-reload.html`
2. Ou limpe o Service Worker manualmente (DevTools > Application > Service Workers > Unregister)

### Base Path Incorreto (GitHub Pages)

Se estiver usando GitHub Pages com repositório (não `username.github.io`):

1. Atualize `vite.config.ts`:
   ```typescript
   base: '/nome-do-seu-repo/',
   ```

2. Rebuild e redeploy

## Desenvolvimento

Service Worker só é registrado em produção (`import.meta.env.PROD`), então não afeta desenvolvimento local.

```bash
npm run dev
```

## Prevenindo Problemas Futuros

1. **Sempre que fizer deploy**, lembre-se que usuários com cache antigo podem ver tela em branco
2. **Compartilhe o link `/force-reload.html`** com usuários que reportarem problemas
3. **Considere adicionar um banner** no site informando sobre a página de limpeza de cache
4. **O Service Worker agora NÃO cacheia** arquivos JS/CSS com hash, reduzindo problemas futuros

## Notas Técnicas

- Service Worker versão: **v21**
- O Service Worker agora detecta e **NÃO cacheia** arquivos com hash (ex: `index-ABC123.js`)
- Apenas arquivos estáticos sem hash são cacheados (index.html, manifest.json, icons)
- Service Worker só roda em produção para evitar problemas no desenvolvimento
- Suporte a SPA routing em todos os principais hosting providers
