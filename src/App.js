import './components/inputPage/InputPage'
import InputPage from './components/inputPage/InputPage';
import ProjectsPage from './components/projectsPage/ProjectsPage';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AppHeader from './components/appHeader/AppHeader';

function App() {
  return (
    <Router>
      <AppHeader/>
      <Routes>
          <Route exact path="/" element={<InputPage/>}/>
          <Route exact path="/projectsPage" element={<ProjectsPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;
