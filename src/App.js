import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// Pagea and Components
import Content from './pages/Content';
import Navbar from './components/Navbar';
import UpdateCredits from './pages/UpdateCredits';
// import Signup from './pages/Signup';
import Login from './pages/Login';


function App() {
  const { user } = useAuthContext();

  return (
      <div className="App">
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route 
            path="/"
            element={<Content />}
            /> 
            <Route 
            path="/login"
            element={<Login />}
            />
            {/* <Route 
            path="/content"
            element={user ? <UpdateCredits /> : <Navigate to="/login" />}
            /> 
             <Route 
            path="/login"
            element={!user ? <Login /> : <Navigate to="/content" />}
            />  */}
            {/* <Route 
            path="/signup"
            element={<Signup />}
            />  */}
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
