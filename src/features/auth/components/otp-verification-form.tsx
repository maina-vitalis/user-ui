'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { verifyOtp } from '@/features/auth/api/auth-api';
import type { VerifyOtpPayload } from '@/features/auth/api/auth-api';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

interface OtpVerificationFormProps {
  readonly email: string;
}

const OTP_EXPIRY_TIME = 300; // 5 minutes in seconds
const MIN_OTP_LENGTH = 5;
const OTP_MAX_LENGTH = 5;

export function OtpVerificationForm({ email }: OtpVerificationFormProps) {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(OTP_EXPIRY_TIME);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((current) => current - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const mutation = useMutation({
    mutationFn: (payload: VerifyOtpPayload) => verifyOtp(payload),
    onSuccess: () => {
      toast.success('Email verified successfully!', {
        description: 'You can now sign in to your account.',
      });
      setTimeout(() => {
        router.push('/');
      }, 1500);
    },
    onError: (error: unknown) => {
      const errorMessage =
        (error as { response?: { data?: { message?: string } } })?.response
          ?.data?.message ?? 'Invalid OTP. Please try again.';
      toast.error('Verification Failed', {
        description: errorMessage,
      });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!otp || otp.length < MIN_OTP_LENGTH) {
      toast.error('Invalid OTP', {
        description: 'Please enter a valid OTP.',
      });
      return;
    }

    mutation.mutate({
      email,
      OTP: otp,
    });
  };

  const handleResendOtp = () => {
    setTimeLeft(OTP_EXPIRY_TIME);
    setCanResend(false);
    toast.success('OTP Resent', {
      description: 'A new OTP has been sent to your email.',
    });
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const isSubmitDisabled =
    mutation.isPending || timeLeft === 0 || otp.length < MIN_OTP_LENGTH;
  const isOtpInputDisabled = mutation.isPending || timeLeft === 0;
  const isResendDisabled = !canResend || mutation.isPending;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
        <CardDescription>
          We sent a code to{' '}
          <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <InputOTP
              maxLength={OTP_MAX_LENGTH}
              value={otp}
              onChange={setOtp}
              disabled={isOtpInputDisabled}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
              </InputOTPGroup>
            </InputOTP>

            <div className="text-sm text-center">
              {timeLeft > 0 ? (
                <span className="text-muted-foreground">
                  Code expires in{' '}
                  <span className="font-medium text-foreground">
                    {formattedTime}
                  </span>
                </span>
              ) : (
                <span className="text-destructive font-medium">
                  Code has expired. Please request a new one.
                </span>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitDisabled}>
            {mutation.isPending ? 'Verifying...' : 'Verify Email'}
          </Button>

          <div className="flex flex-col items-center justify-center gap-2 mt-2">
            <span className="text-sm text-muted-foreground">
              Didn&apos;t receive the code?
            </span>
            <Button
              type="button"
              variant="link"
              onClick={handleResendOtp}
              disabled={isResendDisabled}
              className="h-auto p-0 text-sm"
            >
              {canResend ? 'Resend OTP' : `Resend in ${formattedTime}`}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
