import { useState } from 'react';

const useAuth = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const reset = () => {
    setUsername('');
    setPassword('');
  };

  return {
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
    reset,
  };
};

export default useAuth;
