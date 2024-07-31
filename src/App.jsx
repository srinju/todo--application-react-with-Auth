import React, { Suspense, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes , Route, useNavigate, useLocation , Navigate } from 'react-router-dom'
import { AuthProvider,useAuth } from './context/Authcontext';
import Home from './components/Home';

const SignUp = React.lazy(() => import('./components/signup'));
const Login = React.lazy(() => import('./components/login'));
const HomePage = React.lazy(() => import('./components/Home'));

function ProtectedRoute({children}) {
  const {token} = useAuth();
  return token ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<SignUpOrLogin />} />
          <Route path='/signup' element={<Suspense fallback={"loading..."}><SignUp /></Suspense>} />
          <Route path='/login' element={<Suspense fallback={"loading..."}><Login /></Suspense>} />
          <Route path='/home' element={
            <ProtectedRoute>
              <Suspense fallback={"loading..."}><HomePage /></Suspense>
            </ProtectedRoute>
          } />
        </Routes>
     </AuthProvider>
    </BrowserRouter>
    
  )
}

function SignUpOrLogin() {
  const {token} = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' && !token && (
        <div>
          <button onClick={() => navigate('/signup')}>SignUp</button>
          <button onClick={() => navigate('/login')}>Login</button>
        </div>
      )}
    </>
  )
}

export default App;
