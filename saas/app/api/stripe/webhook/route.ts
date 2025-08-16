import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: NextRequest) {
	const secret = process.env.STRIPE_WEBHOOK_SECRET;
	const key = process.env.STRIPE_SECRET_KEY;
	if (!secret || !key) return NextResponse.json({ error: 'Stripe env missing' }, { status: 500 });

	const stripe = new Stripe(key, { apiVersion: '2023-10-16' });
	const sig = (await headers()).get('stripe-signature') as string;
	const raw = await req.text();

	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(raw, sig, secret);
	} catch (err: any) {
		return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
	}

	switch (event.type) {
		case 'checkout.session.completed': {
			// TODO: mark subscription active in DB
			break;
		}
		case 'customer.subscription.updated':
		case 'customer.subscription.created':
		case 'customer.subscription.deleted': {
			// TODO: sync subscription details
			break;
		}
	}

	return NextResponse.json({ received: true });
}