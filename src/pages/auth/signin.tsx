// pages/auth/signin.tsx
import { getProviders, signIn } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useState } from "react";

interface SignInProps {
  providers: any;
  error?: string;
}

export default function SignIn({ providers, error }: SignInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-3xl font-bold mb-4">Sign In to Class Academy</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="mb-4">
        {Object.values(providers).map((provider: any) => {
          if (provider.name === "Credentials") return null; // We'll handle credentials below
          return (
            <div key={provider.name} className="mb-2">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => signIn(provider.id)}
              >
                Sign in with {provider.name}
              </button>
            </div>
          );
        })}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          signIn("credentials", { email, password });
        }}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <label className="block mb-2 font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />
        <label className="block mb-2 font-medium">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-4"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
          Sign In
        </button>
      </form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const { error } = context.query;
  return {
    props: { providers, error: error || null },
  };
};
