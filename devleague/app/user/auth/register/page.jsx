'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { api } from '@/lib/axios';
import { useRouter } from 'next/navigation';

export default function UserRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '',
    userName: '',
    role: '',
    dob: '',
    email: '',
    phone: '',
    profile: null,
    password: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.userName.trim()) newErrors.userName = 'Username is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9]{10,15}$/.test(formData.phone.toString())) {
      newErrors.phone = 'Phone number is invalid';
    }

    if (!formData.profile) newErrors.profile = 'Profile image is required';

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Create FormData for handling file upload
      const submitData = new FormData();
      submitData.append('fullName', formData.fullName);
      submitData.append('username', formData.userName);
      submitData.append('position', formData.role);
      submitData.append('date_of_birth', formData.dob);
      submitData.append('email', formData.email);
      submitData.append('phone_number', formData.phone);
      submitData.append('password', formData.password);
      if (formData.profile) {
        submitData.append('profile_image', formData.profile);
      }

      const response = await api.post('/auth/register', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201 || response.status === 200) {
        router.push('/user/auth/login');
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        'Registration failed. Please try again.';
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-full md:max-w-3xl">
      <Card className="overflow-hidden bg-neutral-500/30 border-none p-0 shadow-2xl mt-25">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-xl font-bold text-neutral-300">
                  Create Account
                </h1>
                <p className="text-muted-foreground text-balance text-sm">
                  Please enter your details to register
                </p>
              </div>
              {/*  */}
              <div className="flex flex-row item-center justify-center gap-3">
                <div className="w-full grid gap-3">
                  <Label
                    className="text-neutral-300 text-sm"
                    htmlFor="fullName"
                  >
                    Full Name
                  </Label>
                  <Input
                    className="text-sm text-neutral-200"
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  {errors.fullName && (
                    <p className="text-red-500 text-xs">{errors.fullName}</p>
                  )}
                </div>
                <div className="w-full grid gap-3">
                  <Label
                    className="text-neutral-300 text-sm"
                    htmlFor="userName"
                  >
                    User Name
                  </Label>
                  <Input
                    className="text-sm text-neutral-200"
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="User Name"
                    value={formData.userName}
                    onChange={handleChange}
                  />
                  {errors.userName && (
                    <p className="text-red-500 text-xs">{errors.userName}</p>
                  )}
                </div>
              </div>

              {/*  */}
              <div className="flex flex-row item-center justify-center gap-3">
                <div className="w-full grid gap-3">
                  <Label className="text-neutral-300 text-sm" htmlFor="role">
                    Role
                  </Label>
                  <Input
                    className="text-sm text-neutral-200"
                    id="role"
                    name="role"
                    type="text"
                    placeholder="Enter your role"
                    value={formData.role}
                    onChange={handleChange}
                  />
                  {errors.role && (
                    <p className="text-red-500 text-xs">{errors.role}</p>
                  )}
                </div>
                <div className="w-full grid gap-3">
                  <Label className="text-neutral-300 text-sm" htmlFor="dob">
                    Date of Birth
                  </Label>
                  <Input
                    className="text-sm text-neutral-200"
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-xs">{errors.dob}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-row item-center justify-center gap-3">
                <div className="w-full grid gap-3">
                  <Label className="text-neutral-300 text-sm" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    className="text-sm text-neutral-200"
                    id="email"
                    name="email"
                    type="email"
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>
                <div className="w-full grid gap-3">
                  <Label className="text-neutral-300 text-sm" htmlFor="phone">
                    Phone
                  </Label>
                  <Input
                    className="text-sm text-neutral-200"
                    id="phone"
                    name="phone"
                    type="text"
                    placeholder="+95*********"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div className="flex flex-row item-center justify-center gap-3">
                <div className="w-full grid gap-3">
                  <Label className="text-neutral-300 text-sm" htmlFor="profile">
                    Profile
                  </Label>
                  <Input
                    className="text-sm text-neutral-200"
                    id="profile"
                    name="profile"
                    type="file"
                    onChange={handleChange}
                  />
                  {errors.profile && (
                    <p className="text-red-500 text-xs">{errors.profile}</p>
                  )}
                </div>
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label
                    className="text-neutral-300 text-sm"
                    htmlFor="password"
                  >
                    Password
                  </Label>
                  <a
                    href="#"
                    className="ml-auto text-sm text-neutral-300 underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  className="text-sm text-neutral-200"
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">{errors.password}</p>
                )}
              </div>
              <div className="flex gap-1 items-center">
                <input
                  className="text-sm text-neutral-200"
                  type="checkbox"
                  id="acceptTerms"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                />
                <p className="text-sm text-neutral-300">
                  I accept <b>Terms and Conditions</b>
                </p>
              </div>
              {errors.acceptTerms && (
                <p className="text-red-500 text-xs">{errors.acceptTerms}</p>
              )}
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-neutral-200 hover:text-green-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creating account...' : 'Create an account'}
              </Button>
              <div className="text-center text-sm text-neutral-300">
                Already have an account?{' '}
                <Link
                  href="/user/auth/login"
                  className="underline underline-offset-4 text-green-500"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
