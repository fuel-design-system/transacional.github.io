# Guia de Deploy - Fretebras

## Problemas Corrigidos

✅ Tela em branco após deploy  
✅ Rotas quebradas em produção  
✅ Service Worker com cache antigo  
✅ Configuração para múltiplos hosting providers  

## Configurações Adicionadas

1. **`public/_redirects`** - Para Netlify e serviços similares
2. **`netlify.toml`** - Configuração específica do Netlify
3. **`public/404.html`** - Atualizado para funcionar em qualquer domínio
4. **Service Worker** - Cache atualizado para v20 e melhor detecção de base path

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

### GitHub Pages

1. **IMPORTANTE**: Se estiver usando GitHub Pages com subdiretório (ex: `username.github.io/repo-name`):
   
   Atualize o `vite.config.ts`:
   ```typescript
   base: '/nome-do-repositorio/',
   ```

2. Faça build e deploy normalmente

### Outros Hosting Providers

Para Vercel, Cloudflare Pages, etc.:
- Certifique-se que o arquivo `public/_redirects` está sendo copiado para o build
- Build command: `npm run build`
- Output directory: `dist`

## Limpando Cache em Produção

Se após o deploy ainda aparecer tela em branco:

1. **Limpe o Service Worker**:
   - Abra DevTools (F12)
   - Vá em Application > Service Workers
   - Clique em "Unregister" em todos os service workers
   - Faça Hard Refresh (Ctrl+Shift+R ou Cmd+Shift+R)

2. **Limpe o Cache do Navegador**:
   - Abra DevTools (F12)
   - Vá em Application > Storage
   - Clique em "Clear site data"
   - Recarregue a página

3. **Console de Erros**:
   - Abra DevTools (F12)
   - Verifique o Console para erros
   - Verifique Network para ver se os arquivos estão sendo carregados corretamente

## Verificando o Deploy

Após fazer deploy, verifique:

1. ✅ Página inicial carrega
2. ✅ Navegação entre rotas funciona
3. ✅ Hard refresh em qualquer rota mantém a página
4. ✅ Sem erros no console

## Troubleshooting

### Ainda aparece tela em branco?

1. Verifique se o build foi feito corretamente:
   ```bash
   npm run build
   npm run preview
   ```

2. Verifique se há erros no console do navegador

3. Verifique se os arquivos estão sendo servidos corretamente:
   - Abra DevTools > Network
   - Recarregue a página
   - Veja se `index.html`, JS e CSS estão carregando com status 200

4. Limpe TODOS os caches (browser + service worker)

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

## Notas

- O Service Worker agora detecta automaticamente o base path
- Cache version foi atualizado para v20
- Service Worker só roda em produção para evitar problemas no desenvolvimento
- Suporte a SPA routing em todos os principais hosting providers
