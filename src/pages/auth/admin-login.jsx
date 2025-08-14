import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import UserNavigationBar from '../../components/ui/UserNavigationBar';
import NavigationBreadcrumbs from '../../components/ui/NavigationBreadcrumbs';
import PageContainer from '../../components/ui/PageContainer';
import { useAuth } from '../../components/ui/AuthenticationGuard';

const AdminLogin = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { email: '', password: '', code: '' } });

  const onSubmit = async ({ email, password, code }) => {
    const result = await login({ email, password, adminCode: code });
    if (result?.success) {
      const redirectTo = location?.state?.from?.pathname || '/admin-dashboard';
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <PageContainer>
      <UserNavigationBar isAuthenticated={false} />
      <div className="container mx-auto px-4 py-10 max-w-md">
        <NavigationBreadcrumbs />
        <div className="bg-card border border-border rounded-xl p-6 shadow-card">
          <h1 className="text-2xl font-heading font-bold text-foreground mb-1">Admin Access</h1>
          <p className="text-sm text-muted-foreground mb-6">Enter admin credentials and secret code</p>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input label="Admin Email" type="email" required {...register('email', { required: 'Email is required' })} error={errors?.email?.message} />
            <Input label="Password" type="password" required {...register('password', { required: 'Password is required' })} error={errors?.password?.message} />
            <Input label="Secret Code" type="password" required {...register('code', { required: 'Secret code is required' })} error={errors?.code?.message} />
            <Button type="submit" fullWidth loading={loading} iconName="Shield">Secure Login</Button>
          </form>

          <div className="text-sm text-muted-foreground mt-4 text-center">
            Go back to{' '}
            <Link to="/login" className="text-primary hover:underline">User Login</Link>
          </div>
        </div>
      </div>
    </PageContainer>
  );
};

export default AdminLogin;


