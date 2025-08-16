import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const priceMap: Record<string, string> = {
	starter: 'price_starter',
	pro: 'price_pro',
	premium: 'price_premium',
	enterprise: 'price_enterprise',
};

export async function POST(req: NextRequest) {
	const { tier } = await req.json();
	const secret = process.env.STRIPE_SECRET_KEY;
	if (!secret) return NextResponse.json({ error: 'STRIPE_SECRET_KEY missing' }, { status: 500 });
	const stripe = new Stripe(secret, { apiVersion: '2023-10-16' });
	const priceId = priceMap[tier];
	if (!priceId) return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });

	const session = await stripe.checkout.sessions.create({
		mode: 'subscription',
		line_items: [{ price: priceId, quantity: 1 }],
		success_url: `${process.env.APP_URL}/billing?success=1`,
		cancel_url: `${process.env.APP_URL}/billing?canceled=1`,
	});
	return NextResponse.json({ url: session.url });
}