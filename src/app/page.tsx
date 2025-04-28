// app/page.tsx
import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Mobile Repair Website!</h1>
      <p>Here you can find all the repair services you need for your mobile phone.</p>
      <div>
        <Link href="/login">Login</Link> | <Link href="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default HomePage;
