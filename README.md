# MERN-job-application-portal

## To Run

```
cd backend && npm install
cd ../frontend && npm install
npm run dev
```

- Run Frontend Only

```
cd frontend
npm install
npm run client
```

- Run Backend Only

```
cd backend
npm install
npm run server
```

## About

This is a simple job application portal that accepts two types of users, *Applicants* and *Recruiters*. On registeration, they are directed to a recruiter or applicant profile depending on the user role, where they can add other details that they would like to be visible. Once an email or name is registered, the same name and email cannot be user to create another profile, applicant or recruiter.

After completing this process, user is required to login again to access their dashboard.

### Applicant Profile

The applicant dashboard presents the latest active jobs still accepting applications, not past the deadline. The applicant has a choice to apply by clicking the button associated with each job card, on which the button changes to "Applied!". This job list has filter options and *fuzzy search on the title* is implemented.

In the my applications dashboard, the applicant can access all applications they have ever submitted. Each application can have one of the following status:
- Applied
- Shortlisted
- Accepted
- Rejected
- Removed

All applications will be visible unless the associated job has been deleted by the recruiter, in which case, all associated applications will cascade delete.
In case an application gets selected in a job, all other applications automatically assume the status of *Removed*. In case of accepting of an application, the satus changes to *Accepted* for only the application that is accepted. In case an application is *Rejected* for a job, the same shall be visible in the status. A *Shortlisted* applications status implies that it may have chances of being accepted, but is not yet.

The My Jobs dashboard allows the Applicant to view the jobs he has ever been accepted in, with an option to rate the job. The applicant can rate the job any number of times.

The Edit Profile will open a link that allows the applicant to completely rewamp his profile from scratch, *upload profile picture and resume*. Note that updating or editing the profile this way will completely erase previous data and fill a new set of information, wich implies that fields left blank will be stored as an information not given string in the database irrespective of the fact whether they were filled while registering the profile.

The Public Profile lets the Applicant see how the Recruiter will see his profile and check his own rating.

Logout will take you back to the homepage.

### Recruiter Profile

The Recruiter Dashboard supports all jobs yet posted by the Recruiter, with a filter depending upon the current job status. Each job card has an option to delete, edit(make new), view all applications and view the applications that have been accepted. Once the application has been accepted, it is not possible to reject it. On viewing the accepted applicants, the window is directed to the list of applications for the same with an option to rate the applicant and view his public profile and *download Resume*.

The create job link allows a new job to be created by the recruiter which will now be visible in the dashboard.

The Edit Profile link is the same as that in the Applicant profile.

Logout takes you back to the homepage.

### Homepage

The applications supports *login through google*.

#### Note:
The basic functionalities specified in the document have been applied.
The application focusses mainly on functionality and not UI design.
The best has been done in a period of 10 days.

