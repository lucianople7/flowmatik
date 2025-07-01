# Cloudflare Deployment Setup for Flowmatik

## Current Status
- ✅ Frontend successfully deployed at: https://flowmatikcontent-app-g8m230oz.devinapps.com
- ✅ Backend running locally with all AI integrations working
- ✅ Git repository complete with all enhanced code committed
- ⚠️ Backend needs Express.js to Workers conversion for Cloudflare deployment

## Quick Setup Steps

### 1. Create GitHub Repository
```bash
# Run the automated setup script
./setup-github.sh

# Or manually:
# 1. Go to https://github.com/new
# 2. Repository name: flowmatik
# 3. Description: Flowmatik - AI-powered content generation platform for TikTok and Instagram
# 4. Public repository
# 5. Create repository
# 6. Then run:
git remote add origin https://github.com/lucianople7/flowmatik.git
git push -u origin devin/1751401431-evolutionary-workers
```

### 2. Configure Cloudflare Pages (Frontend)
1. Go to Cloudflare Dashboard → Pages
2. Connect to Git → Select lucianople7/flowmatik repository
3. Configure build settings:
   - **Build command**: `cd flowmatik-frontend && npm run build`
   - **Build output directory**: `flowmatik-frontend/dist`
   - **Root directory**: `/` (leave empty)
4. Add environment variables:
   ```
   VITE_API_URL=https://api.flowmatik.co
   ```
5. Deploy and configure custom domain: `flowmatik.co`

### 3. Backend Deployment Options

#### Option A: Cloudflare Workers (Recommended)
**Issue**: Express.js needs conversion to Workers format
**Solution**: Convert to Fetch API handlers

#### Option B: Cloudflare Pages Functions
Deploy specific endpoints as Pages Functions:
```javascript
// functions/api/trends.js
export async function onRequest(context) {
  // Trend analysis endpoint
}
```

#### Option C: Alternative Platform
- **Vercel**: Full Express.js support
- **Railway**: Node.js compatible
- **Render**: Express.js ready

### 4. Environment Variables for Cloudflare
Add these in Cloudflare Dashboard → Workers/Pages → Settings → Environment Variables:

```
SILICONFLOW_API_KEY=your_siliconflow_api_key
NETMIND_API_KEY=your_netmind_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
BYTEDANCE_API_KEY=your_bytedance_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
```

### 5. GitHub Actions CI/CD
The repository includes `.github/workflows/deploy.yml` for automatic deployment.
Add these secrets in GitHub repository settings:

```
CLOUDFLARE_API_TOKEN=your_cloudflare_api_token
CLOUDFLARE_ACCOUNT_ID=your_cloudflare_account_id
SILICONFLOW_API_KEY=your_siliconflow_api_key
NETMIND_API_KEY=your_netmind_api_key
HUGGINGFACE_API_KEY=your_huggingface_api_key
BYTEDANCE_API_KEY=your_bytedance_api_key
STRIPE_SECRET_KEY=your_stripe_secret_key
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
INSTAGRAM_CLIENT_ID=your_instagram_client_id
INSTAGRAM_CLIENT_SECRET=your_instagram_client_secret
```

## Testing Checklist
- [ ] GitHub repository created and code pushed
- [ ] Cloudflare Pages connected and building successfully
- [ ] Custom domain flowmatik.co configured
- [ ] Environment variables added
- [ ] Backend deployment method chosen and implemented
- [ ] All AI endpoints responding correctly
- [ ] MiniaturaGeneradas section generating thumbnails
- [ ] GitHub Actions CI/CD pipeline working

## Support Links
- **Current Frontend**: https://flowmatikcontent-app-g8m230oz.devinapps.com
- **GitHub Repository**: https://github.com/lucianople7/flowmatik (after creation)
- **Devin Session**: https://app.devin.ai/sessions/02fd3793a2e04fc3809d26dac9086b2c
- **Requested by**: @lucianople7
