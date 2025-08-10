
import { useState,useEffect} from 'react';
import { Link } from "@inertiajs/react";
import { useForm } from '@inertiajs/react';
import { Eye, EyeOff, Mail, Lock, User, CheckCircle, AlertCircle,    BookOpen,
    GraduationCap,
    Users,
    Laptop, } from 'lucide-react';


const SignupPage = () => {




  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const[isSubmitting, setIsSubmitting] = useState(false);



  const [strength, setStrength] = useState(0);





     const {data, setData, post, processing, errors } = useForm({
        fullname: '',
        email: '',
        password: '',
        password_confirmation: '',
        role: null,
    });
    useEffect(() => {
        let score = 0;
        if (data.password.length >= 8) score += 1;
        if (/[A-Z]/.test(data.password)) score += 1; // Has uppercase
        if (/[0-9]/.test(data.password)) score += 1; // Has numbers
        if (/[^A-Za-z0-9]/.test(data.password)) score += 1; // Has symbols
        setStrength(score);
      }, [data.password]);


      const getStrengthInfo = () => {
        if (strength === 1) return { label: 'Weak', color: 'bg-red-500' };
        if (strength === 2) return { label: 'Fair', color: 'bg-yellow-500' };
        if (strength === 3) return { label: 'Good', color: 'bg-lime-500' };
        if (strength === 4) return { label: 'Strong', color: 'bg-green-500' };
        return { label: '', color: 'bg-gray-200' };
      };


  function submit(e) {
    e.preventDefault()
    post('/register')

    setIsSubmitting(true);
    setTimeout(() => {
        setIsSubmitting(false);
    }, 1000)
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex w-full max-w-6xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">

                <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-soft-purple to-primary p-12">
                            <div className="relative w-full h-full flex flex-col items-center justify-center">
                                <div className="absolute inset-0 bg-pattern opacity-10"></div>

                                {/* Illustration container */}
                                <div className="relative z-10 w-full max-w-md mx-auto space-y-8">
                                    <div className="flex items-center justify-center space-x-6">
                                        <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                                            <BookOpen
                                                size={48}
                                                className="text-white"
                                            />
                                        </div>
                                        <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                                            <GraduationCap
                                                size={48}
                                                className="text-white"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center space-x-6">
                                        <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                                            <Users size={48} className="text-white" />
                                        </div>
                                        <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                                            <Laptop size={48} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="w-16 h-16 rounded-full bg-learnify-primary mx-auto flex items-center justify-center">
                                        {/* <span className="text-white font-bold text-2xl">L</span> */}
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
          <div className="w-16 h-16 rounded-full bg-learnify-primary mx-auto flex items-center justify-center">
            <span className="text-white font-bold text-2xl">L</span>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join Learnify today to start learning
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={submit}>
          <div className="space-y-4">

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  value={data.fullname}
                  onChange={e => setData('fullname', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-learnify-primary focus:border-learnify-primary"
                  placeholder="John Smith"

                />
              </div>

                {errors.fullname && (
                    <div className="text-red-500 text-sm mt-1">
                        {errors.fullname}
                        </div>
                )}

            </div>


            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                    value={data.email}
                    onChange={e=>setData('email', e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-learnify-primary focus:border-learnify-primary"
                  placeholder="you@example.com"

                />
              </div>
              {errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                        {errors.email}
                    </div>
                        )}
            </div>


            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                    value={data.password}
                    onChange={e=>setData('password', e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-learnify-primary focus:border-learnify-primary"
                  placeholder="••••••••"

                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <div className="text-red-500 text-sm mt-1">
                        {errors.password}
                    </div>
                        )}
              </div>

              {/* Password strength indicator */}
              {data.password && (
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <div className="flex space-x-1">
                      {[0, 1, 2, 3].map((index) => (
                        <div
                          key={index}
                          className={`h-2 w-6 rounded ${index < strength ? getStrengthInfo().color : 'bg-gray-200'}`}
                        ></div>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {strength > 0 ? getStrengthInfo().label : 'Enter a password'}
                    </span>
                  </div>
                </div>
              )}
            </div>


            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                    value={data.password_confirmation}
                    onChange={e=>setData('password_confirmation', e.target.value)}
                  className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-learnify-primary focus:border-learnify-primary"
                  placeholder="••••••••"

                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* User Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I want to join as a:
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  className={`border ${data.role === 'student' ? 'border-primary bg-soft-purple' : 'border-gray-200'} rounded-md p-3 cursor-pointer transition-colors hover:bg-learnify-softPurple`}
                  onClick={()=>setData({ ...data, role: 'student' })}

                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium ${data.role  === 'student' ? 'text-white' : ' text-black'}`}>Student</span>
                    {data.role === 'student' && (
                      <CheckCircle className={`h-5 w-5  ${data.role  === 'student' ? 'text-white' : ' text-black'}`} />
                    )}
                  </div>
                  <p className={`text-xs ${data.role  === 'student' ? 'text-white ' : '  text-gray-500'} `} >Take courses and learn new skills</p>
                </div>
                <div
                  className={`border ${data.role === 'teacher' ? 'border-primary bg-soft-purple' : 'border-gray-200'} rounded-md p-3 cursor-pointer transition-colors hover:bg-soft-purple`}
                  onClick={() => setData({ ...data, role: 'teacher' })}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium ${data.role  === 'teacher' ? 'text-white' : ' text-black'}`}>Teacher</span>
                    {data.role === 'teacher' && (
                      <CheckCircle className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <p className={`text-xs ${data.role  === 'teacher' ? 'text-white ' : '  text-gray-500'} `}>Create courses and teach students</p>
                </div>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={() => setAgreeToTerms(!agreeToTerms)}
                className="h-4 w-4 accent-primary  focus:ring-primary-500 focus:outline-none"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-primary hover:text-secondary">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:text-secondary">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Sign up'
              )}
            </button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary hover:textfy-secondary">
              Sign in
            </Link>
          </p>
        </div>
             </div>
            </div>

      </div>
    </div>
  );
};

export default SignupPage;
