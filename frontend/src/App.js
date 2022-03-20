import {BrowserRouter,Route, Routes} from 'react-router-dom';
import Home from './core/Home';
import ChangePassword from './user/ChangePassword';
import DeleteAccount from './user/DeleteAccount';
import Signin from './user/Signin';
import Signup from './user/Signup';
import ChangePicture from './user/ChangePicture';
import UserProfile from './user/UserProfile';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home/>}/>
      <Route path="/Signup" exact element={<Signup/>}/>
      <Route path="Signin" exact element={<Signin/>}/>
      <Route path='/Profile' exact element={<UserProfile/>}/>
      <Route path='/ChangePassword' exact element={<ChangePassword/>}/>
      <Route path='/ChangePicture' exact element={<ChangePicture/>}/>
      <Route path='/DeleteAccount' exact element={<DeleteAccount/>}/>
    </Routes>
    </BrowserRouter>

  );
}

export default App;
