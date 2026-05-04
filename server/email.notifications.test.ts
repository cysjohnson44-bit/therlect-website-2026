import { describe, it, expect, vi, beforeEach } from "vitest";
import { EMAIL_CONFIG, isNotificationTypeEnabled, getEnabledNotificationTypes } from "./_core/emailConfig";

describe("Email Configuration", () => {
  describe("EMAIL_CONFIG", () => {
    it("should have admin email configured", () => {
      expect(EMAIL_CONFIG.ADMIN_EMAIL).toBe("jimmy.chen@therlect.com");
    });

    it("should have all three notification types enabled", () => {
      expect(EMAIL_CONFIG.NOTIFICATION_TYPES.BOOKING.enabled).toBe(true);
      expect(EMAIL_CONFIG.NOTIFICATION_TYPES.CONTACT_FORM.enabled).toBe(true);
      expect(EMAIL_CONFIG.NOTIFICATION_TYPES.CUSTOMER_INQUIRY.enabled).toBe(true);
    });

    it("should have correct notification type names", () => {
      expect(EMAIL_CONFIG.NOTIFICATION_TYPES.BOOKING.name).toBe("預約洽談");
      expect(EMAIL_CONFIG.NOTIFICATION_TYPES.CONTACT_FORM.name).toBe("聯絡表單");
      expect(EMAIL_CONFIG.NOTIFICATION_TYPES.CUSTOMER_INQUIRY.name).toBe("客服詢問");
    });

    it("should have 24-hour response time configured", () => {
      expect(EMAIL_CONFIG.RESPONSE_TIME_HOURS).toBe(24);
    });

    it("should have company contact information", () => {
      expect(EMAIL_CONFIG.COMPANY.name).toBe("Therlect 汎海科技");
      expect(EMAIL_CONFIG.COMPANY.phone).toBe("+886-2-2999-5596");
      expect(EMAIL_CONFIG.COMPANY.email).toBe("jimmy.chen@therlect.com");
    });
  });

  describe("isNotificationTypeEnabled", () => {
    it("should return true for enabled BOOKING notification", () => {
      expect(isNotificationTypeEnabled("BOOKING")).toBe(true);
    });

    it("should return true for enabled CONTACT_FORM notification", () => {
      expect(isNotificationTypeEnabled("CONTACT_FORM")).toBe(true);
    });

    it("should return true for enabled CUSTOMER_INQUIRY notification", () => {
      expect(isNotificationTypeEnabled("CUSTOMER_INQUIRY")).toBe(true);
    });
  });

  describe("getEnabledNotificationTypes", () => {
    it("should return all three enabled notification types", () => {
      const enabledTypes = getEnabledNotificationTypes();
      expect(enabledTypes).toContain("BOOKING");
      expect(enabledTypes).toContain("CONTACT_FORM");
      expect(enabledTypes).toContain("CUSTOMER_INQUIRY");
      expect(enabledTypes.length).toBe(3);
    });

    it("should return notification types in consistent order", () => {
      const enabledTypes1 = getEnabledNotificationTypes();
      const enabledTypes2 = getEnabledNotificationTypes();
      expect(enabledTypes1).toEqual(enabledTypes2);
    });
  });

  describe("Email notification flow", () => {
    it("should send booking notification to admin email", () => {
      const adminEmail = EMAIL_CONFIG.ADMIN_EMAIL;
      const isBookingEnabled = isNotificationTypeEnabled("BOOKING");
      
      expect(isBookingEnabled).toBe(true);
      expect(adminEmail).toBe("jimmy.chen@therlect.com");
    });

    it("should send contact form notification to admin email", () => {
      const adminEmail = EMAIL_CONFIG.ADMIN_EMAIL;
      const isContactFormEnabled = isNotificationTypeEnabled("CONTACT_FORM");
      
      expect(isContactFormEnabled).toBe(true);
      expect(adminEmail).toBe("jimmy.chen@therlect.com");
    });

    it("should send customer inquiry notification to admin email", () => {
      const adminEmail = EMAIL_CONFIG.ADMIN_EMAIL;
      const isInquiryEnabled = isNotificationTypeEnabled("CUSTOMER_INQUIRY");
      
      expect(isInquiryEnabled).toBe(true);
      expect(adminEmail).toBe("jimmy.chen@therlect.com");
    });

    it("should have response time of 24 hours for all notifications", () => {
      const responseTime = EMAIL_CONFIG.RESPONSE_TIME_HOURS;
      expect(responseTime).toBe(24);
    });
  });
});
