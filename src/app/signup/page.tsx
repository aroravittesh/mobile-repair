'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePhone = (phone: string) => {
    const re = /^[0-9]{10}$/; // Fixed: Earlier extra curly brace
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

    if (!name || !email || !phone || !password || !address || !pincode) {
      setMessage('Please fill all fields.');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Invalid email format.');
      return;
    }

    if (!validatePhone(phone)) {
      setMessage('Invalid phone number format.');
      return;
    }

    // Validate pincode
    const pincodeValid = await checkPincodeExists(pincode);
    if (!pincodeValid) {
      setMessage(`Invalid or non-existing pincode: ${pincode}`);
      return;
    }

    // All validations passed
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        countryCode,
        phone,
        password,
        addresses: [{ address, pincode }], // Only one address for signup
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
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)}>
          <option value="+91">+91 (India)</option>
          <option value="+1">+1 (USA)</option>
          <option value="+44">+44 (UK)</option>
          <option value="+61">+61 (Australia)</option>
          {/* Add more countries if needed */}
        </select><br />

        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        <h3>Address</h3>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Pincode"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
          required
        /><br />

        <button type="submit">Signup</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
