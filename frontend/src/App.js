import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

import Navbar from './components/layout/navbar.component';
import Register from './components/layout/register.component';
import Login from './components/layout/login.component';
import RecruiterDetails from './components/layout/recruiter.details';
import ApplicantDetails from './components/layout/applicant.details';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/recruiter" component={RecruiterDetails} />
        <Route exact path="/applicant" component={ApplicantDetails} />
      </div>
    </Router>
  );
}

export default App;
