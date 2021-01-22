import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ls from 'local-storage';
import './App.css';

import Navbar from './components/layout/navbar.component';
import Register from './components/layout/register.component';
import Login from './components/layout/login.component';
import RecruiterDetails from './components/layout/recruiter.details';
import ApplicantDetails from './components/layout/applicant.details';
import Welcome from './components/welcome';

function App() {
  return (
    <Router>
      <div className="App">
        {ls.get("auth") === "true" ? (
          <Route exact path="/" component={Welcome} />
        ) : (
          <Route exact path="/" component={Navbar} />
        )} 
        {/* <Navbar /> */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/recruiter" component={RecruiterDetails} />
        <Route exact path="/applicant" component={ApplicantDetails} />
      </div>
    </Router>
  );
}

export default App;
