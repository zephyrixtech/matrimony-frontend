import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import UserNavigationBar from '../../components/ui/UserNavigationBar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import PageContainer from '../../components/ui/PageContainer';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import MobileBottomNav from '../../components/ui/MobileBottomNav';

const Register = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  const onSubmit = async (data) => {
    // Simulate registration by calling login with provided email
    const result = await login({ email: data?.email, password: data?.password });
    if (result?.success) {
      navigate('/my-profile-management', { replace: true });
    }
  };

  return (
    <PageContainer>
      <UserNavigationBar isAuthenticated={false} />
      <div className="container mx-auto px-4 py-10 max-w-lg">
        <NavigationBreadcrumbs />
        <div className="bg-card border border-border rounded-xl p-6 shadow-card">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-1">Create account</h1>
          <p className="text-sm text-muted-foreground mb-6">Join MatrimonyConnect in minutes</p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="First Name" required {...register('firstName', { required: 'First name is required' })} error={errors?.firstName?.message} />
              <Input label="Last Name" required {...register('lastName', { required: 'Last name is required' })} error={errors?.lastName?.message} />
            </div>

            <Input label="Email" type="email" required {...register('email', { required: 'Email is required' })} error={errors?.email?.message} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Password" type="password" required {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } })} error={errors?.password?.message} />
              <Input label="Confirm Password" type="password" required {...register('confirmPassword', { validate: (v) => v === watch('password') || 'Passwords do not match' })} error={errors?.confirmPassword?.message} />
            </div>

            <Button type="submit" fullWidth loading={loading} iconName="UserPlus">Register</Button>
          </form>

          <div className="text-sm text-muted-foreground mt-4 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline">Login</Link>
          </div>
        </div>
      </div>
      <MobileBottomNav />
    </PageContainer>
  );
};

export default Register;


