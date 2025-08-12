import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useLogin from "../../hooks/useLogin";
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
import toast from "react-hot-toast";
import { loginSchema } from "../../lib/schema/authSchema";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";


interface LoginFormData {
  email: string;
  password: string;
  name: string
}

export default function Login() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const setAuth = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const { mutate, isLoading } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    mutate(data, {
      onSuccess: (res) => {
        setAuth(res, res.access_token);
        localStorage.setItem("access_token", res.access_token);
        localStorage.setItem("refresh_token", res.refresh_token);
        toast.success("Login successful!");
        navigate("/products");
      },
      onError: (error) => {
        toast.error(error?.message || "Login failed. Please try again.");
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="flex shadow-lg border rounded-lg bg-white w-full max-w-4xl h-[500px]">
        <div className="hidden md:block w-1/2">
          <img
            src="/AdminFormLogo.png"
            alt="Logo"
            className="object-cover h-full w-full rounded-l-lg"
          />
        </div>
        <div className="flex flex-col justify-center w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-semibold mb-6">Sign In</h2>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-sm">
            <span>Don't have an account? </span>
            <a href="/" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
