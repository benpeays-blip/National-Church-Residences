import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Heart, 
  Play, 
  ArrowLeft,
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Shield,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { getAccentColor } from "@/components/ui/accent-card";
import ncrLogoIcon from "@assets/image_1766086607961.png";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type LoginStep = "select-role" | "login" | "register" | "verify-code";
type UserRole = "board_member" | "donor" | "data_ops" | null;

export default function Login() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<LoginStep>("select-role");
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    verificationCode: ""
  });
  const [error, setError] = useState("");
  const { toast } = useToast();

  const loginMutation = useMutation({
    mutationFn: async (data: { username: string; password: string; role: string }) => {
      const res = await apiRequest("POST", "/api/auth/login", data);
      return res.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("portalUser", JSON.stringify(data.user));
      localStorage.setItem("authToken", data.token);
      toast({
        title: "Welcome back!",
        description: `Logged in as ${data.user.firstName || data.user.username}`,
      });
      if (data.user.role === "donor") {
        setLocation("/donor-portal");
      } else if (data.user.role === "data_ops") {
        setLocation("/data-ops-portal");
      } else {
        setLocation("/");
      }
    },
    onError: (err: Error) => {
      setError(err.message || "Login failed. Please check your credentials.");
    }
  });

  const sendCodeMutation = useMutation({
    mutationFn: async (data: { 
      email: string; 
      role: string;
      firstName: string;
      lastName: string;
    }) => {
      const res = await apiRequest("POST", "/api/auth/send-verification", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Verification Code Sent",
        description: `A 6-digit code has been sent to ${formData.email}`,
      });
      setStep("verify-code");
      setError("");
    },
    onError: (err: Error) => {
      setError(err.message || "Failed to send verification code. Please try again.");
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (data: { 
      username: string; 
      email: string; 
      password: string; 
      role: string;
      firstName: string;
      lastName: string;
      verificationCode: string;
    }) => {
      const res = await apiRequest("POST", "/api/auth/register", data);
      return res.json();
    },
    onSuccess: (data) => {
      if (data.verificationStatus === "pending") {
        toast({
          title: "Registration Submitted",
          description: "Your account is pending verification. You'll be notified when approved.",
        });
        setStep("select-role");
      } else {
        localStorage.setItem("portalUser", JSON.stringify(data.user));
        localStorage.setItem("authToken", data.token);
        toast({
          title: "Account Created!",
          description: "Welcome to FundRazor",
        });
        setLocation("/");
      }
    },
    onError: (err: Error) => {
      setError(err.message || "Registration failed. Please try again.");
    }
  });

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep("login");
    setError("");
  };

  const handleBoardDemoAccess = () => {
    localStorage.setItem("portalUser", JSON.stringify({ 
      id: "demo", 
      username: "demo", 
      role: "demo",
      firstName: "Demo",
      lastName: "Board Member"
    }));
    localStorage.setItem("authToken", "demo-token");
    toast({
      title: "Board Demo Mode",
      description: "Exploring FundRazor as a board member",
    });
    setLocation("/");
  };

  const handleDonorDemoAccess = () => {
    localStorage.setItem("portalUser", JSON.stringify({ 
      id: "demo-donor", 
      username: "demo-donor", 
      role: "donor",
      firstName: "Demo",
      lastName: "Donor"
    }));
    localStorage.setItem("authToken", "demo-donor-token");
    toast({
      title: "Donor Demo Mode",
      description: "Exploring the donor portal",
    });
    setLocation("/donor-portal");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!formData.username || !formData.password) {
      setError("Please enter your username and password");
      return;
    }
    loginMutation.mutate({
      username: formData.username,
      password: formData.password,
      role: selectedRole || "donor"
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!formData.username || !formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    sendCodeMutation.mutate({
      email: formData.email,
      role: selectedRole || "donor",
      firstName: formData.firstName,
      lastName: formData.lastName
    });
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.verificationCode) {
      setError("Please enter the verification code sent to your email");
      return;
    }

    registerMutation.mutate({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: selectedRole || "donor",
      firstName: formData.firstName,
      lastName: formData.lastName,
      verificationCode: formData.verificationCode
    });
  };

  const handleBack = () => {
    if (step === "verify-code") {
      setStep("login");
      setFormData({ ...formData, verificationCode: "" });
      setError("");
      setIsLogin(false);
    } else if (step === "login" || step === "register") {
      setStep("select-role");
      setSelectedRole(null);
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        verificationCode: ""
      });
      setError("");
    }
  };

  const getRoleInfo = () => {
    if (selectedRole === "board_member") {
      return {
        title: "Board Member",
        icon: Users,
        color: getAccentColor("teal"),
        description: "Access board dashboards and prospect assignments"
      };
    }
    if (selectedRole === "data_ops") {
      return {
        title: "Data Operations",
        icon: Shield,
        color: getAccentColor("orange"),
        description: "Access data quality and maintenance tools"
      };
    }
    return {
      title: "Donor",
      icon: Heart,
      color: getAccentColor("coral"),
      description: "View your giving history and manage recurring gifts"
    };
  };

  const roleInfo = getRoleInfo();

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-xl">
        {step === "select-role" && (
          <div className="space-y-6">
            <div className="text-center space-y-3">
              <div className="flex flex-col items-center justify-center mb-6">
                <img src={ncrLogoIcon} alt="NCR Logo" className="h-28 w-auto" />
              </div>
              <p className="text-lg text-muted-foreground">
                Select your role to continue
              </p>
            </div>

            <div className="space-y-5">
              <Card 
                className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 border-2 hover:border-teal-400"
                onClick={() => handleRoleSelect("board_member")}
                data-testid="card-board-login"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-5">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${getAccentColor("teal")}20` }}
                    >
                      <Users className="h-10 w-10" style={{ color: getAccentColor("teal") }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-2xl">Board Member</h3>
                      <p className="text-base text-muted-foreground">
                        Access board dashboards and prospect assignments
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card 
                className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1 border-2 hover:border-coral-400"
                onClick={() => handleRoleSelect("donor")}
                data-testid="card-donor-login"
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-5">
                    <div 
                      className="w-20 h-20 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${getAccentColor("coral")}20` }}
                    >
                      <Heart className="h-10 w-10" style={{ color: getAccentColor("coral") }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-2xl">Donor</h3>
                      <p className="text-base text-muted-foreground">
                        View your giving history and manage recurring gifts
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-sm uppercase">
                  <span className="bg-background px-3 text-muted-foreground">
                    Or
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-20 text-base gap-3 flex-col py-3"
                  onClick={handleBoardDemoAccess}
                  data-testid="button-board-demo"
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${getAccentColor("teal")}20` }}
                  >
                    <Users className="h-5 w-5" style={{ color: getAccentColor("teal") }} />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">Board Demo</div>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-20 text-base gap-3 flex-col py-3"
                  onClick={handleDonorDemoAccess}
                  data-testid="button-donor-demo"
                >
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${getAccentColor("coral")}20` }}
                  >
                    <Heart className="h-5 w-5" style={{ color: getAccentColor("coral") }} />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold">Donor Demo</div>
                  </div>
                </Button>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground">
              By continuing, you agree to our Terms of Service and Privacy Policy
            </p>
          </div>
        )}

        {(step === "login" || step === "register") && (
          <div className="space-y-6">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleBack}
              className="mb-2"
              data-testid="button-back"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>

            <Card>
              <CardHeader className="text-center pb-2">
                <div className="flex justify-center mb-3">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${roleInfo.color}20` }}
                  >
                    <roleInfo.icon className="h-8 w-8" style={{ color: roleInfo.color }} />
                  </div>
                </div>
                <CardTitle className="text-xl">
                  {isLogin ? `${roleInfo.title} Login` : `Create ${roleInfo.title} Account`}
                </CardTitle>
                <CardDescription>
                  {isLogin ? "Enter your credentials to continue" : "Fill in your details to get started"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <form onSubmit={isLogin ? handleLogin : handleRegister} className="space-y-4">
                  {!isLogin && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          placeholder="John"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          data-testid="input-first-name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          placeholder="Doe"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          data-testid="input-last-name"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="username"
                        placeholder="Enter your username"
                        className="pl-10"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        data-testid="input-username"
                      />
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          data-testid="input-email"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className="pl-10 pr-10"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        data-testid="input-password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        data-testid="button-toggle-password"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type="password"
                          placeholder="Confirm your password"
                          className="pl-10"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                          data-testid="input-confirm-password"
                        />
                      </div>
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={loginMutation.isPending || sendCodeMutation.isPending}
                    style={{ backgroundColor: roleInfo.color }}
                    data-testid="button-submit"
                  >
                    {(loginMutation.isPending || sendCodeMutation.isPending) ? (
                      "Please wait..."
                    ) : isLogin ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Sign In
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4 mr-2" />
                        Send Verification Code
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLogin(!isLogin);
                      setError("");
                    }}
                    className="text-sm text-primary hover:underline"
                    data-testid="button-toggle-mode"
                  >
                    {isLogin 
                      ? "Don't have an account? Create one" 
                      : "Already have an account? Sign in"
                    }
                  </button>
                </div>

                {isLogin && (
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-sm text-muted-foreground hover:text-foreground"
                      data-testid="button-forgot-password"
                    >
                      Forgot your password?
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Verify Code */}
        {step === "verify-code" && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                className="shrink-0"
                data-testid="button-back-verify"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h2 className="text-xl font-semibold">Verify Your Email</h2>
                <p className="text-sm text-muted-foreground">
                  Enter the code sent to {formData.email}
                </p>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${roleInfo.color}20` }}
                  >
                    <Mail className="h-8 w-8" style={{ color: roleInfo.color }} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Check Your Inbox</CardTitle>
                    <CardDescription>
                      We sent a 6-digit verification code to your email
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {error && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-center gap-2 text-sm text-destructive">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                  </div>
                )}

                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="verificationCode">
                      Verification Code
                      <Badge variant="outline" className="ml-2 text-xs">Required</Badge>
                    </Label>
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="verificationCode"
                        placeholder="Enter 6-digit code"
                        className="pl-10 text-center text-lg tracking-widest"
                        maxLength={6}
                        value={formData.verificationCode}
                        onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value.replace(/\D/g, '') })}
                        data-testid="input-verification-code"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {selectedRole === "board_member" 
                        ? "Enter the code provided by your organization or sent to your email" 
                        : "Enter the code we sent to verify your email address"
                      }
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={registerMutation.isPending}
                    style={{ backgroundColor: roleInfo.color }}
                    data-testid="button-verify"
                  >
                    {registerMutation.isPending ? (
                      "Verifying..."
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Verify & Create Account
                      </>
                    )}
                  </Button>
                </form>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      sendCodeMutation.mutate({
                        email: formData.email,
                        role: selectedRole || "donor",
                        firstName: formData.firstName,
                        lastName: formData.lastName
                      });
                    }}
                    disabled={sendCodeMutation.isPending}
                    className="text-sm text-primary hover:underline disabled:opacity-50"
                    data-testid="button-resend-code"
                  >
                    {sendCodeMutation.isPending ? "Sending..." : "Didn't receive the code? Resend"}
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
