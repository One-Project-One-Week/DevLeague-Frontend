'use client';
import Link from 'next/link';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/contexts/AuthContext';

export default function UserLogin() {
  const { setIsAuthenticated, setUser } = useAuth();
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await api.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200 || response.status === 201) {
        // Redirect to dashboard or home page after successful login
        setIsAuthenticated(true);
        setUser(response.data.data);
        router.push('/hackathon');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Login failed. Please check your credentials.';
      setErrors({ general: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-sm md:max-w-3xl ">
      <Card className="overflow-hidden p-0 shadow-2xl bg-neutral-500/30 border-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-semibold text-neutral-300">
                  Welcome back
                </h1>
                <p className="text-muted-foreground text-balance text-sm">
                  Login to your DevLeague account
                </p>
              </div>
              {errors.general && (
                <div className="bg-red-500/20 border border-red-500 rounded p-2">
                  <p className="text-red-500 text-sm text-center">
                    {errors.general}
                  </p>
                </div>
              )}
              <div className="grid gap-3">
                <Label htmlFor="email" className="text-neutral-300">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  className="text-sm text-neutral-200"
                  placeholder="m@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                )}
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-neutral-300">
                    Password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline text-neutral-300"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  className="text-sm text-neutral-200"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-neutral-200 hover:text-green-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>

              <div className="text-center text-muted-foreground text-balance text-sm">
                Don&apos;t have an account?{' '}
                <Link
                  href="/user/auth/register"
                  className="underline underline-offset-4 text-green-500"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="bg-muted relative hidden md:block">
            <img
              src="/vercel.svg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
