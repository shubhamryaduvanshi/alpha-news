'use client'
import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { convertToStripeAmount } from '@/libs/helper';
import { CheckoutPage } from '../CheckoutPage';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIP_PUBLISHABLE_KEY || '');



const BuyMeCoffee = () => {
    const currency = 'inr'; // Currency code (e.g., 'usd')
    const [amount, setAmount] = React.useState<number>(500);
    const [isFirstPage, setIsFirstPage] = React.useState<boolean>(true);


    return (
        <div className="bg-yellow-500 text-gray-800 py-8 w-full my-4 rounded-3xl">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold mb-2">Support Us with a Coffee!</h2>
                <p className="mb-4">If you enjoy our content, consider buying us a coffee to keep us going!</p>

                {isFirstPage ? (
                    <>
                        <button
                            onClick={() => setIsFirstPage(false)}
                            className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Buy Me a Coffee
                        </button>

                        <div className="mt-4">
                            <input type="number"
                                value={amount}
                                onChange={(e) => {
                                    const value = parseInt(e.target.value);

                                    setAmount(value);

                                }}
                                className="mb-4 p-2 rounded border w-full max-w-xs mx-auto"
                            />
                        </div>

                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsFirstPage(true)}
                            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4"
                        >
                            Back
                        </button>
                        <Elements stripe={stripePromise}
                            options={{
                                currency: 'inr',
                                amount: convertToStripeAmount(amount < 50 ? 50 : amount, currency),
                                mode: 'payment',
                            }
                            }
                        >
                            <CheckoutPage amount={amount} currency={currency} />
                        </Elements>
                    </>
                )
                }
            </div>
        </div>
    )
}




export default BuyMeCoffee
