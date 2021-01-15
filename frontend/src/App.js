import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import Navbar from './components/layout/navbar.component';
import Register from './components/layout/register.component'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Register />
    </div>
  );
}

export default App;
