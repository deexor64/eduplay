import React, { useState } from 'react';

interface AuthFormLayoutProps {
  title: string;
  onSubmit: (data: { [key: string]: string }) => void;
  fields: { label: string; name: string; type: string }[];
}

const SignupLayout: React.FC<AuthFormLayoutProps> = ({ title, onSubmit, fields }) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'password') {
      setPasswordStrength(value.length >= 8 ? 'Strong' : 'Weak');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        {fields.map(field => (
          <div key={field.name} className="mb-4">
            <label className="block mb-1 font-medium text-gray-700">{field.label}</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
            {field.name === 'password' && (
              <p className={`text-sm mt-1 ${passwordStrength === 'Strong' ? 'text-green-600' : 'text-red-600'}`}>
                Password Strength: {passwordStrength}
              </p>
            )}
          </div>
        ))}

        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SignupLayout;
