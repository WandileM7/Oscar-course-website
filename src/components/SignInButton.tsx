// components/SignInButton.tsx
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignInButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        {session.user && <p>Signed in as {session.user.email}</p>}
        <button onClick={() => signOut()}>Sign out</button>
      </div>
    );
  }
  return (
    <button onClick={() => signIn("google")}>
      Sign in with Google
    </button>
  );
}
