import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ls from 'local-storage';
import './App.css';

import Navbar from './components/layout/navbar.component';
import Register from './components/layout/register.component';
import Login from './components/layout/login.component';
import RecruiterDetails from './components/layout/recruiter.details';
import ApplicantDetails from './components/layout/applicant.details';
import Welcome from './components/profiles/welcome';
import CreateJobs from './components/profiles/createjob';
import ApplicantProfile from './components/profiles/applicantprofile';
import RecruiterProfile from './components/profiles/recruiterprofile';
import EditJobs from './components/profiles/editjob';
import Applications from './components/profiles/applications';
import ApplicantPublicProfile from './components/profiles/applicantpublicprofile';
import MyApplications from './components/profiles/myapplications';
import Landing from './components/layout/landing';
// import AcceptedApplications from './components/profiles/acceptedapplications';
// import AcceptedJobs from './components/profiles/acceptedjobs';

function App() {
  return (
    <Router>
      <div className="App">
        {ls.get("auth") === "true" ? (
          <div>
          <Route exact path="/" component={Welcome} />
          {ls.get("userrole") === "Applicant" ? (
            <Route exact path="/" component={ApplicantProfile} />
          ) : (
            <Route exact path="/" component={RecruiterProfile} />
          )}
          </div>
        ) : (
          <div>
            <Route exact path="/" component={Navbar} />
            <Route exact path="/" component={Landing} />
          </div>
        )} 
        {/* <Navbar /> */}
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/recruiter" component={RecruiterDetails} />
        <Route exact path="/applicant" component={ApplicantDetails} />
        <Route exact path="/jobs/create" component={CreateJobs} />
        <Route exact path="/jobs/edit" component={EditJobs} />
        <Route exact path="/applications" component={Applications} />
        <Route exact path="/applicant/publicprofile" component={ApplicantPublicProfile} />
        <Route exact path="/myapplications" component={MyApplications} />
        {/* <Route exact path="/acceptedjobs" component={AcceptedJobs} />
        <Route exact path="/acceptedapplications" component={AcceptedApplications} /> */}
      </div>
    </Router>
  );
}

export default App;
