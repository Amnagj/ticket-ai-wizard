
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PasswordInput } from "./PasswordInput";
import { loginSchema, LoginFormValues } from "../lib/auth-schemas";

interface LoginFormProps {
  onSubmit: (values: LoginFormValues) => void;
  isLoading: boolean;
}

export const LoginForm = ({ onSubmit, isLoading }: LoginFormProps) => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="label-cosmic">Email</FormLabel>
              <FormControl>
                <Input 
                  type="email" 
                  placeholder="votre.email@exemple.com" 
                  {...field} 
                  className="cosmic-input text-white"
                />
              </FormControl>
              <FormMessage className="text-red-300" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <PasswordInput 
              control={form.control} 
              name="password" 
              label="Mot de passe" 
              {...field}
              labelClass="label-cosmic"
              inputClass="cosmic-input text-white"
            />
          )}
        />
        
        <Button 
          type="submit" 
          className="w-full cosmic-button py-6 relative overflow-hidden group" 
          disabled={isLoading}
        >
          <span className="relative z-10">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                Chargement...
              </>
            ) : "Se connecter"}
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </Button>
        
        <div className="text-center text-sm">
          <p className="text-white">
            Pas encore de compte ?{" "}
            <Link to="/signup" className="text-indigo-300 hover:text-indigo-200 hover:underline font-medium">
              Créer un compte
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};
