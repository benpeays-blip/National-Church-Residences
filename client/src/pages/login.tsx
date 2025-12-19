import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Play, 
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  AlertCircle,
  LogIn,
  UserPlus
} from "lucide-react";
import { getAccentColor } from "@/components/ui/accent-card";
import ncrLogoIcon from "@assets/image_1766086607961.png";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

type AuthMode = "login" | "register";

export default function Login() {
  const [, setLocation] = useLocation();
  const [mode, setMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  });
  const [error, setError] = useState("");
  const { toast } = useToast();

  const accentColor = getAccentColor("teal");

  const loginMutation = useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await apiRequest("POST", "/api/auth/login", { ...data, role: "ncr_staff" });
      return res.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("portalUser", JSON.stringify(data.user));
      localStorage.setItem("authToken", data.token);
      toast({
        title: "Welcome back!",
        description: `Logged in as ${data.user.firstName || data.user.username}`,
      });
      setLocation("/");
    },
    onError: (err: Error) => {
      setError(err.message || "Login failed. Please check your credentials.");
    }
  });

  const registerMutation = useMutation({
    mutationFn: async (data: { 
      username: string; 
      email: string; 
      password: string; 
      firstName: string;
      lastName: string;
    }) => {
      const res = await apiRequest("POST", "/api/auth/register", { ...data, role: "ncr_staff" });
      return res.json();
    },
    onSuccess: (data) => {
      localStorage.setItem("portalUser", JSON.stringify(data.user));
      localStorage.setItem("authToken", data.token);
      toast({
        title: "Account Created!",
        description: "Welcome to FundRazor",
      });
      setLocation("/");
    },
    onError: (err: Error) => {
      setError(err.message || "Registration failed. Please try again.");
    }
  });

  const handleDemoAccess = () => {
    localStorage.setItem("portalUser", JSON.stringify({ 
      id: "demo", 
      username: "demo", 
      role: "demo",
      firstName: "Demo",
      lastName: "User"
    }));
    localStorage.setItem("authToken", "demo-token");
    toast({
      title: "Demo Mode",
      description: "Exploring FundRazor in demo mode",
    });
    setLocation("/");
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
    });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!formData.username || !formData.email || !formData.password || !formData.firstName || !formData.lastName) {
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

    registerMutation.mutate({
      username: formData.username,
      email: formData.email,
      password: formData.password,
      firstName: formData.firstName,
      lastName: formData.lastName,
    });
  };

  const resetForm = () => {
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
    });
    setError("");
  };

  const toggleMode = () => {
    resetForm();
    setMode(mode === "login" ? "register" : "login");
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md">
        <div className="space-y-6">
          {/* Logo and Title */}
          <div className="text-center space-y-3">
            <div className="flex flex-col items-center justify-center mb-4">
              <img src={ncrLogoIcon} alt="NCR Logo" className="h-24 w-auto" />
            </div>
            <h1 className="text-2xl font-bold">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-muted-foreground">
              {mode === "login" 
                ? "Sign in to access your NCR Staff account" 
                : "Register for a new NCR Staff account"}
            </p>
          </div>

          {/* Login/Register Card */}
          <Card className="border-2">
            <CardContent className="pt-6">
              <form onSubmit={mode === "login" ? handleLogin : handleRegister} className="space-y-4">
                {/* Error Display */}
                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Registration-only fields */}
                {mode === "register" && (
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

                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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

                {/* Email (register only) */}
                {mode === "register" && (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        data-testid="input-email"
                      />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      data-testid="button-toggle-password"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password (register only) */}
                {mode === "register" && (
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        className="pl-10"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        data-testid="input-confirm-password"
                      />
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full gap-2"
                  style={{ backgroundColor: accentColor }}
                  disabled={loginMutation.isPending || registerMutation.isPending}
                  data-testid={mode === "login" ? "button-login" : "button-register"}
                >
                  {mode === "login" ? (
                    <>
                      <LogIn className="w-4 h-4" />
                      {loginMutation.isPending ? "Signing in..." : "Sign In"}
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      {registerMutation.isPending ? "Creating account..." : "Create Account"}
                    </>
                  )}
                </Button>
              </form>

              {/* Toggle Mode */}
              <div className="mt-4 text-center">
                <p className="text-sm text-muted-foreground">
                  {mode === "login" ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    className="ml-1 font-medium hover:underline"
                    style={{ color: accentColor }}
                    onClick={toggleMode}
                    data-testid="button-toggle-mode"
                  >
                    {mode === "login" ? "Create one" : "Sign in"}
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Demo Access */}
          <div className="space-y-3">
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

            <Button 
              variant="outline" 
              className="w-full h-14 text-base gap-3"
              onClick={handleDemoAccess}
              data-testid="button-demo-access"
            >
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${getAccentColor("sky")}20` }}
              >
                <Play className="h-5 w-5" style={{ color: getAccentColor("sky") }} />
              </div>
              <div className="text-left">
                <div className="font-semibold">Try Demo Mode</div>
                <div className="text-xs text-muted-foreground">Explore without an account</div>
              </div>
            </Button>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
