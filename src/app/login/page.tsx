// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import Header from '../components/header';
// import Footer from '../components/footer';

// const SignupPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [pincode, setPincode] = useState('');
//   const [message, setMessage] = useState('');
//   const router = useRouter();

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('/api/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password, pincode })
//       });

//       const result = await response.json();

//       if (response.ok) {
//         setMessage('Signup successful!');
//         router.push('/');
//       } else {
//         setMessage(result.error || 'Something went wrong');
//       }
//     } catch (err) {
//       setMessage('Network error. Please try again.');
//     }
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gradient-to-r from-green-400 to-green-600">
//       <Header />
//       <div className="flex items-center justify-center flex-1 p-6">
//         <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg">
//           <h1 className="text-3xl font-bold text-gray-900 mb-4">Signup</h1>
//           <form onSubmit={handleSignup} className="space-y-4">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//             <input
//               type="text"
//               placeholder="Pincode"
//               value={pincode}
//               onChange={(e) => setPincode(e.target.value)}
//               className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//             <button
//               type="submit"
//               className="w-full py-3 text-white bg-green-600 rounded-lg hover:bg-green-700"
//             >Signupdjfdj</button>
//           </form>
//           {message && <p className="mt-4 text-center text-red-500">{message}</p>}
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default SignupPage;
// src/app/login/page.tsx
'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/header';
import Footer from '../components/footer';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Send login request to API
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    if (response.ok) {
      setMessage('Login successful!');
      router.push('/');  // Redirect to homepage or dashboard after login
    } else {
      setMessage(result.error || 'Something went wrong');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-400 to-blue-600">
      {/* Header */}
      <Header />

      {/* Main content */}
      <div className="flex items-center justify-center flex-1 p-6">
        <div className="w-full max-w-sm p-8 bg-white rounded-xl shadow-lg">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Login</h1>
            <p className="text-gray-500">Enter your credentials to access your account</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full py-3 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Login
              </button>
            </div>
          </form>

          {message && (
            <p className={`mt-4 text-center ${message.includes('successful') ? 'text-green-500' : 'text-red-500'}`}>
              {message}
            </p>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign up</a></p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LoginPage;