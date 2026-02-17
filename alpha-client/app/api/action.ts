'use server';

export const fetchBreakingNews = async () => {
    const baseUrl = process.env.BASE_URL
    const url = baseUrl + `/news-post/all`
    const res = await fetch(url);
    const jsonRes = await res.json();
    return jsonRes;
}

export const getPaymentIntent = async (amount: number, currency: string): Promise<string> => {
    const baseUrl = process.env.BASE_URL
    const url = baseUrl + `/payment/create-payment-intent`
    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ACCESS_TOKEN`, // Replace with actual access token if needed
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'POST',

        body: JSON.stringify({
            amount: amount * 100, // Convert to cents for Stripe
            currency
        })
    });    
    const jsonRes = await res.json();
    return jsonRes.client_secret;
}