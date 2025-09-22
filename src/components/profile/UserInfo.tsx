import React from 'react';
import { User, Settings } from 'lucide-react';
import { User as UserType } from '../../types';

interface UserInfoProps {
  user: UserType;
}

const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="text-center mb-4">
          <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center" 
               style={{ width: '80px', height: '80px' }}>
            <User size={40} className="text-white" />
          </div>
          <h4 className="mt-3 mb-1">{user.name}</h4>
          <p className="text-muted">{user.email}</p>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-outline-primary d-flex align-items-center justify-content-center gap-2">
            <Settings size={18} />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;