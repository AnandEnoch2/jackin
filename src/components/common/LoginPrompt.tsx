import React from 'react';
import { Link } from 'react-router-dom';

interface LoginPromptProps {
  message: string;
}

const LoginPrompt: React.FC<LoginPromptProps> = ({ message }) => (
  <div className="container py-5 text-center">
    <h2>{message}</h2>
    <Link to="/login" className="btn btn-primary mt-3">Login</Link>
  </div>
);

export default LoginPrompt;