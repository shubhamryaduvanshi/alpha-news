'use client'
import React, { useEffect, useState } from 'react'

import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { getPaymentIntent } from '@/app/api/action';

export const CheckoutPage = ({ amount, currency }: { amount: number, currency: string }) => {
    const stripe = useStripe();
    const elements = useElements();

    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const createPaymentIntent = async () => {
            setLoading(true);
            try {
                const response = await getPaymentIntent(amount, currency);
                console.log("response with intend", response)
                setClientSecret(response);
            } catch (err) {
                console.error('Error creating payment intent:', err);
                setError('Failed to create payment intent. Please try again.');
            } finally {
                setLoading(false);
            }
        }
        createPaymentIntent();
    }, [amount, currency]);

    console.log({ clientSecret });



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        setLoading(true);
        try {
            const submit = await elements.submit();
            console.log("submit", submit);
            const { error: paymentError } = await stripe.confirmPayment({
                elements,
                clientSecret: clientSecret!,
                confirmParams: {
                    return_url: 'http://localhost:3000/success', // Redirect URL after successful payment
                },
            });
            if (paymentError) {
                setError(paymentError.message || 'Payment failed. Please try again.');
            }
        } catch (error) {

        }

        setLoading(false);
    }

    // https://www.youtube.com/watch?v=fgbEwVWlpsI&t=520s
    // 13:26
    return (
        <div className="mt-8 bg-white p-4 rounded-lg">
            <p> Pay {amount} {currency}</p>
            <form onSubmit={handleSubmit}>
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {clientSecret && <PaymentElement />}
                <button
                    type="submit"
                    disabled={!stripe || !elements}
                    className="mt-4 bg-black text-white px-4 py-2 rounded disabled:bg-gray-400 
                    disabled:cursor-not-allowed w-full"
                >
                    Pay Now
                </button>
            </form>
        </div>
    )
}


