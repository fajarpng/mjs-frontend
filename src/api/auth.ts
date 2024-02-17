export default async function submitLogin(body: {
  email: string;
  password: string;
}) {
  return await { name: "Nadia Virgia", token: "token", body };
}
