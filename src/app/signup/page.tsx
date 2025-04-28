'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    pincode: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false); // Track privacy terms agreement
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone);
  };

  const checkPincodeExists = async (pincode: string) => {
    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await res.json();
      return data[0].Status === 'Success';
    } catch (err) {
      console.error('Failed to validate pincode:', err);
      return false;
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: '', phone: '', pincode: '' }); // Reset errors before validation

    let isValid = true;

    if (!name || !email || !phone || !password || !address || !pincode || !agreedToTerms) {
      setMessage('Please fill all fields and agree to the terms.');
      return;
    }

    if (!validateEmail(email)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email format.' }));
      isValid = false;
    }

    if (!validatePhone(phone)) {
      setErrors((prev) => ({ ...prev, phone: 'Invalid phone number format.' }));
      isValid = false;
    }

    const pincodeValid = await checkPincodeExists(pincode);
    if (!pincodeValid) {
      setErrors((prev) => ({ ...prev, pincode: 'Invalid or non-existing pincode.' }));
      isValid = false;
    }

    if (!isValid) return;

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        countryCode,
        phone,
        password,
        addresses: [{ address, pincode }],
      }),
    });

    if (res.ok) {
      setMessage('Signup successful!');
      router.push('/login');
    } else {
      const data = await res.json();
      setMessage(data.error || 'Signup failed');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      <Header />
      <div className="container mx-auto py-16 px-6 flex flex-col items-center overflow-auto">
        <div className="w-full max-w-md p-10 bg-white rounded-xl shadow-xl transform transition-all duration-300 hover:scale-105">
          <h1 className="text-4xl font-semibold text-center text-gray-900 mb-8">Signup</h1>
          <form onSubmit={handleSignup} className="space-y-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
              />
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full p-4 border rounded-xl shadow-md focus:ring-2 focus:ring-blue-600 focus:outline-none ${errors.email ? 'border-orange-500' : 'border-gray-300'}`}
                  required
                />
                {errors.email && (
                  <div className="absolute text-sm text-orange-500 mt-1">
                    <i className="fas fa-exclamation-circle"></i> {errors.email}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
              >
                <option value="+91">+91 (India)</option>
                <option value="+1">+1 (USA)</option>
                <option value="+44">+44 (UK)</option>
                <option value="+61">+61 (Australia)</option>
              </select>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full p-4 border rounded-xl shadow-md focus:ring-2 focus:ring-blue-600 focus:outline-none ${errors.phone ? 'border-orange-500' : 'border-gray-300'}`}
                  required
                />
                {errors.phone && (
                  <div className="absolute text-sm text-orange-500 mt-1">
                    <i className="fas fa-exclamation-circle"></i> {errors.phone}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Address Details</h3>
              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-xl shadow-md focus:ring-2 focus:ring-blue-600 focus:outline-none"
                required
              />

              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className={`w-1/2 p-4 border rounded-xl shadow-md focus:ring-2 focus:ring-blue-600 focus:outline-none ${errors.pincode ? 'border-orange-500' : 'border-gray-300'}`}
                  required
                />
                {errors.pincode && (
                  <p className="text-sm text-orange-500">{errors.pincode}</p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={() => setAgreedToTerms(!agreedToTerms)}
                className="h-4 w-4 border-gray-300 rounded"
                required
              />
              <label htmlFor="privacyTerms" className="text-sm text-gray-700">
                I agree to the{' '}
                <a href="/privacyterms" className="text-blue-600 hover:underline">
                  Privacy Terms
                </a>
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-4 text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all duration-300"
            >
              Create Account
            </button>
          </form>

          {message && (
            <p className={`mt-4 text-center ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a></p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
