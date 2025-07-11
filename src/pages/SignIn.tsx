import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import SignInForm from '@/components/SignInForm';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleSignIn = () => {
    login();
    navigate('/analytics');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">YT</span>
            </div>
            <span className="font-semibold text-lg">YouInTown</span>
          </div>
          <h1 className="text-sm text-gray-600 mb-6">Sign in</h1>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border-0">
          <CardHeader className="pb-6">
            <h2 className="text-2xl font-semibold text-center">Sign in</h2>
          </CardHeader>
          <CardContent className="space-y-6">
            <SignInForm />

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={handleSignUp}
                className="flex-1 h-12 border-gray-200 hover:bg-gray-50"
              >
                Sign up
              </Button>

              <Button
                onClick={handleSignIn}
                className="flex-1 h-12 bg-black hover:bg-gray-800 text-white"
              >
                Sign in
              </Button>
            </div>

            {/* Terms and Privacy */}
            <p className="text-xs text-gray-500 text-center mt-4">
              By continuing, you indicate that you've read and agree to our{' '}
              <span className="underline cursor-pointer">Term of Service</span> and{' '}
              <span className="underline cursor-pointer">Privacy Policy</span>.
            </p>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-400">© copyright 2025 YouInTown</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;