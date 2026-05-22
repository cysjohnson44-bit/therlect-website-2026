import { type Express } from "express";
import { ENV } from "./env";

export function setupStorageProxy(app: Express) {
  app.get("/manus-storage/:key(*)", async (req, res) => {
    try {
      const key = req.params.key;
      if (!key) {
        return res.status(400).json({ error: "Missing storage key" });
      }

      // Call Manus storage API to get download URL
      const baseUrl = ENV.forgeApiUrl.replace(/\/+$/, "");
      const downloadApiUrl = new URL(
        "v1/storage/downloadUrl",
        baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`
      );
      downloadApiUrl.searchParams.set("path", key);

      const response = await fetch(downloadApiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${ENV.forgeApiKey}`,
        },
      });

      if (!response.ok) {
        const error = await response.text();
        console.error(`Storage API error: ${response.status} ${error}`);
        return res.status(response.status).json({ error: "Failed to get download URL" });
      }

      const data = (await response.json()) as { url: string };
      
      // Redirect to signed URL
      res.redirect(data.url);
    } catch (error) {
      console.error("Storage proxy error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
}
