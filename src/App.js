import './App.css';
import './components/inputPage/InputPage'
import InputPage from './components/inputPage/InputPage';
import ProjectsPage from './components/projectsPage/ProjectsPage';

function App() {
  return (
    <div className="App">
      <InputPage/>
      <ProjectsPage/>
    </div>
  );
}

export default App;
