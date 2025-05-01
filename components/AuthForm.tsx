'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import Image from 'next/image';
import FormField from './FormField';
import Link from 'next/link';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const authFormSchema = (type: FormType) =>
  z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email('Invalid email address'),
    password: z.string().min(5),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('submit');
    try {
      if (type === 'sign-in') {
        toast.success('Sign in successfully.');
        router.push('/');
      } else {
        toast.success('Account created successfully. Please sign in.');
        router.push('/sign-in');
      }
    } catch (err) {
      console.error(err);
      toast.error(`There was an error: ${err}`);
    }
  }

  const isSignIn = type === 'sign-in';

  return (
    <div className="flex flex-col card-border lg:min-w-[556px] perspective-distant">
      <div className="flex flex-col items-center gap-9 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="Logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepWise</h2>
        </div>
        <h3>Practice job interview with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Full Name"
                placeholder="Your Full Name"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email"
              // type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignIn ? 'Sign in' : 'Create an account'}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? 'No account yet?' : 'Have an account already?'}
          <Link
            href={isSignIn ? '/sign-up' : '/sign-in'}
            className="font-bold ml-1"
          >
            {isSignIn ? 'Sign up' : 'Sign in'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
