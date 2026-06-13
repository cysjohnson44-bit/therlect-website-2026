# Cloudflare Pages 部署指南

## 📋 完整部署流程

### **第 1 步：訪問 Cloudflare Pages**

1. 打開 https://pages.cloudflare.com/
2. 使用 GitHub 帳戶登入
3. 授權 Cloudflare 訪問您的 GitHub

---

### **第 2 步：創建新項目**

1. 點擊 **「Create a project」** 或 **「New project」**
2. 選擇 **「Connect to Git」**
3. 選擇 **「GitHub」**

---

### **第 3 步：授權並選擇倉庫**

1. 點擊 **「Authorize Cloudflare」**
2. 在 GitHub 上授權
3. 搜索並選擇倉庫：
   ```
   cmcjk8888-maker/therlect-website
   ```
4. 點擊 **「Begin setup」** 或 **「Next」**

---

### **第 4 步：配置構建設置**

在構建設置頁面，確認以下信息：

| 設置項 | 值 |
|------|-----|
| **Build command** | `pnpm run build` |
| **Build output directory** | `dist/public` |
| **Root directory** | `/`（或保持空白） |
| **Environment variables** | 如需要可添加 |

點擊 **「Save and Deploy」** 或 **「Deploy」**

---

### **第 5 步：等待部署完成**

Cloudflare 會自動：
- ✅ 克隆您的倉庫
- ✅ 安裝依賴
- ✅ 構建項目
- ✅ 部署到 Cloudflare Pages

部署通常需要 2-5 分鐘。

---

### **第 6 步：獲取部署 URL**

部署完成後，您會獲得一個 URL，格式為：
```
https://therlect-website.pages.dev
```

或

```
https://<project-name>.pages.dev
```

---

## 🔗 配置自定義域名

### **步驟 1：進入域名設置**

1. 在 Cloudflare Pages 項目中，點擊 **「Settings」**
2. 選擇 **「Domains」**
3. 點擊 **「Add a domain」**

### **步驟 2：輸入域名**

輸入您的域名：
```
www.therlect.com
```

### **步驟 3：配置 DNS 記錄**

Cloudflare 會提供 DNS 記錄信息。根據您的域名註冊商配置 DNS：

**CNAME 記錄：**
```
Name: www
Type: CNAME
Value: therlect-website.pages.dev
```

或

**A 記錄：**
```
Name: www
Type: A
Value: Cloudflare 提供的 IP 地址
```

### **步驟 4：驗證域名**

等待 DNS 生效（通常 5-30 分鐘），然後訪問：
```
https://www.therlect.com
```

---

## ✅ 部署檢查清單

- [ ] GitHub 倉庫已連接到 Cloudflare Pages
- [ ] 構建設置已配置正確
- [ ] 部署已完成
- [ ] 獲得 `*.pages.dev` URL
- [ ] 自定義域名已添加
- [ ] DNS 記錄已配置
- [ ] 域名已驗證
- [ ] 網站可訪問

---

## 🔧 故障排除

### **部署失敗**

1. 檢查構建命令是否正確
2. 確認 `dist/public` 目錄存在
3. 檢查環境變數是否正確設置
4. 查看部署日誌了解具體錯誤

### **域名無法訪問**

1. 檢查 DNS 記錄是否正確配置
2. 等待 DNS 生效（可能需要 24 小時）
3. 使用 DNS 檢查工具驗證記錄

### **HTTPS 證書問題**

Cloudflare Pages 會自動提供 HTTPS 證書，無需手動配置。

---

## 📞 支持資源

- **Cloudflare Pages 文檔**：https://developers.cloudflare.com/pages/
- **Cloudflare 支持**：https://support.cloudflare.com/
- **GitHub Pages 文檔**：https://docs.github.com/en/pages

---

## 🎯 下一步

部署完成後，您可以：

1. ✅ 訪問 www.therlect.com 查看網站
2. ✅ 配置自動部署（每次推送到 GitHub 時自動更新）
3. ✅ 設置環境變數
4. ✅ 配置重定向和自定義規則

---

**祝您部署順利！** 🚀
