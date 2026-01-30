"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import axios from "axios";

export const ResetPassword = () => {
   
   const params=useSearchParams()
   const token=params.get("token")
  const router=useRouter()
  

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: "" });

  const calculatePasswordStrength = (pwd:string) => {
    let score = 0;
    let feedback = "";

    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score += 1;
    if (/\d/.test(pwd)) score += 1;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1;

    if (score <= 2) {
      feedback = "Weak password";
    } else if (score === 3) {
      feedback = "Fair password";
    } else if (score === 4) {
      feedback = "Good password";
    } else {
      feedback = "Strong password";
    }

    return { score, feedback };
  };

  const handlePasswordChange = (value:string) => {
    setPassword(value);
    setPasswordStrength(calculatePasswordStrength(value));
  };

  const validatePasswords = () => {
    if (!password || !confirmPassword) {
      setError("Please fill in all fields");
      return false;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
      try {
        setError("")
         setIsSubmitting(true);
        const res= await axios.post(`/controller/passwordupdater?token=${token}`,{  
         password:password,
        })
        console.log(res)
        setIsSubmitting(false);
        setIsSuccess(true);
        setTimeout(() => {
           router.push("/login")
        }, 3000);

      } catch (error:any) {
         console.log(error)
         setError(error.response.data.message)
         setIsSubmitting(false)
      }
    }

    

   

  const getStrengthColor = (score:number) => {
    if (score <= 2) return "bg-red-500";
    if (score === 3) return "bg-yellow-500";
    if (score === 4) return "bg-blue-500";
    return "bg-green-500";
  };

  const getStrengthTextColor = (score:number) => {
    if (score <= 2) return "text-red-600";
    if (score === 3) return "text-yellow-600";
    if (score === 4) return "text-blue-600";
    return "text-green-600";
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-green-50 via-white to-blue-50">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm" data-testid="success-card">
          <CardHeader className="text-center space-y-4 pb-8">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-green-600" data-testid="success-icon" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900">Password reset successful!</CardTitle>
              <CardDescription className="text-base mt-2 text-gray-600">
                Your password has been successfully reset. You can now log in with your new password.
              </CardDescription>
            </div>
          </CardHeader>
          <CardFooter>
            <Link href="/login" className="w-full">
              <Button className="w-full h-11 bg-green-600 hover:bg-green-700" data-testid="go-to-login-button">
                Go to login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm" data-testid="reset-password-card">
        <CardHeader className="space-y-2 text-center pb-6">
          <CardTitle className="text-3xl font-bold text-gray-900">Set new password</CardTitle>
          <CardDescription className="text-base text-gray-600">
            Your new password must be different from previously used passwords.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            {error && (
              <Alert variant="destructive" data-testid="error-alert">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                New password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  data-testid="password-input"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  className="pl-10 pr-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  data-testid="toggle-password-visibility"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              
              {password && (
                <div className="space-y-1" data-testid="password-strength-indicator">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          level <= passwordStrength.score ? getStrengthColor(passwordStrength.score) : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-xs font-medium ${getStrengthTextColor(passwordStrength.score)}`}>
                    {passwordStrength.feedback}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                Confirm password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  data-testid="confirm-password-input"
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 h-11 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  data-testid="toggle-confirm-password-visibility"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-xs text-gray-700 font-medium mb-1">Password requirements:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-center gap-2">
                  <span className={password.length >= 8 ? "text-green-600" : "text-gray-400"}>•</span>
                  At least 8 characters
                </li>
                <li className="flex items-center gap-2">
                  <span className={/[a-z]/.test(password) && /[A-Z]/.test(password) ? "text-green-600" : "text-gray-400"}>•</span>
                  Both uppercase and lowercase letters
                </li>
                <li className="flex items-center gap-2">
                  <span className={/\d/.test(password) ? "text-green-600" : "text-gray-400"}>•</span>
                  At least one number
                </li>
              </ul>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-3">
            <Button
              data-testid="submit-button"
              type="submit"
              className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="animate-spin mr-2">⏳</span>
                  Resetting...
                </>
              ) : (
                "Reset password"
              )}
            </Button>
            <Link href="/login" className="w-full">
              <Button variant="ghost" className="w-full" data-testid="cancel-button">
                Cancel
              </Button>
            </Link>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default ResetPassword;
