import { Template } from '@/types/templates';

export const loginLayoutTemplate: Template = {
  id: 'login-layout-01',
  name: 'Qatar GBA Login Page',
  description:
    'A secure and accessible login page layout with modern design following Qatar GBA standards',
  category: 'authentication',
  tags: [
    'login',
    'authentication',
    'form',
    'qatar-gba',
    'responsive',
    'accessible',
  ],
  preview:
    'Modern login page with centered form, brand elements, and proper validation',
  responsive: true,
  accessible: true,
  qatarGBACompliant: true,
  metadata: {
    version: '1.0.0',
    lastUpdated: '2025-09-25',
    complexity: 'simple',
    estimatedImplementationTime: '1-2 hours',
    usageNotes:
      'Perfect for government applications, admin panels, and secure portals',
    designTokensUsed: [
      'qatar-primary',
      'qatar-neutral',
      'form-controls',
      'spacing-scale',
    ],
    dependencies: ['lucide-react', 'clsx'],
  },
  codeSnippets: [
    {
      language: 'react',
      filename: 'LoginLayout.tsx',
      code: `import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Shield, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface LoginLayoutProps {
  onSubmit: (email: string, password: string) => void;
  loading?: boolean;
  error?: string;
  title?: string;
  subtitle?: string;
  brandLogo?: string;
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
  onForgotPassword?: () => void;
}

export const LoginLayout: React.FC<LoginLayoutProps> = ({
  onSubmit,
  loading = false,
  error,
  title = "Welcome to Qatar GBA",
  subtitle = "Sign in to access your government services",
  brandLogo,
  showRememberMe = true,
  showForgotPassword = true,
  onForgotPassword
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(email, password);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-qatar-primary-50 to-qatar-primary-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          {brandLogo ? (
            <img src={brandLogo} alt="Qatar GBA" className="h-16 mx-auto mb-6" />
          ) : (
            <div className="h-16 w-16 bg-qatar-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-8 w-8 text-white" />
            </div>
          )}
          <h1 className="text-3xl font-bold text-qatar-neutral-900 mb-2">
            {title}
          </h1>
          <p className="text-qatar-neutral-600">
            {subtitle}
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-qatar-neutral-200">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-qatar-neutral-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-qatar-neutral-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={clsx(
                    "w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:border-transparent transition-colors",
                    formErrors.email
                      ? "border-red-300 bg-red-50"
                      : "border-qatar-neutral-300 hover:border-qatar-neutral-400"
                  )}
                  placeholder="Enter your email"
                  required
                  aria-describedby={formErrors.email ? "email-error" : undefined}
                />
              </div>
              {formErrors.email && (
                <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
                  {formErrors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-qatar-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-qatar-neutral-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={clsx(
                    "w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:border-transparent transition-colors",
                    formErrors.password
                      ? "border-red-300 bg-red-50"
                      : "border-qatar-neutral-300 hover:border-qatar-neutral-400"
                  )}
                  placeholder="Enter your password"
                  required
                  aria-describedby={formErrors.password ? "password-error" : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-qatar-neutral-400 hover:text-qatar-neutral-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-qatar-neutral-400 hover:text-qatar-neutral-600" />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p id="password-error" className="mt-2 text-sm text-red-600" role="alert">
                  {formErrors.password}
                </p>
              )}
            </div>

            {(showRememberMe || showForgotPassword) && (
              <div className="flex items-center justify-between">
                {showRememberMe && (
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 text-qatar-primary-600 focus:ring-qatar-primary-500 border-qatar-neutral-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-qatar-neutral-700">
                      Remember me
                    </label>
                  </div>
                )}

                {showForgotPassword && (
                  <button
                    type="button"
                    onClick={onForgotPassword}
                    className="text-sm text-qatar-primary-600 hover:text-qatar-primary-500 font-medium"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={clsx(
                "w-full py-3 px-4 border border-transparent rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:ring-offset-2 transition-colors",
                loading
                  ? "bg-qatar-neutral-400 cursor-not-allowed"
                  : "bg-qatar-primary-600 hover:bg-qatar-primary-700 active:bg-qatar-primary-800"
              )}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-qatar-neutral-600">
              Secure login powered by{' '}
              <span className="font-medium text-qatar-primary-600">Qatar GBA</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-qatar-neutral-500">
          <p>
            By signing in, you agree to our{' '}
            <a href="#" className="text-qatar-primary-600 hover:text-qatar-primary-500 font-medium">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-qatar-primary-600 hover:text-qatar-primary-500 font-medium">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginLayout;`,
    },
    {
      language: 'nextjs',
      filename: 'login-page.tsx',
      code: `'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, Shield, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

  const validateForm = () => {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Simulate successful login
      if (email === 'admin@qatar.gov.qa' && password === 'password123') {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-qatar-primary-50 to-qatar-primary-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="h-16 w-16 bg-qatar-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-qatar-neutral-900 mb-2">
            Welcome to Qatar GBA
          </h1>
          <p className="text-qatar-neutral-600">
            Sign in to access your government services
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-lg shadow-lg p-8 border border-qatar-neutral-200">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-3 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-qatar-neutral-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-qatar-neutral-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={clsx(
                    "w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:border-transparent transition-colors",
                    formErrors.email
                      ? "border-red-300 bg-red-50"
                      : "border-qatar-neutral-300 hover:border-qatar-neutral-400"
                  )}
                  placeholder="Enter your email"
                  required
                />
              </div>
              {formErrors.email && (
                <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-qatar-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-qatar-neutral-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={clsx(
                    "w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:border-transparent transition-colors",
                    formErrors.password
                      ? "border-red-300 bg-red-50"
                      : "border-qatar-neutral-300 hover:border-qatar-neutral-400"
                  )}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-qatar-neutral-400 hover:text-qatar-neutral-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-qatar-neutral-400 hover:text-qatar-neutral-600" />
                  )}
                </button>
              </div>
              {formErrors.password && (
                <p className="mt-2 text-sm text-red-600">{formErrors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-qatar-primary-600 focus:ring-qatar-primary-500 border-qatar-neutral-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-qatar-neutral-700">
                  Remember me
                </label>
              </div>

              <button
                type="button"
                className="text-sm text-qatar-primary-600 hover:text-qatar-primary-500 font-medium"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={clsx(
                "w-full py-3 px-4 border border-transparent rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:ring-offset-2 transition-colors",
                loading
                  ? "bg-qatar-neutral-400 cursor-not-allowed"
                  : "bg-qatar-primary-600 hover:bg-qatar-primary-700 active:bg-qatar-primary-800"
              )}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-qatar-neutral-600">
              Demo credentials: admin@qatar.gov.qa / password123
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-qatar-neutral-500">
          <p>
            By signing in, you agree to our{' '}
            <button className="text-qatar-primary-600 hover:text-qatar-primary-500 font-medium">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-qatar-primary-600 hover:text-qatar-primary-500 font-medium">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}`,
    },
    {
      language: 'blazor',
      filename: 'LoginPage.razor',
      code: `@page "/login"
@using System.ComponentModel.DataAnnotations
@inject NavigationManager Navigation
@inject IJSRuntime JSRuntime

<div class="min-h-screen bg-gradient-to-br from-qatar-primary-50 to-qatar-primary-100 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-8">
            <div class="h-16 w-16 bg-qatar-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
                </svg>
            </div>
            <h1 class="text-3xl font-bold text-qatar-neutral-900 mb-2">
                Welcome to Qatar GBA
            </h1>
            <p class="text-qatar-neutral-600">
                Sign in to access your government services
            </p>
        </div>

        <!-- Login Form -->
        <div class="bg-white rounded-lg shadow-lg p-8 border border-qatar-neutral-200">
            @if (!string.IsNullOrEmpty(ErrorMessage))
            {
                <div class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                    <svg class="h-5 w-5 text-red-500 mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <p class="text-sm text-red-700">@ErrorMessage</p>
                </div>
            }

            <EditForm Model="loginModel" OnValidSubmit="HandleSubmit" class="space-y-6">
                <DataAnnotationsValidator />

                <div>
                    <label for="email" class="block text-sm font-medium text-qatar-neutral-700 mb-2">
                        Email Address
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-qatar-neutral-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                        </div>
                        <InputText @bind-Value="loginModel.Email"
                                 id="email"
                                 class="@GetInputClasses("Email")"
                                 placeholder="Enter your email" />
                    </div>
                    <ValidationMessage For="() => loginModel.Email" class="mt-2 text-sm text-red-600" />
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-qatar-neutral-700 mb-2">
                        Password
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-qatar-neutral-400" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <circle cx="12" cy="16" r="1"/>
                                <path d="m7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                        <input type="@(ShowPassword ? "text" : "password")"
                               @bind="loginModel.Password"
                               id="password"
                               class="@GetInputClasses("Password")"
                               placeholder="Enter your password" />
                        <button type="button"
                                @onclick="TogglePasswordVisibility"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center">
                            @if (ShowPassword)
                            {
                                <svg class="h-5 w-5 text-qatar-neutral-400 hover:text-qatar-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="m9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                                    <line x1="2" y1="2" x2="22" y2="22"/>
                                </svg>
                            }
                            else
                            {
                                <svg class="h-5 w-5 text-qatar-neutral-400 hover:text-qatar-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                    <circle cx="12" cy="12" r="3"/>
                                </svg>
                            }
                        </button>
                    </div>
                    <ValidationMessage For="() => loginModel.Password" class="mt-2 text-sm text-red-600" />
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <InputCheckbox @bind-Value="loginModel.RememberMe"
                                     id="remember-me"
                                     class="h-4 w-4 text-qatar-primary-600 focus:ring-qatar-primary-500 border-qatar-neutral-300 rounded" />
                        <label for="remember-me" class="ml-2 block text-sm text-qatar-neutral-700">
                            Remember me
                        </label>
                    </div>

                    <button type="button"
                            @onclick="HandleForgotPassword"
                            class="text-sm text-qatar-primary-600 hover:text-qatar-primary-500 font-medium">
                        Forgot password?
                    </button>
                </div>

                <button type="submit"
                        disabled="@IsLoading"
                        class="@GetSubmitButtonClasses()">
                    @if (IsLoading)
                    {
                        <div class="flex items-center justify-center">
                            <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Signing in...
                        </div>
                    }
                    else
                    {
                        <text>Sign In</text>
                    }
                </button>
            </EditForm>

            <div class="mt-6 text-center">
                <p class="text-sm text-qatar-neutral-600">
                    Secure login powered by <span class="font-medium text-qatar-primary-600">Qatar GBA</span>
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div class="mt-8 text-center text-sm text-qatar-neutral-500">
            <p>
                By signing in, you agree to our
                <button type="button" class="text-qatar-primary-600 hover:text-qatar-primary-500 font-medium">
                    Terms of Service
                </button> and
                <button type="button" class="text-qatar-primary-600 hover:text-qatar-primary-500 font-medium">
                    Privacy Policy
                </button>
            </p>
        </div>
    </div>
</div>

@code {
    private LoginModel loginModel = new();
    private bool IsLoading = false;
    private bool ShowPassword = false;
    private string ErrorMessage = string.Empty;

    private class LoginModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters")]
        public string Password { get; set; } = string.Empty;

        public bool RememberMe { get; set; } = false;
    }

    private async Task HandleSubmit()
    {
        IsLoading = true;
        ErrorMessage = string.Empty;

        try
        {
            // Simulate API call
            await Task.Delay(2000);

            // Simulate authentication logic
            if (loginModel.Email == "admin@qatar.gov.qa" && loginModel.Password == "password123")
            {
                Navigation.NavigateTo("/dashboard");
            }
            else
            {
                ErrorMessage = "Invalid email or password. Please try again.";
            }
        }
        catch
        {
            ErrorMessage = "An error occurred. Please try again later.";
        }
        finally
        {
            IsLoading = false;
        }
    }

    private void TogglePasswordVisibility()
    {
        ShowPassword = !ShowPassword;
    }

    private void HandleForgotPassword()
    {
        Navigation.NavigateTo("/forgot-password");
    }

    private string GetInputClasses(string fieldName)
    {
        var hasError = false; // You would check validation state here
        return $"w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:border-transparent transition-colors {(hasError ? "border-red-300 bg-red-50" : "border-qatar-neutral-300 hover:border-qatar-neutral-400")}";
    }

    private string GetSubmitButtonClasses()
    {
        return $"w-full py-3 px-4 border border-transparent rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:ring-offset-2 transition-colors {(IsLoading ? "bg-qatar-neutral-400 cursor-not-allowed" : "bg-qatar-primary-600 hover:bg-qatar-primary-700 active:bg-qatar-primary-800")}";
    }
}`,
    },
    {
      language: 'html',
      filename: 'login.html',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Qatar GBA - Login</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    colors: {
                        'qatar-primary': {
                            50: '#fdf2f8',
                            100: '#fce7f3',
                            200: '#fbcfe8',
                            300: '#f9a8d4',
                            400: '#f472b6',
                            500: '#ec4899',
                            600: '#db2777',
                            700: '#be185d',
                            800: '#9d174d',
                            900: '#831843'
                        },
                        'qatar-neutral': {
                            50: '#f8fafc',
                            100: '#f1f5f9',
                            200: '#e2e8f0',
                            300: '#cbd5e1',
                            400: '#94a3b8',
                            500: '#64748b',
                            600: '#475569',
                            700: '#334155',
                            800: '#1e293b',
                            900: '#0f172a'
                        }
                    }
                }
            }
        }
    </script>
