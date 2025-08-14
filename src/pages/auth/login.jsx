import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import UserNavigationBar from '../../components/ui/UserNavigationBar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import PageContainer from '../../components/ui/PageContainer';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import MobileBottomNav from '../../components/ui/MobileBottomNav';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { email: '', password: '' } });

  const onSubmit = async (data) => {
    const result = await login(data);
    if (result?.success) {
      const redirectTo = location?.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <PageContainer>
      <UserNavigationBar isAuthenticated={false} />
      <div className="container mx-auto px-4 py-10 max-w-md">
        <NavigationBreadcrumbs />
        <div className="bg-card border border-border rounded-xl p-6 shadow-card">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-1">Welcome back</h1>
          <p className="text-sm text-muted-foreground mb-6">Login to continue</p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
              {...register('email', { required: 'Email is required' })}
              error={errors?.email?.message}
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              required
              {...register('password', { required: 'Password is required' })}
              error={errors?.password?.message}
            />

            <Button type="submit" fullWidth loading={loading} iconName="LogIn">
              Login
            </Button>
          </form>

          <div className="text-sm text-muted-foreground mt-4 text-center">
            Don’t have an account?{' '}
            <Link to="/register" className="text-primary hover:underline">Register</Link>
          </div>
        </div>
      </div>
      <MobileBottomNav />
    </PageContainer>
  );
};

export default Login;


