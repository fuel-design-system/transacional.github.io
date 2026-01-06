# Configuração do Fuel Design System

Este guia explica como configurar o Fuel Design System no projeto com deploy automático no GitHub Actions.

## 📋 Pré-requisitos

- Token NPM para acessar os pacotes `@frete.com/*`
- Acesso de administrador ao repositório GitHub

---

## 🔑 Passo 1: Adicionar o Token NPM como Secret no GitHub

1. **Acesse o repositório:**
   ```
   https://github.com/fuel-design-system/transacional.github.io
   ```

2. **Navegue até Settings:**
   - Clique na aba **"Settings"** no menu superior do repositório

3. **Adicione o Secret:**
   - No menu lateral esquerdo: **"Secrets and variables"** → **"Actions"**
   - Clique em **"New repository secret"**
   - Preencha:
     - **Name:** `NPM_TOKEN`
     - **Value:** (cole o token NPM completo: `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`)
   - Clique em **"Add secret"**

---

## 📦 Passo 2: Adicionar as Dependências do Fuel DS

Edite o arquivo `package.json` e adicione na seção `dependencies`:

```json
{
  "dependencies": {
    "@frete.com/fuel-fonts": "1.2.1-next.2",
    "@frete.com/fuel-react": "2.0.0-next.22",
    "@frete.com/fuel-tokens": "0.0.0-beta.13",
    "dotenv": "^17.2.1",
    "express": "^5.1.0",
    "zod": "^3.25.76"
  }
}
```

---

## ⚙️ Passo 3: Atualizar o GitHub Actions Workflow

Substitua o conteúdo de `.github/workflows/deploy.yml` pelo conteúdo de `.github/workflows/deploy-with-fuel.yml.example`:

**Ou manualmente, adicione estas linhas antes de "Install dependencies":**

```yaml
# Configurar .npmrc com o token NPM para acessar pacotes privados
- name: Configure NPM for private packages
  run: |
    echo "@frete.com:registry=https://registry.npmjs.org/" > .npmrc
    echo "//registry.npmjs.org/:_authToken=${{ secrets.NPM_TOKEN }}" >> .npmrc
```

---

## 🎨 Passo 4: Importar os Estilos do Fuel DS

No arquivo `client/App.tsx`, adicione os imports:

```tsx
import "./global.css";
import "@frete.com/fuel-tokens/main.css";
import "@frete.com/fuel-react/main.css";
```

---

## 🧩 Passo 5: Usar os Componentes do Fuel DS

Exemplo de uso:

```tsx
import { Search } from "@frete.com/fuel-react/search";
import { Avatar } from "@frete.com/fuel-react/avatar";
import { Card } from "@frete.com/fuel-react/card";
import { Chip } from "@frete.com/fuel-react/chip";
import { Badge } from "@frete.com/fuel-react/badge";

function MyComponent() {
  return (
    <Card padding="md">
      <Search placeholder="Buscar..." aria-label="Buscar" />
      <Avatar initial="A" size="medium" status="online" />
      <Chip label="Filtro" size="small" />
    </Card>
  );
}
```

---

## 🚀 Passo 6: Testar Localmente

1. Certifique-se de ter o arquivo `.npmrc` localmente (já criado):
   ```
   @frete.com:registry=https://registry.npmjs.org/
   //registry.npmjs.org/:_authToken=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
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   pnpm install --no-frozen-lockfile
   ```

3. Rode o projeto:
   ```bash
   npm run dev
   ```

---

## ✅ Verificação

Após configurar:

1. **Push para o repositório:**
   ```bash
   git add .
   git commit -m "Add Fuel Design System"
   git push
   ```

2. **Verifique o GitHub Actions:**
   - Acesse a aba **"Actions"** no repositório
   - Veja se o workflow está executando sem erros
   - O log deve mostrar: `npm notice Using auth token`

3. **Teste o deploy:**
   - Acesse: `https://fuel-design-system.github.io/transacional.github.io/`
   - Verifique se os componentes do Fuel DS estão renderizando corretamente

---

## 📚 Componentes Disponíveis

O Fuel DS possui os seguintes componentes:

- `avatar` - Avatares de usuário com status
- `badge` - Badges e etiquetas
- `button` - Botões
- `card` - Cards e containers
- `checkbox` - Checkboxes
- `chip` - Chips/Tags de filtro
- `dropdown` - Dropdowns
- `modal` - Modais
- `search` - Campo de busca
- `select` - Seletor
- `spinner` - Loading spinner
- `switch` - Toggle switch
- `tabs` - Abas
- `tag` - Tags
- `text-input` - Input de texto
- `textarea` - Textarea
- `tooltip` - Tooltips

Para mais detalhes, consulte a documentação interna do Fuel DS.

---

## ⚠️ Segurança

- **NUNCA** commite o arquivo `.npmrc` com o token
- O `.npmrc` está no `.gitignore` para prevenir commits acidentais
- Use sempre o arquivo `.npmrc.example` como referência (sem o token real)
- O token deve estar apenas:
  - No seu ambiente local (`.npmrc` não commitado)
  - Como Secret no GitHub Actions (`NPM_TOKEN`)

---

## 🐛 Troubleshooting

### Erro: "Access token expired or revoked"

**Solução:** O token NPM expirou. Solicite um novo token e atualize:
- Localmente: arquivo `.npmrc`
- GitHub: Settings → Secrets → `NPM_TOKEN`

### Erro: "404 Not Found - @frete.com/fuel-fonts"

**Solução:** Verifique se:
1. O secret `NPM_TOKEN` foi adicionado no GitHub
2. O workflow possui o step "Configure NPM for private packages"
3. O token está correto e válido

### Componentes não renderizam

**Solução:**
1. Verifique se os imports dos CSS estão corretos no `App.tsx`
2. Confira se as dependências foram instaladas (`node_modules/@frete.com/`)
3. Reinicie o dev server: `npm run dev`

---

## 📞 Suporte

Para dúvidas sobre o Fuel Design System, consulte:
- Documentação interna do Fuel DS
- Time de Design System da Frete.com
