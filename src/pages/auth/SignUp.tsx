import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signup } from "../../api/authApi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signupSchema } from "../../lib/schema/authSchema";
import { useNavigate } from "react-router-dom";


interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  avatar: string;
}

export default function Signup() {
  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: "https://picsum.photos/800",
    },
  });

  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: signup,
    mutationKey: ["user"],
    onSuccess: () => {
      toast.success("Signup successful!");
      navigate('/login')
    },
    onError: (error) => {
      toast.error(error?.message || "Something went wrong. Please try again.");
    },
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Signup data:", data);
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 p-4">
      <div className="flex shadow-lg rounded-lg h-[80%] overflow-hidden w-full max-w-4xl bg-white">
        {/* Image side */}
        <div className="w-1/2 hidden md:block">
          <img
            src="/AdminFormLogo.png"
            alt="Signup Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form side */}
        <div className="w-full md:w-1/2 p-8 justify-center content-center flex flex-col ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="you@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password Field */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm Password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          </Form>

          <div className="mt-4 text-sm">
            <span>Already have an account? </span>
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
