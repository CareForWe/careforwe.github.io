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
          // Fetch role to determine redirect destination
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .maybeSingle();

          const userRole = roleData?.role === 'ADMIN' ? 'ADMIN' : 'USER';
          navigate(userRole === 'ADMIN' ? '/admin' : '/videos');
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
