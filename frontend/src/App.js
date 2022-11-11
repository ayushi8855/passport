import logo from './logo.svg';
import './App.css';
import { Login, SignIn } from './components/login';
import { SignUp } from './components/register';

function App() {
  return (
    <div className="App">
<SignIn/>
<SignUp/>
    </div>
  );
}

export default App;
