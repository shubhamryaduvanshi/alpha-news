'use server';

export const fetchBreakingNews = async () => {
    const baseUrl = process.env.BASE_URL
    const url = baseUrl + `/news-post/all`
    const res = await fetch(url);
    const jsonRes = await res.json();
    console.log("JSON RESPONSE::", jsonRes);
    
    return jsonRes;
}