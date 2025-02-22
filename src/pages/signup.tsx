// pages/signup.tsx
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";

interface SignUpForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

export default function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm<SignUpForm>();
  const router = useRouter();
  
  const onSubmit = async (data: SignUpForm) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await axios.post("/api/signup", data);
      router.push("/login");
    } catch (error) {
      console.error(error);
      alert("Sign up failed");
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
        <h2 className="text-2xl mb-4">Create an Account</h2>
        <input {...register("name", { required: true })} placeholder="Name" className="border p-2 mb-2 w-full" />
        <input {...register("email", { required: true })} type="email" placeholder="Email" className="border p-2 mb-2 w-full" />
        <input {...register("password", { required: true })} type="password" placeholder="Password" className="border p-2 mb-2 w-full" />
        <input {...register("confirmPassword", { required: true })} type="password" placeholder="Confirm Password" className="border p-2 mb-2 w-full" />
        <input {...register("phone")} type="text" placeholder="Phone Number" className="border p-2 mb-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Sign Up</button>
      </form>
    </div>
  );
}
