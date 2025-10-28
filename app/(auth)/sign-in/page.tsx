'use client'

import InputField from "@/components/forms/InputField";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";
import {useForm} from "react-hook-form";
import { signInWithEmail } from "@/lib/actions/auth.action";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


const SignIn = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignInFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur'
    }, );

    const onSubmit= async (data: SignInFormData) => {
        try {
            // Sign Up with Email
            const result = await signInWithEmail(data);
            if (result.success) router.push('/');
        } catch (e) {
            console.error(e);
            toast.error('Sign In Failed', {
                description: e instanceof Error ? e.message : "Failed to sign in",
            });
        }
    }

    return (
        <>
            <h1 className="form-title">Sign In & Personalize</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    register={register}
                    error={errors.email}
                    validation={{ required: 'John@example.com', pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Email address is required.' }}
                />

                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 2 }}
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Logging in...' : 'Log In'}
                </Button>

                <FooterLink text="Don't have an account" linkText="Sign Up" href="/sign-up"/>
            </form>
        </>
    );
}

export default SignIn;
