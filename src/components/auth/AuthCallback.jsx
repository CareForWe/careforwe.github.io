import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session from the URL hash
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          navigate('/signin');
          return;
        }

        if (session) {
          // Successfully authenticated, redirect to videos page
          navigate('/videos');
        } else {
          // No session, redirect to sign in
          navigate('/signin');
        }
      } catch (error) {
        console.error('Error in auth callback:', error);
        navigate('/signin');
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>Completing sign in...</div>
    </div>
  );
};

export default AuthCallback;

