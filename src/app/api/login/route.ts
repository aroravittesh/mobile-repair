// app/api/login/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/mongodb';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection('users');

    // Find the user by email
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if the password matches
    if (user.password !== password) {
      return NextResponse.json({ error: 'Incorrect password' }, { status: 401 });
    }

    return NextResponse.json({ message: 'Login successful!' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
