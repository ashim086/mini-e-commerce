import { login } from "@/api/authApi";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
    return useMutation({
        mutationFn: login,
    });
}
