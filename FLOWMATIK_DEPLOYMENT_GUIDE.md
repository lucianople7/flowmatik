# 🚀 Guía de Despliegue Flowmatik en flowmatik.co

## Estado Actual
✅ **Frontend construido y listo**
✅ **Backend con agentes evolutivos funcionando**
✅ **Configuración de Cloudflare preparada**
✅ **Código subido a GitHub**

## 📋 Pasos para Activar en flowmatik.co

### 1. Configurar Cloudflare Pages (Frontend)

1. **Ir a Cloudflare Dashboard**:
   - Accede a tu cuenta de Cloudflare
   - Ve a "Pages" en el menú lateral

2. **Conectar Repositorio**:
   - Clic en "Create a project"
   - Selecciona "Connect to Git"
   - Autoriza acceso a GitHub
   - Selecciona repositorio: `lucianople7/flowmatik`
   - Rama: `devin/1751405731-advanced-evolutionary-agents`

3. **Configuración de Build**:
   ```
   Framework preset: None
   Build command: cd flowmatik-frontend && npm install && npm run build
   Build output directory: flowmatik-frontend/dist
   Root directory: (leave empty)
   ```

4. **Variables de Entorno**:
   ```
   NODE_VERSION = 18
   NPM_VERSION = 9
   VITE_API_URL = https://api.flowmatik.co
   ```

5. **Dominio Personalizado**:
   - Después del primer deploy, ve a "Custom domains"
   - Añade: `flowmatik.co`
   - Cloudflare configurará automáticamente el DNS

### 2. Configurar Cloudflare Workers (Backend)

1. **Instalar Wrangler CLI** (si no lo tienes):
   ```bash
   npm install -g wrangler
   wrangler login
   ```

2. **Crear KV Namespaces**:
   ```bash
   wrangler kv:namespace create "FLOWMATIK_CACHE"
   wrangler kv:namespace create "AGENT_MEMORY"
   ```

3. **Actualizar wrangler.toml** con los IDs generados:
   - Reemplaza `flowmatik_cache_namespace` con el ID real
   - Reemplaza `agent_memory_namespace` con el ID real

4. **Configurar Variables de Entorno**:
   ```bash
   wrangler secret put SILICONFLOW_API_KEY
   wrangler secret put NETMIND_API_KEY
   wrangler secret put HUGGINGFACE_API_KEY
   wrangler secret put BYTEDANCE_API_KEY
   ```

5. **Desplegar Backend**:
   ```bash
   cd flowmatik-backend
   wrangler deploy --env production
   ```

### 3. Configurar DNS

En tu panel de Cloudflare DNS:

1. **Dominio Principal** (flowmatik.co):
   - Tipo: CNAME
   - Nombre: @
   - Destino: [tu-proyecto].pages.dev

2. **API Subdomain** (api.flowmatik.co):
   - Tipo: CNAME
   - Nombre: api
   - Destino: flowmatik-backend-prod.[tu-usuario].workers.dev

3. **Admin Subdomain** (admin.flowmatik.co):
   - Tipo: CNAME
   - Nombre: admin
   - Destino: [tu-proyecto].pages.dev

### 4. Verificación Final

Después del despliegue, verifica:
- ✅ https://flowmatik.co carga el frontend
- ✅ https://api.flowmatik.co/health responde con estado del backend
- ✅ https://admin.flowmatik.co carga el Command Center
- ✅ Los 8 agentes IA responden correctamente
- ✅ El sistema de memoria persiste datos
- ✅ La evolución automática cada 3 horas funciona

## 🔧 Configuración SSL/TLS

1. Ve a SSL/TLS → Overview
2. Modo de cifrado: "Full (strict)"
3. Activa "Always Use HTTPS"

## ⚡ Optimización de Rendimiento

1. **Speed → Optimization**:
   - Activa Auto Minify (CSS, HTML, JS)
   - Activa compresión Brotli

2. **Caching → Configuration**:
   - Browser Cache TTL: "4 hours"
   - Activa "Always Online"

## 🛡️ Configuración de Seguridad

1. **Security → WAF**:
   - Activa Web Application Firewall
   - Nivel de seguridad: "Medium"

2. **Security → Bot Fight Mode**:
   - Activa Bot Fight Mode

## 📊 Monitoreo

- Cloudflare Analytics para insights de tráfico
- Workers Analytics para rendimiento del backend
- Real User Monitoring (RUM) para experiencia de usuario

## 🚨 Solución de Problemas

### Errores Comunes:
1. **Build Failures**: Verificar versión de Node.js
2. **API Errors**: Verificar variables de entorno
3. **CORS Issues**: Verificar URL del frontend en backend
4. **Memory Issues**: Verificar configuración KV

### Comandos de Debug:
```bash
# Ver logs de Workers
wrangler tail

# Probar despliegue local
wrangler dev

# Verificar datos KV
wrangler kv:key list --binding=AGENT_MEMORY
```

## 📱 URLs Finales

- **Frontend Principal**: https://flowmatik.co
- **API Backend**: https://api.flowmatik.co
- **Admin Terminal**: https://admin.flowmatik.co
- **Health Check**: https://api.flowmatik.co/health

## 🎯 Características Activas

- ✅ 8 Agentes IA Especializados
- ✅ Sistema de Memoria Avanzado
- ✅ Aprendizaje y Evolución Automática
- ✅ Comunicación Inter-Agente
- ✅ Generación de Contenido TikTok/Instagram
- ✅ Command Center en Tiempo Real
- ✅ Integración con IA Local y APIs Externas

¡Flowmatik estará completamente operativo en flowmatik.co! 🚀
