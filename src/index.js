import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="profile/:profileId" element={<ProfileView />}>
            <Route path="edit" element={<EditorView />} />
            <Route path="overview" element={<OverviewView />} />
            <Route path="workplaces" element={<WorkplacesView />} />
            <Route path="education" element={<EducationView />} />
            <Route path="projects" element={<ProjectsView />} />
            <Route path="skills" element={<SkillsView />} />
            <Route path="certs" element={<CertsView />} />
            <Route path="contact" element={<ContactView />} />
          </Route>
          <Route path="login" element={<LoginView />} />
          <Route path="signup" element={<SignupView />} />
          <Route path="admin" element={<AdminView />} />
          <Route path="*" element={
            <main>
              <p>404 - Route not found!</p>
            </main>
          }/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
