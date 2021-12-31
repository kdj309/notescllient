import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import NoteContext from './contexts/ExampleofContext/NoteContext';
import SignUp from './components/SignUp';
import Login from './components/Login';
function App() {
  return (
    <NoteContext>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <>
              <Navbar />
              <Home />
            </>
          } />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </NoteContext>

  );
}

export default App;
