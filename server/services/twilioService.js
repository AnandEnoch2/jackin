import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

// Store OTPs temporarily (in production, use Redis or similar)
const otpStore = new Map();

export const twilioService = {
  async sendOTP(phoneNumber) {
    try {
      // Generate 6-digit OTP
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store OTP with 5-minute expiry
      otpStore.set(phoneNumber, {
        otp,
        expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
      });

      // Send SMS using Twilio
      await client.messages.create({
        body: `Your FreshMart verification code is: ${otp}. Valid for 5 minutes.`,
        to: `+${phoneNumber}`,
        from: twilioPhoneNumber
      });

      return { success: true };
    } catch (error) {
      console.error('Twilio SMS Error:', error);
      throw new Error('Failed to send OTP');
    }
  },

  verifyOTP(phoneNumber, submittedOTP) {
    const storedData = otpStore.get(phoneNumber);
    
    if (!storedData) {
      throw new Error('OTP expired or not found');
    }

    if (Date.now() > storedData.expiresAt) {
      otpStore.delete(phoneNumber);
      throw new Error('OTP expired');
    }

    if (storedData.otp !== submittedOTP) {
      throw new Error('Invalid OTP');
    }

    // Clear used OTP
    otpStore.delete(phoneNumber);
    return { success: true };
  }
};