import { AuthPage } from "./auth-page";

export function meta() { return [{ title: "Log in | Transafrica Medical" }]; }
export default function Login() { return <AuthPage mode="login" />; }
