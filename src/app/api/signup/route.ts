import { NextResponse } from 'next/server';
import clientPromise from '../../../../lib/mongodb';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, countryCode, phone, password, addresses } = body;

    if (!name || !email || !countryCode || !phone || !password || !addresses) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const client = await clientPromise;
    const db = client.db();
    const usersCollection = db.collection('users');

    // Check if user already exists (optional but good)
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists.' }, { status: 400 });
    }

    await usersCollection.insertOne({
      name,
      email,
      countryCode,
      phone,
      password: hashedPassword,
      addresses,
    });

    return NextResponse.json({ message: 'Signup successful!' }, { status: 200 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 });
  }
}
