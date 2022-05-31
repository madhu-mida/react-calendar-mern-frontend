import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Calendar from 'react-calendar';
import CalendarView from './pages/CalendarView';
import CalendarEventForm from './pages/CalendarEventForm.js';
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <div className="App">


      <Routes>
        <Route path="/" element={<CalendarView />} />
        <Route path="/event/:date" element={<CalendarEventForm src="create" />} />
        <Route path="/edit/:id" element={<CalendarEventForm src="edit" />} />
      </Routes>
    </div>
  );
}

export default App;
