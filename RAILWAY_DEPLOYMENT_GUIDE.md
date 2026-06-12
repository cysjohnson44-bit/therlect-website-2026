# Therlect 網站 Railway 部署指南

## 完全免費 + 無需信用卡部署

---

## 步驟 1：在您的電腦上安裝 Railway CLI

### macOS / Linux
```bash
curl -fsSL https://railway.app/install.sh | bash
```

### Windows (PowerShell)
```powershell
iwr https://railway.app/install.ps1 -useb | iex
```

---

## 步驟 2：登入 Railway

```bash
railway login
```

- 會打開瀏覽器窗口
- 點擊「Authorize」授權
- 複製授權碼到終端
- 按 Enter 完成登入

---

## 步驟 3：初始化 Railway 項目

進入項目目錄：
```bash
cd /path/to/therlect-website
```

初始化 Railway：
```bash
railway init
```

- 輸入項目名稱：`therlect-website`
- 選擇或創建新項目

---

## 步驟 4：部署到 Railway

```bash
railway up
```

Railway 會自動：
1. 讀取 `railway.json` 配置
2. 安裝依賴：`pnpm install`
3. 構建項目：`pnpm run build`
4. 啟動服務：`node dist/index.js`

---

## 步驟 5：設置環境變數

部署完成後，需要設置環境變數。

### 方法 A：使用 Railway CLI
```bash
railway variable add DATABASE_URL "your-database-url"
railway variable add JWT_SECRET "your-jwt-secret"
railway variable add VITE_APP_ID "your-app-id"
railway variable add OAUTH_SERVER_URL "your-oauth-url"
railway variable add VITE_OAUTH_PORTAL_URL "your-portal-url"
```

### 方法 B：使用 Railway Dashboard
1. 登入 https://railway.app
2. 進入您的項目
3. 點擊「Variables」
4. 添加環境變數

---

## 步驟 6：獲取部署 URL

部署完成後，Railway 會為您生成一個公開 URL。

查看 URL：
```bash
railway open
```

或在 Railway Dashboard 中查看。

---

## 常見問題

### Q: 部署失敗怎麼辦？
A: 查看部署日誌：
```bash
railway logs
```

### Q: 如何更新部署？
A: 提交代碼到 GitHub，然後：
```bash
railway up
```

### Q: 如何刪除項目？
A: 
```bash
railway delete
```

---

## 配置文件說明

`railway.json` 包含以下配置：

- **buildCommand**: 構建命令 (`pnpm install && pnpm run build`)
- **startCommand**: 啟動命令 (`node dist/index.js`)
- **NODE_ENV**: 設置為 `production`
- **PORT**: 設置為 `3000`

---

## 支持

如有問題，訪問 Railway 文檔：
https://docs.railway.app

或聯繫 Railway 支持：
https://railway.app/support

---

**祝部署順利！🚀**
