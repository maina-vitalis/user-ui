import { SignupForm } from '@/features/auth/components/signup-form';

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center p-4 sm:p-8">
      <SignupForm />
    </div>
  );
}
