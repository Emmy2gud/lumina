import { useState } from "react";
import { Link,useForm} from "@inertiajs/react";

import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    BookOpen,
    GraduationCap,
    Users,
    Laptop,
} from "lucide-react";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

     const {data, setData, post, processing, errors } = useForm({
          email:'',
        password: '',

    });
    function submit(e) {
        e.preventDefault()
        post('/login')

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
        }, 1000)
      }


    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8  ">
            <div className="flex w-full max-w-6xl mx-auto rounded-2xl shadow-xl overflow-hidden">
                <div className="hidden lg:block lg:w-1/2 bg-gradient-primary p-12">
                    <div className="relative w-full h-full flex flex-col items-center justify-center">
                        <div className="absolute inset-0 bg-pattern opacity-10"></div>

                        {/* Illustration container */}
                        <div className="relative z-10 w-full max-w-md mx-auto space-y-8">
                            <div className="flex items-center justify-center space-x-6">
                                <div className="p-4 bg-card/20 backdrop-blur-sm rounded-2xl">
                                    <BookOpen
                                        size={48}
                                        className="text-white"
                                    />
                                </div>
                                <div className="p-4 bg-card/20 backdrop-blur-sm rounded-2xl">
                                    <GraduationCap
                                        size={48}
                                        className="text-white"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-center space-x-6">
                                <div className="p-4 bg-card/20 backdrop-blur-sm rounded-2xl">
                                    <Users size={48} className="text-white" />
                                </div>
                                <div className="p-4 bg-card/20 backdrop-blur-sm rounded-2xl">
                                    <Laptop size={48} className="text-white" />
                                </div>
                            </div>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 rounded-lg bg-primary-700 mx-auto flex items-center justify-center mt-2">
                                <span className="text-white font-bold text-2xl ">L</span>
                            </div>
                            <h2 className="mt-6 text-3xl font-bold text-white">
                                Welcome back!
                            </h2>

                            <p className="mt-4 text-lg text-white/90">
                                Continue your learning journey with thousands of
                                courses at your fingertips.
                            </p>
                        </div>
                    </div>
                </div>


        <div className="w-full lg:w-1/2 py-8 px-12">
          <div className="max-w-md mx-auto space-y-8">
            <div className="text-center">
                                      <div className="w-16 h-16 rounded-lg bg-primary-700 mx-auto flex items-center justify-center mt-2">
                                <span className="text-white font-bold text-2xl ">L</span>
                            </div>
              <h2 className="mt-6 text-3xl font-bold text-text-primary">Sign in to Learnify</h2>
              <p className="mt-2 text-sm text-text-secondary">
                Or{' '}
                <Link to="/signup" className="font-medium text-primary hover:text-secondary">
                  create a new account
                </Link>
              </p>
            </div>

            {error && (
              <div className="bg-card-danger border border-danger text-danger px-4 py-3 rounded-md text-sm">
                {error}
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={submit}>
              {/* Email field */}
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-text-muted" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={data.email}
                      onChange={(e) => setData('email',e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-border-medium rounded-md shadow-sm placeholder-text-muted focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="you@example.com"

                    />
                  </div>
                  {errors.email && (
                    <div className="text-danger text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>


                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-text-muted" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={data.password}
                      onChange={(e) => setData('password',e.target.value)}
                      className="block w-full pl-10 pr-10 py-2 border border-border-medium rounded-md shadow-sm placeholder-text-muted focus:outline-none focus:ring-primary focus:border-primary"
                      placeholder="••••••••"

                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-text-muted hover:text-text-secondary focus:outline-none"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <div className="text-danger text-sm mt-1">
                        {errors.password}
                      </div>
                    )}

                  </div>
                </div>
              </div>

              {/* Remember me and Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
               className="h-4 w-4 text-primary focus:ring-primary focus:outline-none"
               required
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-text-secondary">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary hover:text-secondary">
                    Forgot your password?
                  </a>
                </div>
              </div>


              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>
            </form>
            </div>
            </div>
            </div>
        </div>
    );
};

export default LoginPage;
