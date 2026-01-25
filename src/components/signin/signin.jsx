import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"
import doctor_img from "../../assets/doctor.png"
import basic_img from "../../assets/basic.png"
import cancer_img from "../../assets/cancer.png"
import Popup from '../util/popup';
import { Form, Separator } from "radix-ui";
//import { Label, Separator, Button, TextField} from "@radix-ui/themes";
import { supabase } from '../../supabaseClient';
import styles from './signin.module.css';
import logo_nav from "../../assets/cfw_index.png"



// Sign In page to access content from the repo
const SignIn = () => {
  // #region agent log - global error handler
  useEffect(() => {
    const handleError = (event) => {
      if (event.error && event.error.message && event.error.message.includes('setCustomValidity')) {
        fetch('http://127.0.0.1:7242/ingest/aa1cf69e-d965-4793-a4b9-1bcb6aca8cf4', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'signin.jsx:useEffect', message: 'Global error caught - setCustomValidity', data: { errorMessage: event.error.message, errorStack: event.error.stack?.substring(0, 300) }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'post-fix', hypothesisId: 'A' }) }).catch(() => { });
      }
    };
    const handleUnhandledRejection = (event) => {
      if (event.reason && event.reason.message && event.reason.message.includes('setCustomValidity')) {
        fetch('http://127.0.0.1:7242/ingest/aa1cf69e-d965-4793-a4b9-1bcb6aca8cf4', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'signin.jsx:useEffect', message: 'Unhandled promise rejection - setCustomValidity', data: { errorMessage: event.reason.message, errorStack: event.reason.stack?.substring(0, 300) }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'post-fix', hypothesisId: 'A' }) }).catch(() => { });
      }
    };
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);
  // #endregion

  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Password validation
  const [password, setPassword] = useState('');
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false
  });

  const validatePassword = (pwd) => {
    setPasswordValidation({
      minLength: pwd.length >= 8,
      hasUppercase: /[A-Z]/.test(pwd),
      hasLowercase: /[a-z]/.test(pwd),
      hasNumber: /[0-9]/.test(pwd)
    });
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    if (isSignUp) {
      validatePassword(pwd);
    }
  };

  const isPasswordValid = () => {
    return passwordValidation.minLength &&
      passwordValidation.hasUppercase &&
      passwordValidation.hasLowercase &&
      passwordValidation.hasNumber;
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) throw error;
      setMessage('Redirecting to Google...');
    } catch (error) {
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/aa1cf69e-d965-4793-a4b9-1bcb6aca8cf4', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'signin.jsx:76', message: 'handleSubmit called', data: { isSignUp, passwordLength: password.length, isPasswordValid: isPasswordValid() }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A,B,C' }) }).catch(() => { });
    // #endregion

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email');
      const password = formData.get('password');
      const firstName = formData.get('firstName');
      const lastName = formData.get('lastName');
  
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/aa1cf69e-d965-4793-a4b9-1bcb6aca8cf4', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'signin.jsx:85', message: 'FormData extracted', data: { email: email ? email.substring(0, 5) + '...' : 'null', passwordLength: password ? password.length : 0, firstName: firstName || 'null', lastName: lastName || 'null' }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A,B,C' }) }).catch(() => { });
      // #endregion
  
      setLoading(true);
      setMessage('');

      if (isSignUp) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/aa1cf69e-d965-4793-a4b9-1bcb6aca8cf4', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'signin.jsx:90', message: 'Checking password validity', data: { isPasswordValid: isPasswordValid(), passwordValidation }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A,B,C' }) }).catch(() => { });
        // #endregion
        if (!isPasswordValid()) {
          throw new Error('Password does not meet security requirements. Password must be more than 8 characters with uppercase and lowercase characters and at least one number.');
        }

        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: firstName?.trim(),
              last_name: lastName?.trim()
            }
          } //Extra user metadata
        });

        if (error)
          throw error;
        console.log(data)
        setMessage('Account created! Check your email to verify your account.');
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });

        if (error) throw error;
        setMessage('Successfully signed in!');
      }
    } catch (error) {
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/aa1cf69e-d965-4793-a4b9-1bcb6aca8cf4', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'signin.jsx:128', message: 'Error caught in handleSubmit', data: { errorMessage: error.message, errorName: error.name, errorStack: error.stack?.substring(0, 200) }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'run1', hypothesisId: 'A,B,C,D' }) }).catch(() => { });
      // #endregion
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <img className={styles.logo} src={logo_nav} />
        </div>

        {/* Auth Card */}
        <div className={styles.card}>
          <h1 className={styles.title}>
            {isSignUp ? 'Create Your CareForWe Account' : 'Sign In to CareForWe'}
          </h1>
          <p className={styles.subtitle}>
            {isSignUp ? 'Fill in your details to get started' : 'Welcome back! Please enter your details'}
          </p>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className={styles.googleButton}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4" />
              <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853" />
              <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05" />
              <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335" />
            </svg>
            <span>Continue with Google</span>
          </button>

          {/* Separator */}
          <div className={styles.separator}>
            <Separator.Root className={styles.separatorLine} />
            <span className={styles.separatorText}>OR</span>
            <Separator.Root className={styles.separatorLine} />
          </div>

          {/* Form */}
          <Form.Root className={styles.formRoot} onSubmit={handleSubmit}>
            {/* Name Fields - Only for Sign Up */}
            {isSignUp && (
              <div className={styles.nameFields}>
                <Form.Field className={styles.formField} name="firstName">
                  <div className={styles.fieldHeader}>
                    <Form.Label className={styles.label}>First Name *</Form.Label>
                    <Form.Message className={styles.errorMessage} match="valueMissing">
                      Required
                    </Form.Message>
                  </div>
                  <Form.Control asChild>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="John"
                      required
                      disabled={loading}
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Field className={styles.formField} name="lastName">
                  <div className={styles.fieldHeader}>
                    <Form.Label className={styles.label}>Last Name *</Form.Label>
                    <Form.Message className={styles.errorMessage} match="valueMissing">
                      Required
                    </Form.Message>
                  </div>
                  <Form.Control asChild>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Doe"
                      required
                      disabled={loading}
                    />
                  </Form.Control>
                </Form.Field>
              </div>
            )}

            {/* Email Field */}
            <Form.Field className={styles.xformField} name="email">
              <div className={styles.fieldHeader}>
                <Form.Label className={styles.label}>Email Address *</Form.Label>
                <Form.Message className={styles.errorMessage} match="valueMissing">
                  Please enter your email
                </Form.Message>
                <Form.Message className={styles.errorMessage} match="typeMismatch">
                  Please provide a valid email
                </Form.Message>
              </div>
              <Form.Control asChild>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="you@example.com"
                  required
                  disabled={loading}
                />
              </Form.Control>
            </Form.Field>

            {/* Password Field */}
            <Form.Field className={styles.formField} name="password">
              <div className={styles.fieldHeader}>
                <Form.Label className={styles.label}>Password *</Form.Label>
                <Form.Message className={styles.errorMessage} match="valueMissing">
                  Please enter your password
                </Form.Message>
                {isSignUp && (
                  <Form.Message
                    className={styles.errorMessage}
                    match={(value) => {
                      // #region agent log
                      fetch('http://127.0.0.1:7242/ingest/aa1cf69e-d965-4793-a4b9-1bcb6aca8cf4', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'signin.jsx:252', message: 'Form.Message match function called', data: { value: value ? value.substring(0, 3) + '...' : 'null', isPasswordValid: isPasswordValid() }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'post-fix', hypothesisId: 'B,C,D' }) }).catch(() => { });
                      // #endregion
                      return !isPasswordValid();
                    }}
                    forceMatch={password && !isPasswordValid()}
                  >
                    Password requirements not met
                  </Form.Message>
                )}
              </div>
              <div className={styles.passwordWrapper}>
                <Form.Control asChild>
                  <input
                    className={styles.input}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                    onChange={handlePasswordChange}
                    value={password}
                    ref={(el) => {
                      // #region agent log
                      if (el) {
                        fetch('http://127.0.0.1:7242/ingest/aa1cf69e-d965-4793-a4b9-1bcb6aca8cf4', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'signin.jsx:275', message: 'Form.Control input ref attached (post-fix)', data: { tagName: el.tagName, hasSetCustomValidity: typeof el.setCustomValidity === 'function', type: el.type }, timestamp: Date.now(), sessionId: 'debug-session', runId: 'post-fix', hypothesisId: 'A,E' }) }).catch(() => { });
                      }
                      // #endregion
                    }}
                  />
                </Form.Control>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.passwordToggle}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2.5 10s3-6 7.5-6 7.5 6 7.5 6-3 6-7.5 6-7.5-6-7.5-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M3 3l14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M2.5 10s3-6 7.5-6 7.5 6 7.5 6-3 6-7.5 6-7.5-6-7.5-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="10" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  )}
                </button>
              </div>
            </Form.Field>

            {/* Password Requirements - Only show during sign up */}
            {isSignUp && password && (
              <div className={styles.passwordRequirements}>
                <p className={styles.requirementsTitle}>Password must contain:</p>
                <div className={styles.requirementsList}>
                  <div className={styles.requirement}>
                    <div className={`${styles.requirementIcon} ${passwordValidation.minLength ? styles.valid : ''}`}>
                      {passwordValidation.minLength && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className={passwordValidation.minLength ? styles.validText : ''}>
                      At least 8 characters
                    </span>
                  </div>
                  <div className={styles.requirement}>
                    <div className={`${styles.requirementIcon} ${passwordValidation.hasUppercase ? styles.valid : ''}`}>
                      {passwordValidation.hasUppercase && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className={passwordValidation.hasUppercase ? styles.validText : ''}>
                      One uppercase letter
                    </span>
                  </div>
                  <div className={styles.requirement}>
                    <div className={`${styles.requirementIcon} ${passwordValidation.hasLowercase ? styles.valid : ''}`}>
                      {passwordValidation.hasLowercase && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className={passwordValidation.hasLowercase ? styles.validText : ''}>
                      One lowercase letter
                    </span>
                  </div>
                  <div className={styles.requirement}>
                    <div className={`${styles.requirementIcon} ${passwordValidation.hasNumber ? styles.valid : ''}`}>
                      {passwordValidation.hasNumber && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className={passwordValidation.hasNumber ? styles.validText : ''}>
                      One number
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Forgot Password - Only show on sign in */}
            {!isSignUp && (
              <div className={styles.forgotPassword}>
                <button type="button" className={styles.forgotPasswordLink}>
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Form.Submit asChild>
              <button
                className={styles.submitButton}
                disabled={loading}
              >
                {loading ? 'Please wait...' : (isSignUp ? 'Create Account' : 'Sign In')}
              </button>
            </Form.Submit>
          </Form.Root>

          {/* Message Display */}
          {message && (
            <div className={`${styles.message} ${message.includes('Error') ? styles.error : styles.success}`}>
              {message}
            </div>
          )}

          {/* Toggle Sign Up / Sign In */}
          <div className={styles.toggle}>
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setMessage('');
                setPassword('');
              }}
              className={styles.toggleButton}
            >
              {isSignUp ? (
                <>Already have an account? <span className={styles.toggleLink}>Sign in</span></>
              ) : (
                <>Don't have an account? <span className={styles.toggleLink}>Sign up</span></>
              )}
            </button>
          </div>

          {/* Info Text */}
          <p className={styles.info}>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;