import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Timer, ArrowLeft, Lock, Mail, Phone, AlertCircle } from 'lucide-react';

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'identifier' | 'otp' | 'newPassword'>('identifier');
  const [identifier, setIdentifier] = useState('');
  const [identifierType, setIdentifierType] = useState<'email' | 'mobile'>('email');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const startResendTimer = () => {
    setResendTimer(30);
    const timer = setInterval(() => {
      setResendTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleIdentifierSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!identifier) {
      toast.error('Please enter your email or mobile number');
      return;
    }

    if (identifierType === 'mobile' && !identifier.match(/^\d{10}$/)) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }

    setLoading(true);
    try {
      // Simulate sending OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`OTP sent to your ${identifierType}`);
      toast((t) => (
        <div>
          <AlertCircle className="text-primary mb-2" size={24} />
          <p className="mb-0">Please check your {identifierType} for the OTP</p>
          <small className="text-muted">Enter the code in the next screen</small>
        </div>
      ), { duration: 5000 });
      setStep('otp');
      startResendTimer();
    } catch (error) {
      toast.error('Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join('');
    
    if (otpValue.length !== 6) {
      toast.error('Please enter complete OTP');
      return;
    }

    setLoading(true);
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('OTP verified successfully!', {
        icon: '✓',
        duration: 3000
      });
      setStep('newPassword');
    } catch (error) {
      toast.error('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Password reset successful! Please login with your new password');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    if (resendTimer === 0) {
      toast.success('OTP resent successfully');
      startResendTimer();
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 'identifier':
        return (
          <form onSubmit={handleIdentifierSubmit} className="fade-in">
            <div className="text-center mb-4">
              {identifierType === 'email' ? (
                <Mail size={40} className="text-primary mb-2" />
              ) : (
                <Phone size={40} className="text-primary mb-2" />
              )}
              <h4>Reset Password</h4>
              <p className="text-muted">Enter your {identifierType} to receive OTP</p>
            </div>
            <div className="mb-4">
              <div className="btn-group w-100">
                <button
                  type="button"
                  className={`btn ${identifierType === 'email' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setIdentifierType('email')}
                >
                  <Mail size={18} className="me-2" />
                  Email
                </button>
                <button
                  type="button"
                  className={`btn ${identifierType === 'mobile' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setIdentifierType('mobile')}
                >
                  <Phone size={18} className="me-2" />
                  Mobile
                </button>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">
                {identifierType === 'email' ? 'Email Address' : 'Mobile Number'}
              </label>
              <input
                type={identifierType === 'email' ? 'email' : 'tel'}
                className="form-control form-control-lg"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder={identifierType === 'email' ? 'Enter your email' : 'Enter 10-digit mobile number'}
                required
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-100 btn-lg"
              disabled={loading}
            >
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </button>
          </form>
        );

      case 'otp':
        return (
          <form onSubmit={handleOtpSubmit} className="fade-in">
            <div className="text-center mb-4">
              <div className="alert alert-info" role="alert">
                <AlertCircle size={20} className="me-2" />
                Enter the OTP sent to your {identifierType}
              </div>
            </div>
            <div className="d-flex justify-content-center gap-2 mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  className="form-control form-control-lg text-center"
                  style={{ width: '50px', height: '50px', fontSize: '1.5rem' }}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  maxLength={1}
                  required
                />
              ))}
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-100 btn-lg mb-3"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
            <div className="text-center">
              {resendTimer > 0 ? (
                <p className="text-muted">
                  <Timer size={16} className="me-1" />
                  Resend OTP in {resendTimer}s
                </p>
              ) : (
                <button 
                  type="button" 
                  className="btn btn-link"
                  onClick={handleResendOtp}
                >
                  Resend OTP
                </button>
              )}
            </div>
          </form>
        );

      case 'newPassword':
        return (
          <form onSubmit={handlePasswordSubmit} className="fade-in">
            <div className="text-center mb-4">
              <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" 
                   style={{ width: '70px', height: '70px' }}>
                <Lock size={35} className="text-white" />
              </div>
              <h4 className="mt-3">Set New Password</h4>
              <p className="text-muted">Create a strong password for your account</p>
            </div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Enter new password"
              />
              <div className="form-text">
                Password must be at least 6 characters long
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label">Confirm New Password</label>
              <input
                type="password"
                className="form-control form-control-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
                placeholder="Confirm new password"
              />
            </div>
            <button 
              type="submit" 
              className="btn btn-primary w-100 btn-lg"
              disabled={loading}
            >
              {loading ? 'Resetting Password...' : 'Reset Password'}
            </button>
          </form>
        );
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex align-items-center mb-4">
                {step !== 'identifier' && (
                  <button 
                    className="btn btn-link p-0 me-3"
                    onClick={() => setStep('identifier')}
                  >
                    <ArrowLeft size={24} />
                  </button>
                )}
                <h2 className="mb-0">Reset Password</h2>
              </div>
              {renderStepContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;