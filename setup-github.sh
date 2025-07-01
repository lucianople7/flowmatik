#!/bin/bash


echo "🚀 Setting up Flowmatik GitHub repository..."

if ! gh auth status &>/dev/null; then
    echo "❌ GitHub CLI not authenticated. Please run: gh auth login"
    exit 1
fi

echo "📁 Creating GitHub repository..."
gh repo create lucianople7/flowmatik \
    --public \
    --description "Flowmatik - AI-powered content generation platform for TikTok and Instagram with evolutionary workers and MCP integration" \
    --clone=false

if [ $? -eq 0 ]; then
    echo "✅ Repository created successfully"
else
    echo "❌ Failed to create repository. You may need to create it manually at https://github.com/new"
    echo "Repository name: flowmatik"
    echo "Description: Flowmatik - AI-powered content generation platform for TikTok and Instagram with evolutionary workers and MCP integration"
    echo "Visibility: Public"
    read -p "Press Enter after creating the repository manually..."
fi

echo "🔗 Adding remote origin..."
git remote add origin https://github.com/lucianople7/flowmatik.git

echo "📤 Pushing code to GitHub..."
git push -u origin devin/1751401431-evolutionary-workers

if [ $? -eq 0 ]; then
    echo "✅ Code pushed successfully to GitHub"
    echo "🌐 Repository URL: https://github.com/lucianople7/flowmatik"
else
    echo "❌ Failed to push code. Please check your GitHub authentication."
fi

echo ""
echo "🎉 GitHub setup complete!"
echo "Next steps:"
echo "1. Configure Cloudflare Pages to connect to this repository"
echo "2. Set build command: cd flowmatik-frontend && npm run build"
echo "3. Set output directory: flowmatik-frontend/dist"
echo "4. Configure custom domain: flowmatik.co"
echo "5. Add environment variables in Cloudflare dashboard"
