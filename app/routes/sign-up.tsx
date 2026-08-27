import { AuthPage } from "./auth-page";

export function meta() { return [{ title: "Sign up | Transafrica Medical" }]; }
export default function SignUp() { return <AuthPage mode="sign-up" />; }
