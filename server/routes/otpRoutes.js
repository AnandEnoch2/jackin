import express from 'express';
import { twilioService } from '../services/twilioService.js';

const router = express.Router();

router.post('/send', async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    if (!phoneNumber || !phoneNumber.match(/^\+[1-9]\d{1,14}$/)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please provide a valid phone number with country code (e.g., +1234567890)' 
      });
    }

    const result = await twilioService.sendOTP(phoneNumber);
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to send OTP' 
    });
  }
});

router.post('/verify', async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;
    
    if (!phoneNumber || !otp) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number and OTP are required' 
      });
    }

    const result = twilioService.verifyOTP(phoneNumber, otp);
    res.json(result);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: error.message || 'Failed to verify OTP' 
    });
  }
});

export default router;