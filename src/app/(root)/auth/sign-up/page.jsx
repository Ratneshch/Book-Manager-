"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { zSchema } from '@/lib/zodValidation'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa6";
import ButtonLoader from '@/components/Applications/ButtonLoader';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { userSignUp } from '@/redux/features/authSlice';


const SignUpPage = () => {

    const [isTypePassword, setTypePassword] = useState(false);

    const dispatch = useDispatch()
    const router = useRouter()
    const {loading, error} = useSelector((state)=> state.auth)

    const formData = zSchema.pick({
        name: true, email: true, password: true
    })

    const form = useForm({
        resolver: zodResolver(formData),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const signupSubmit = async(data) => {
        const result = await dispatch(userSignUp(data));

        if (userSignUp.fulfilled.match(result)) {
            router.push("/dashboard");
        }
    }
    return (
        <Card className="py-10 w-full max-w-[400px] mx-auto flex justify-center rounded-xl shadow-[0px_48px_100px_0px_rgba(17,12,46,0.15)] overflow-hidden">
            <CardHeader className="text-center">
                <CardTitle className="sm:text-3xl text-2xl font-bold">Sign-up</CardTitle>
                <CardDescription className="text-md font-semibold">
                    Please Create Your Account!
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form id="form-rhf-demo" onSubmit={form.handleSubmit(signupSubmit)}>
                    {/* user name */}
                    <Controller
                        name="name"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your name..."
                                    autoComplete="off"
                                    className="mb-3 bg-gray-50"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    {/* user email */}
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder="Enter your email..."
                                    autoComplete="off"
                                    className="mb-3 bg-gray-50"
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    {/* user password */}
                    <Controller
                        name="password"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                                <div className='relative'>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Enter your password..."
                                        autoComplete="off"
                                        className="mb-3 bg-gray-50"
                                        type={isTypePassword ? "text" : "password"}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setTypePassword(!isTypePassword)}
                                        className='absolute right-3 top-[40%] -translate-y-1/2 cursor-pointer'
                                    >
                                        {isTypePassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </button>
                                </div>
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <div className="flex justify-center">
                        <ButtonLoader text="Sign-up" type="submit" loading={loading} className="cursor-pointer border border-yellow-600 text-black text-md py-5 w-full mt-3 rounded-full" />
                    </div>

                    <div className="text-center mt-6">
                        <div className="flex justify-center gap-2 items-center">
                            <p className="text-md font-semibold text-gray-600">Already have an account?</p>
                            <Link
                                href="/auth/login"
                                className="text-blue-600 text-md underline font-semibold "
                            >
                                Login!
                            </Link>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}

export default SignUpPage