# Cloudflare Deployment Guide for Flowmatik

## Prerequisites
- Cloudflare account with flowmatik.co domain
- Wrangler CLI installed
- GitHub repository access

## Step 1: Frontend Deployment (Cloudflare Pages)

1. **Connect GitHub Repository**:
   - Go to Cloudflare Dashboard → Pages
   - Click "Create a project" → "Connect to Git"
   - Select your GitHub repository: `lucianople7/flowmatik`
   - Choose branch: `devin/1751405731-advanced-evolutionary-agents`

2. **Build Configuration**:
   ```
   Build command: cd flowmatik-frontend && npm install && npm run build
   Build output directory: flowmatik-frontend/dist
   Root directory: /
   ```

3. **Environment Variables** (in Cloudflare Pages):
   ```
   NODE_VERSION=18
   NPM_VERSION=9
   VITE_API_URL=https://api.flowmatik.co
   ```

4. **Custom Domain**:
   - Add custom domain: `flowmatik.co`
   - Configure DNS: CNAME record pointing to your Pages domain

## Step 2: Backend Deployment (Cloudflare Workers)

1. **Install Wrangler**:
   ```bash
   npm install -g wrangler
   wrangler login
   ```

2. **Create KV Namespace**:
   ```bash
   cd flowmatik-backend
   wrangler kv:namespace create "AGENT_MEMORY"
   wrangler kv:namespace create "AGENT_MEMORY" --preview
   ```

3. **Update wrangler.toml** with KV namespace IDs

4. **Set Environment Variables**:
   ```bash
   wrangler secret put SILICONFLOW_API_KEY
   wrangler secret put NETMIND_API_KEY
   wrangler secret put HUGGINGFACE_API_KEY
   wrangler secret put BYTEDANCE_API_KEY
   ```

5. **Deploy Backend**:
   ```bash
   wrangler deploy --env production
   ```

## Step 3: DNS Configuration

1. **Main Domain** (flowmatik.co):
   - Type: CNAME
   - Name: @
   - Target: your-pages-domain.pages.dev

2. **API Subdomain** (api.flowmatik.co):
   - Type: CNAME
   - Name: api
   - Target: flowmatik-backend-prod.lucianople7.workers.dev

3. **Admin Subdomain** (admin.flowmatik.co):
   - Type: CNAME
   - Name: admin
   - Target: your-pages-domain.pages.dev

## Step 4: SSL/TLS Configuration

1. Go to SSL/TLS → Overview
2. Set encryption mode to "Full (strict)"
3. Enable "Always Use HTTPS"

## Step 5: Performance Optimization

1. **Speed → Optimization**:
   - Enable Auto Minify (CSS, HTML, JS)
   - Enable Brotli compression

2. **Caching → Configuration**:
   - Set Browser Cache TTL to "4 hours"
   - Enable "Always Online"

## Step 6: Security Settings

1. **Security → WAF**:
   - Enable Web Application Firewall
   - Set security level to "Medium"

2. **Security → Bot Fight Mode**:
   - Enable Bot Fight Mode

## Verification

After deployment, verify:
- ✅ https://flowmatik.co loads the frontend
- ✅ https://api.flowmatik.co/health returns backend status
- ✅ https://admin.flowmatik.co loads the Command Center
- ✅ AI agents respond correctly
- ✅ Memory persistence works
- ✅ Evolution system is active

## Monitoring

- Cloudflare Analytics for traffic insights
- Workers Analytics for backend performance
- Real User Monitoring (RUM) for user experience

## Troubleshooting

### Common Issues:
1. **Build Failures**: Check Node.js version compatibility
2. **API Errors**: Verify environment variables are set
3. **CORS Issues**: Ensure frontend URL is whitelisted in backend
4. **Memory Issues**: Check KV namespace configuration

### Debug Commands:
```bash
# Check Workers logs
wrangler tail

# Test local deployment
wrangler dev

# Check KV data
wrangler kv:key list --binding=AGENT_MEMORY
```

## Advanced Features

### Custom Headers
Add security headers in `_headers` file:
```
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
```

### Rate Limiting
Configure rate limiting in Workers for API protection.

### Analytics
Integrate Cloudflare Web Analytics for detailed insights.
