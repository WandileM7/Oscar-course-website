// pages/auth/error.tsx
import { useRouter } from "next/router";

export default function ErrorPage() {
  const router = useRouter();
  const { error } = router.query;
  
  let errorMessage = "An unknown error occurred.";
  if (error === "CredentialsSignin") {
    errorMessage = "Sign in failed. Check the details you provided are correct.";
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Error</h1>
      <p className="text-red-500">{errorMessage}</p>
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => router.push("/auth/signin")}
      >
        Back to Sign In
      </button>
    </div>
  );
}
