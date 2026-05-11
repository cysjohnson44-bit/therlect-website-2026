import { TRPCError } from "@trpc/server";
import { ENV } from "./env";
import { notifyOwner } from "./notification";

export type EmailPayload = {
  to: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
};

/**
 * Sends an email using the Manus Email Service
 * Returns `true` if the email was sent successfully, `false` if the service is unavailable
 */
export async function sendEmail(payload: EmailPayload): Promise<boolean> {
  const { to, subject, htmlContent, textContent } = payload;

  if (!to || !subject || !htmlContent) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "Email recipient, subject, and content are required.",
    });
  }

  if (!ENV.forgeApiUrl) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Email service URL is not configured.",
    });
  }

  if (!ENV.forgeApiKey) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Email service API key is not configured.",
    });
  }

  // Build the correct email service endpoint
  let endpoint = ENV.forgeApiUrl;
  if (!endpoint.endsWith("/")) {
    endpoint += "/";
  }
  endpoint += "webdevtoken.v1.WebDevService/SendEmail";
  
  // Log endpoint for debugging
  console.log("[Email] Sending to endpoint:", endpoint);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        accept: "application/json",
        authorization: `Bearer ${ENV.forgeApiKey}`,
        "content-type": "application/json",
        "connect-protocol-version": "1",
      },
      body: JSON.stringify({
        to,
        subject,
        htmlContent,
        textContent: textContent || htmlContent.replace(/<[^>]*>/g, ""),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Email] Failed to send email to ${to} (${response.status} ${response.statusText})${
          detail ? `: ${detail}` : ""
        }`
      );
      
      // Fallback: Use notification system for admin emails
      if (to === "jimmy.chen@therlect.com") {
        console.log("[Email] Falling back to notification system for admin");
        const plainText = textContent || htmlContent.replace(/<[^>]*>/g, "");
        try {
          await notifyOwner({
            title: subject,
            content: plainText.substring(0, 20000),
          });
          return true;
        } catch (notifyError) {
          console.warn("[Email] Notification fallback also failed:", notifyError);
          return false;
        }
      }
      
      return false;
    }

    return true;
  } catch (error) {
    console.warn("[Email] Error calling email service:", error);
    
    // Fallback: Use notification system for admin emails
    if (to === "jimmy.chen@therlect.com") {
      console.log("[Email] Falling back to notification system for admin");
      const plainText = textContent || htmlContent.replace(/<[^>]*>/g, "");
      try {
        await notifyOwner({
          title: subject,
          content: plainText.substring(0, 20000),
        });
        return true;
      } catch (notifyError) {
        console.warn("[Email] Notification fallback also failed:", notifyError);
        return false;
      }
    }
    
    return false;
  }
}

/**
 * Generates HTML email template for contact form submission
 */
export function generateContactEmailTemplate(data: {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%); color: white; padding: 20px; border-radius: 8px; }
    .content { background: #f5f5f5; padding: 20px; margin-top: 20px; border-radius: 8px; }
    .field { margin: 15px 0; }
    .label { font-weight: bold; color: #0099ff; }
    .value { margin-top: 5px; color: #666; }
    .footer { margin-top: 20px; font-size: 12px; color: #999; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>新的聯絡表單提交</h2>
      <p>來自 Therlect 汎海科技官方網站</p>
    </div>
    
    <div class="content">
      <div class="field">
        <div class="label">姓名：</div>
        <div class="value">${escapeHtml(data.name)}</div>
      </div>
      
      <div class="field">
        <div class="label">電子郵件：</div>
        <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
      </div>
      
      <div class="field">
        <div class="label">聯絡電話：</div>
        <div class="value">${escapeHtml(data.phone)}</div>
      </div>
      
      ${data.company ? `
      <div class="field">
        <div class="label">公司名稱：</div>
        <div class="value">${escapeHtml(data.company)}</div>
      </div>
      ` : ''}
      
      <div class="field">
        <div class="label">主旨：</div>
        <div class="value">${escapeHtml(data.subject)}</div>
      </div>
      
      <div class="field">
        <div class="label">訊息內容：</div>
        <div class="value" style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #0099ff;">
${escapeHtml(data.message)}
        </div>
      </div>
    </div>
    
    <div class="footer">
      <p>此郵件由 Therlect 汎海科技官方網站自動發送，請勿直接回覆此郵件。</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generates HTML email template for booking confirmation (user email)
 */
export function generateBookingConfirmationTemplate(data: {
  name: string;
  date: string;
  message?: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
    .content { background: #f5f5f5; padding: 20px; margin-top: 20px; border-radius: 8px; }
    .field { margin: 15px 0; }
    .label { font-weight: bold; color: #0099ff; }
    .value { margin-top: 5px; color: #666; }
    .footer { margin-top: 20px; font-size: 12px; color: #999; text-align: center; }
    .cta { text-align: center; margin-top: 20px; }
    .button { background: #0099ff; color: white; padding: 12px 30px; border-radius: 4px; text-decoration: none; display: inline-block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>預約洽談確認</h2>
      <p>感謝您選擇 Therlect 汎海科技</p>
    </div>
    
    <div class="content">
      <p>親愛的 ${escapeHtml(data.name)}，</p>
      
      <p>感謝您提交預約洽談申請！我們已收到您的信息，將在 24 小時內與您聯繫。</p>
      
      <div class="field">
        <div class="label">預約日期/時間：</div>
        <div class="value">${escapeHtml(data.date)}</div>
      </div>
      
      ${data.message ? `
      <div class="field">
        <div class="label">您的訊息：</div>
        <div class="value" style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #0099ff;">
${escapeHtml(data.message)}
        </div>
      </div>
      ` : ''}
      
      <p style="margin-top: 20px; color: #666;">
        如有任何疑問，請直接回覆此郵件或聯繫我們：
      </p>
      <p style="color: #666;">
        📧 jimmy.chen@therlect.com<br>
        📞 +886-2-2999-5596<br>
        🕐 週一至週五 09:00 - 18:00
      </p>
    </div>
    
    <div class="footer">
      <p>此郵件由 Therlect 汎海科技官方網站自動發送。</p>
      <p>© 2024 Therlect 汎海科技。保留所有權利。</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generates HTML email template for booking notification (admin email)
 */
export function generateBookingNotificationTemplate(data: {
  name: string;
  email: string;
  phone: string;
  date: string;
  message?: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%); color: white; padding: 20px; border-radius: 8px; }
    .content { background: #f5f5f5; padding: 20px; margin-top: 20px; border-radius: 8px; }
    .field { margin: 15px 0; }
    .label { font-weight: bold; color: #0099ff; }
    .value { margin-top: 5px; color: #666; }
    .footer { margin-top: 20px; font-size: 12px; color: #999; text-align: center; }
    .cta { text-align: center; margin-top: 20px; }
    .button { background: #0099ff; color: white; padding: 12px 30px; border-radius: 4px; text-decoration: none; display: inline-block; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>新的預約洽談申請</h2>
      <p>來自 Therlect 汎海科技官方網站</p>
    </div>
    
    <div class="content">
      <p><strong>新的預約洽談申請已提交，請及時跟進：</strong></p>
      
      <div class="field">
        <div class="label">客戶姓名：</div>
        <div class="value">${escapeHtml(data.name)}</div>
      </div>
      
      <div class="field">
        <div class="label">電子郵件：</div>
        <div class="value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
      </div>
      
      <div class="field">
        <div class="label">聯絡電話：</div>
        <div class="value">${escapeHtml(data.phone)}</div>
      </div>
      
      <div class="field">
        <div class="label">預約日期/時間：</div>
        <div class="value">${escapeHtml(data.date)}</div>
      </div>
      
      ${data.message ? `
      <div class="field">
        <div class="label">客戶訊息：</div>
        <div class="value" style="white-space: pre-wrap; background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #0099ff;">
${escapeHtml(data.message)}
        </div>
      </div>
      ` : ''}
      
      <div class="cta">
        <a href="mailto:${escapeHtml(data.email)}" class="button">回覆客戶</a>
      </div>
    </div>
    
    <div class="footer">
      <p>此郵件由 Therlect 汎海科技官方網站自動發送。</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Generates HTML email template for contact form confirmation (user email)
 */
export function generateContactConfirmationTemplate(data: {
  name: string;
  subject: string;
}): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #00d4ff 0%, #0099ff 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
    .content { background: #f5f5f5; padding: 20px; margin-top: 20px; border-radius: 8px; }
    .footer { margin-top: 20px; font-size: 12px; color: #999; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>我們已收到您的訊息</h2>
      <p>感謝您聯繫 Therlect 汎海科技</p>
    </div>
    
    <div class="content">
      <p>親愛的 ${escapeHtml(data.name)}，</p>
      
      <p>感謝您透過我們的網站聯繫我們。我們已成功收到您的訊息，主旨為「${escapeHtml(data.subject)}」。</p>
      
      <p>我們的團隊將在 24 小時內審閱您的訊息，並盡快與您聯繫。</p>
      
      <p style="margin-top: 20px; color: #666;">
        如有任何緊急事項，請直接聯繫我們：
      </p>
      <p style="color: #666;">
        📧 jimmy.chen@therlect.com<br>
        📞 +886-2-2999-5596<br>
        🕐 週一至週五 09:00 - 18:00
      </p>
    </div>
    
    <div class="footer">
      <p>此郵件由 Therlect 汎海科技官方網站自動發送。</p>
      <p>© 2024 Therlect 汎海科技。保留所有權利。</p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Escapes HTML special characters to prevent injection
 */
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}
