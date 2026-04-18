export const getProducts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_FOURTHWALL_API}/collections/all/products`, {
    headers: {
       "X-Fourthwall-Public-Token": process.env.NEXT_PUBLIC_FOURTHWALL_TOKEN!,
    },
    next: { revalidate: 1800 }
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.results || [];
};

export const redirectToCheckout = (cartId: string) => {
  const domain = process.env.NEXT_PUBLIC_CHECKOUT_DOMAIN;
  const url = `https://${domain}/checkout/?cartCurrency=USD&cartId=${cartId}`;
  window.location.href = url;
};

export const addToCartApi = async (cartId: string | null, variantId: string, quantity: number = 1) => {
  const method = "POST";
  const url = cartId 
    ? `${process.env.NEXT_PUBLIC_FOURTHWALL_API}/carts/${cartId}/lines` 
    : `${process.env.NEXT_PUBLIC_FOURTHWALL_API}/carts`;

  const body = cartId 
    ? JSON.stringify({ variantId, quantity })
    : JSON.stringify({ lines: [{ variantId, quantity }] });

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-Fourthwall-Public-Token": process.env.NEXT_PUBLIC_FOURTHWALL_TOKEN!,
    },
    body
  });

  if (!res.ok) throw new Error("Failed to add to cart");
  return await res.json();
};

export const getCartDetails = async (cartId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FOURTHWALL_API}/carts/${cartId}`, {
        headers: {
            "X-Fourthwall-Public-Token": process.env.NEXT_PUBLIC_FOURTHWALL_TOKEN!,
        }
    });
    if (!res.ok) return null;
    return await res.json();
}
