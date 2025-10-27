'use client'

import React from 'react'
import InputField from "@/components/forms/InputField";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";
import {useForm} from "react-hook-form";

const SignIn = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur'
    }, );

    const onSubmit= async (data: SignUpFormData) => {
        try {
            console.log(data);
        } catch (e) {
            console.error(e);
        }
    }
    return (
        <>
            <h1 className="form-title">Sign Up & Personalize</h1>

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