</head>
<body class="min-h-screen bg-gradient-to-br from-qatar-primary-50 to-qatar-primary-100 flex items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
        <!-- Header -->
        <div class="text-center mb-8">
            <div class="h-16 w-16 bg-qatar-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg class="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1l3 6 6 3-6 3-3 6-3-6-6-3 6-3z"/>
                </svg>
            </div>
            <h1 class="text-3xl font-bold text-qatar-neutral-900 mb-2">
                Welcome to Qatar GBA
            </h1>
            <p class="text-qatar-neutral-600">
                Sign in to access your government services
            </p>
        </div>

        <!-- Login Form -->
        <div class="bg-white rounded-lg shadow-lg p-8 border border-qatar-neutral-200">
            <div id="error-message" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg items-center hidden">
                <svg class="h-5 w-5 text-red-500 mr-3 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <p id="error-text" class="text-sm text-red-700"></p>
            </div>

            <form id="login-form" class="space-y-6">
                <div>
                    <label for="email" class="block text-sm font-medium text-qatar-neutral-700 mb-2">
                        Email Address
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-qatar-neutral-400" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                                <polyline points="22,6 12,13 2,6"/>
                            </svg>
                        </div>
                        <input
                            id="email"
                            type="email"
                            class="w-full pl-10 pr-4 py-3 border border-qatar-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:border-transparent transition-colors hover:border-qatar-neutral-400"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <p id="email-error" class="mt-2 text-sm text-red-600 hidden"></p>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium text-qatar-neutral-700 mb-2">
                        Password
                    </label>
                    <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg class="h-5 w-5 text-qatar-neutral-400" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                                <circle cx="12" cy="16" r="1"/>
                                <path d="m7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                        <input
                            id="password"
                            type="password"
                            class="w-full pl-10 pr-12 py-3 border border-qatar-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:border-transparent transition-colors hover:border-qatar-neutral-400"
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            id="toggle-password"
                            type="button"
                            class="absolute inset-y-0 right-0 pr-3 flex items-center"
                        >
                            <svg id="eye-icon" class="h-5 w-5 text-qatar-neutral-400 hover:text-qatar-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                            </svg>
                            <svg id="eye-off-icon" class="h-5 w-5 text-qatar-neutral-400 hover:text-qatar-neutral-600 hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="m9.88 9.88a3 3 0 1 0 4.24 4.24"/>
                                <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
                                <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
                                <line x1="2" y1="2" x2="22" y2="22"/>
                            </svg>
                        </button>
                    </div>
                    <p id="password-error" class="mt-2 text-sm text-red-600 hidden"></p>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex items-center">
                        <input
                            id="remember-me"
                            type="checkbox"
                            class="h-4 w-4 text-qatar-primary-600 focus:ring-qatar-primary-500 border-qatar-neutral-300 rounded"
                        />
                        <label for="remember-me" class="ml-2 block text-sm text-qatar-neutral-700">
                            Remember me
                        </label>
                    </div>

                    <a href="#" class="text-sm text-qatar-primary-600 hover:text-qatar-primary-500 font-medium">
                        Forgot password?
                    </a>
                </div>

                <button
                    id="submit-btn"
                    type="submit"
                    class="w-full py-3 px-4 border border-transparent rounded-lg text-white font-medium focus:outline-none focus:ring-2 focus:ring-qatar-primary-500 focus:ring-offset-2 transition-colors bg-qatar-primary-600 hover:bg-qatar-primary-700 active:bg-qatar-primary-800"
                >
                    <span id="submit-text">Sign In</span>
                    <div id="loading-spinner" class="items-center justify-center hidden">
                        <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Signing in...
                    </div>
                </button>
            </form>

            <div class="mt-6 text-center">
                <p class="text-sm text-qatar-neutral-600">
                    Demo credentials: <span class="font-mono">admin@qatar.gov.qa / password123</span>
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div class="mt-8 text-center text-sm text-qatar-neutral-500">
            <p>
                By signing in, you agree to our
                <a href="#" class="text-qatar-primary-600 hover:text-qatar-primary-500 font-medium">
                    Terms of Service
                </a>
                and
                <a href="#" class="text-qatar-primary-600 hover:text-qatar-primary-500 font-medium">
                    Privacy Policy
                </a>
            </p>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('login-form');
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const togglePassword = document.getElementById('toggle-password');
            const eyeIcon = document.getElementById('eye-icon');
            const eyeOffIcon = document.getElementById('eye-off-icon');
            const submitBtn = document.getElementById('submit-btn');
            const submitText = document.getElementById('submit-text');
            const loadingSpinner = document.getElementById('loading-spinner');
            const errorMessage = document.getElementById('error-message');
            const errorText = document.getElementById('error-text');

            // Password visibility toggle
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);

                eyeIcon.classList.toggle('hidden');
                eyeOffIcon.classList.toggle('hidden');
            });

            // Form validation
            function validateEmail(email) {
                const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
                return re.test(email);
            }

            function showError(message) {
                errorText.textContent = message;
                errorMessage.classList.remove('hidden');
                errorMessage.classList.add('flex');
            }

            function hideError() {
                errorMessage.classList.add('hidden');
                errorMessage.classList.remove('flex');
            }

            function setLoading(loading) {
                if (loading) {
                    submitBtn.disabled = true;
                    submitBtn.classList.add('bg-qatar-neutral-400', 'cursor-not-allowed');
                    submitBtn.classList.remove('bg-qatar-primary-600', 'hover:bg-qatar-primary-700');
                    submitText.classList.add('hidden');
                    loadingSpinner.classList.remove('hidden');
                    loadingSpinner.classList.add('flex');
                } else {
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('bg-qatar-neutral-400', 'cursor-not-allowed');
                    submitBtn.classList.add('bg-qatar-primary-600', 'hover:bg-qatar-primary-700');
                    submitText.classList.remove('hidden');
                    loadingSpinner.classList.add('hidden');
                    loadingSpinner.classList.remove('flex');
                }
            }

            // Form submission
            form.addEventListener('submit', async function(e) {
                e.preventDefault();

                const email = emailInput.value.trim();
                const password = passwordInput.value.trim();

                hideError();

                // Validation
                if (!email) {
                    showError('Email is required');
                    return;
                }

                if (!validateEmail(email)) {
                    showError('Please enter a valid email address');
                    return;
                }

                if (!password) {
                    showError('Password is required');
                    return;
                }

                if (password.length < 8) {
                    showError('Password must be at least 8 characters');
                    return;
                }

                setLoading(true);

                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 2000));

                    // Simulate authentication
                    if (email === 'admin@qatar.gov.qa' && password === 'password123') {
                        alert('Login successful! Redirecting to dashboard...');
                        // In a real app: window.location.href = '/dashboard';
                    } else {
                        showError('Invalid email or password. Please try again.');
                    }
                } catch (error) {
                    showError('An error occurred. Please try again later.');
                } finally {
                    setLoading(false);
                }
            });
        });
    </script>
