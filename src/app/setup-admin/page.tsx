"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SetupAdminPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "info">("info");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [emailErrors, setEmailErrors] = useState<string[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const validateEmail = (email: string): string[] => {
    const errors: string[] = [];
    
    // Basic format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Invalid email format");
    }
    
    // Check for minimum length
    if (email.length < 5) {
      errors.push("Email too short");
    }
    
    // Check for maximum length
    if (email.length > 254) {
      errors.push("Email too long");
    }
    
    // Check for common disposable email domains
    const disposableDomains = [
      'tempmail.org', 'guerrillamail.com', 'mailinator.com', '10minutemail.com',
      'throwaway.email', 'temp-mail.org', 'sharklasers.com', 'getairmail.com'
    ];
    
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain && disposableDomains.includes(domain)) {
      errors.push("Disposable email not allowed");
    }
    
    // Check for suspicious patterns
    if (email.includes('..') || email.includes('--') || email.includes('__')) {
      errors.push("Suspicious email pattern");
    }
    
    return errors;
  };

  const validatePassword = (password: string): string[] => {
    const errors: string[] = [];
    
    if (password.length < 8) {
      errors.push("At least 8 characters");
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push("One uppercase letter");
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push("One lowercase letter");
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push("One number");
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push("One special character");
    }
    
    // Check for common weak patterns
    const weakPatterns = [
      'password', '123456', 'qwerty', 'abc123', 'password123',
      'admin', 'user', 'test', 'guest', 'welcome'
    ];
    
    const lowerPassword = password.toLowerCase();
    if (weakPatterns.some(pattern => lowerPassword.includes(pattern))) {
      errors.push("No common patterns");
    }
    
    // Check for repeated characters
    if (/(.)\1{2,}/.test(password)) {
      errors.push("No repeated characters");
    }
    
    // Check for sequential characters
    if (/abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/i.test(password)) {
      errors.push("No sequential characters");
    }
    
    return errors;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      password: value,
    });
    
    if (value.length > 0) {
      const errors = validatePassword(value);
      setPasswordErrors(errors);
    } else {
      setPasswordErrors([]);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      email: value,
    });
    
    if (value.length > 0) {
      const errors = validateEmail(value);
      setEmailErrors(errors);
    } else {
      setEmailErrors([]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear password errors when user starts typing
    if (name === "password") {
      setPasswordErrors([]);
    }
    
    // Clear email errors when user starts typing
    if (name === "email") {
      setEmailErrors([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Email validation
    const finalEmailErrors = validateEmail(formData.email);
    if (finalEmailErrors.length > 0) {
      setMessage("Email does not meet requirements");
      setEmailErrors(finalEmailErrors);
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setMessage("Password must be at least 8 characters long");
      setMessageType("error");
      setLoading(false);
      return;
    }

    // Final password validation
    const finalPasswordErrors = validatePassword(formData.password);
    if (finalPasswordErrors.length > 0) {
      setMessage("Password does not meet security requirements");
      setPasswordErrors(finalPasswordErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/setup-admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Initial admin account created successfully! You can now login with this account.");
        setMessageType("success");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setPasswordErrors([]);
        setEmailErrors([]);
        
        // Redirect to login after a short delay
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      } else {
        if (data.passwordErrors) {
          setPasswordErrors(data.passwordErrors);
          setMessage("Password does not meet security requirements");
        } else {
          setMessage(data.message || "Failed to create admin account");
        }
        setMessageType("error");
      }
    } catch (error) {
      setMessage("An error occurred while creating the admin account");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (formData.password.length === 0) return "bg-gray-200";
    if (passwordErrors.length === 0) return "bg-green-500";
    if (passwordErrors.length <= 3) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Setup Initial Admin Account
          </h1>
          <p className="text-gray-600 text-sm">
            This page is only accessible when no admin accounts exist in the system.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleEmailChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Email Requirements */}
          {formData.email.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Email Requirements:</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { label: "Valid email format", met: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) },
                  { label: "Minimum 5 characters", met: formData.email.length >= 5 },
                  { label: "Maximum 254 characters", met: formData.email.length <= 254 },
                  { label: "Not a disposable email", met: !['tempmail.org', 'guerrillamail.com', 'mailinator.com', '10minutemail.com', 'throwaway.email', 'temp-mail.org', 'sharklasers.com', 'getairmail.com'].includes(formData.email.split('@')[1]?.toLowerCase() || '') },
                  { label: "No suspicious patterns", met: !formData.email.includes('..') && !formData.email.includes('--') && !formData.email.includes('__') },
                ].map((requirement, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className={`w-4 h-4 rounded-full mr-2 flex-shrink-0 ${
                      requirement.met ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {requirement.met && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={requirement.met ? 'text-green-700' : 'text-gray-500'}>
                      {requirement.label}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Email Status Indicator */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Email status:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    emailErrors.length === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {emailErrors.length === 0 ? 'Valid' : 'Invalid'}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handlePasswordChange}
                required
                minLength={8}
                className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={8}
                className="mt-1 block w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          {formData.password.length > 0 && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Password Requirements:</h3>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { label: "At least 8 characters", met: formData.password.length >= 8 },
                  { label: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
                  { label: "One lowercase letter", met: /[a-z]/.test(formData.password) },
                  { label: "One number", met: /[0-9]/.test(formData.password) },
                  { label: "One special character", met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(formData.password) },
                ].map((requirement, index) => (
                  <div key={index} className="flex items-center text-sm">
                    <div className={`w-4 h-4 rounded-full mr-2 flex-shrink-0 ${
                      requirement.met ? 'bg-green-500' : 'bg-gray-300'
                    }`}>
                      {requirement.met && (
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className={requirement.met ? 'text-green-700' : 'text-gray-500'}>
                      {requirement.label}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Password Strength Indicator */}
              <div className="mt-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Password strength:</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    passwordErrors.length === 0 ? 'bg-green-100 text-green-800' :
                    passwordErrors.length <= 3 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {passwordErrors.length === 0 ? 'Strong' :
                     passwordErrors.length <= 3 ? 'Medium' : 'Weak'}
                  </span>
                </div>
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`} 
                       style={{ width: `${Math.max(0, 100 - (passwordErrors.length * 20))}%` }}>
                  </div>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || passwordErrors.length > 0 || emailErrors.length > 0}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating..." : "Create Initial Admin Account"}
          </button>
        </form>

        {message && (
          <div className={`mt-4 p-3 rounded-md ${
            messageType === "success" 
              ? "bg-green-50 text-green-800 border border-green-200" 
              : messageType === "error"
              ? "bg-red-50 text-red-800 border border-red-200"
              : "bg-blue-50 text-blue-800 border border-blue-200"
          }`}>
            {message}
          </div>
        )}

        {emailErrors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-4">
            <h4 className="text-sm font-medium text-red-800 mb-2">Email issues:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              {emailErrors.map((error, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {passwordErrors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 mt-4">
            <h4 className="text-sm font-medium text-red-800 mb-2">Password issues:</h4>
            <ul className="text-sm text-red-700 space-y-1">
              {passwordErrors.map((error, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-red-500 mr-2">•</span>
                  {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-500 text-sm"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 