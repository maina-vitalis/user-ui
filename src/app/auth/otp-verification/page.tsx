'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { OtpVerificationForm } from '@/features/auth/components/otp-verification-form';

function OtpVerificationContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');

  if (!email) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-muted-foreground">
          Please provide an email to verify.
        </p>
      </div>
    );
  }

  return <OtpVerificationForm email={email} />;
}

export default function OtpVerificationPage() {
  return (
    <div className="flex bg-muted/20 min-h-screen w-full flex-col items-center justify-center p-4">
      <Suspense
        fallback={
          <div className="text-muted-foreground animate-pulse">Loading...</div>
        }
      >
        <OtpVerificationContent />
      </Suspense>
    </div>
  );
}
