import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function History() {
  const user = useSelector((state) => state.authUser.user);

   
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className='w-full min-h-screen'>
      You are logged in as User {user?.username}
    </div>
  );
}
