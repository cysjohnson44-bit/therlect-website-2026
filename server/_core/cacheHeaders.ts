/**
 * HTTP 快取頭配置 - 優化靜態資產快取
 */

export const cacheHeaders = {
  // 長期快取（1年）- 用於帶有內容哈希的資產
  longTermCache: {
    'Cache-Control': 'public, max-age=31536000, immutable',
  },
  
  // 中期快取（1個月）- 用於 JS/CSS 文件
  mediumTermCache: {
    'Cache-Control': 'public, max-age=2592000, must-revalidate',
  },
  
  // 短期快取（1小時）- 用於 HTML 文件
  shortTermCache: {
    'Cache-Control': 'public, max-age=3600, must-revalidate',
  },
  
  // 不快取 - 用於 API 響應
  noCache: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
};

/**
 * 根據文件類型返回適當的快取頭
 */
export function getCacheHeaders(filePath: string): Record<string, string> {
  // 帶有內容哈希的資產（長期快取）
  if (/\.[a-f0-9]{8}\.(js|css|woff2|png|jpg|webp)$/.test(filePath)) {
    return cacheHeaders.longTermCache;
  }
  
  // JavaScript 和 CSS 文件（中期快取）
  if (/\.(js|css)$/.test(filePath)) {
    return cacheHeaders.mediumTermCache;
  }
  
  // HTML 文件（短期快取）
  if (/\.html$/.test(filePath)) {
    return cacheHeaders.shortTermCache;
  }
  
  // 圖片和字體（中期快取）
  if (/\.(png|jpg|jpeg|webp|woff|woff2|ttf|eot)$/.test(filePath)) {
    return cacheHeaders.mediumTermCache;
  }
  
  // API 路由（不快取）
  if (filePath.startsWith('/api/')) {
    return cacheHeaders.noCache;
  }
  
  // 默認為短期快取
  return cacheHeaders.shortTermCache;
}
