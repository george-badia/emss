import { AuthPage } from "./auth-page";

export function meta() { return [{ title: "Log in | Transafrica Medical" }]; }
export default function InitialAuth() { return <AuthPage mode="login" />; }