</body>
</html>`,
    },
    {
      language: 'typescript',
      filename: 'login-types.ts',
      code: `export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginLayoutProps {
  onSubmit: (data: LoginFormData) => Promise<void> | void;
  loading?: boolean;
  error?: string;
  title?: string;
  subtitle?: string;
  brandLogo?: string;
  showRememberMe?: boolean;
  showForgotPassword?: boolean;
  onForgotPassword?: () => void;
}

export interface LoginFormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export interface AuthenticationResult {
  success: boolean;
  token?: string;
  user?: UserProfile;
  error?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  permissions: string[];
}

export interface LoginValidationRules {
  email: {
    required: boolean;
    pattern: RegExp;
    message: string;
  };
  password: {
    required: boolean;
    minLength: number;
    pattern?: RegExp;
    message: string;
  };
}

export const DEFAULT_LOGIN_VALIDATION: LoginValidationRules = {
  email: {
    required: true,
    pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/,
    message: 'Please enter a valid email address'
  },
  password: {
    required: true,
    minLength: 8,
    message: 'Password must be at least 8 characters'
  }
};

export interface LoginPageConfig {
  title: string;
  subtitle: string;
  brandLogo?: string;
  backgroundImage?: string;
  allowRememberMe: boolean;
  allowForgotPassword: boolean;
  validationRules: LoginValidationRules;
  redirectUrl: string;
  demoCredentials?: {
    email: string;
    password: string;
  };
}

export const QATAR_GBA_LOGIN_CONFIG: LoginPageConfig = {
  title: "Welcome to Qatar GBA",
  subtitle: "Sign in to access your government services",
  allowRememberMe: true,
  allowForgotPassword: true,
  validationRules: DEFAULT_LOGIN_VALIDATION,
  redirectUrl: "/dashboard",
  demoCredentials: {
    email: "admin@qatar.gov.qa",
    password: "password123"
  }
}`,
    },
  ],
};
