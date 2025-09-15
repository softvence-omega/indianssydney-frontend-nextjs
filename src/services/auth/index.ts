"use server";
// server url
const url = process.env.NEXT_SERVER_URL as string;

export const register = async (payload: any) => {
  console.log(url);
  const res = await fetch(`${url}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  return await res.json();
};

export const login = async () => {
  const res = await fetch(`${url}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await res.json();
};
