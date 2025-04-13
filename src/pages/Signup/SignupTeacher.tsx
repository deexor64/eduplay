import React from 'react';
import SignupLayout from './ui/SignupLayout';

const SignupTeacher = () => {
  return (
    <SignupLayout
      title="Admin Login"
      onSubmit={(data) => console.log("Admin Login Data:", data)}
      fields={[
        { label: 'Admin Username', name: 'username', type: 'text' },
        { label: 'Password', name: 'password', type: 'password' }
      ]}
    />
  );
};

export default SignupTeacher;
