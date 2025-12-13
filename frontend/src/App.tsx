import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Header } from "./components/Header";
import "./App.css";

import { AuditoriumCataloguePage } from './pages/AuditoriumCataloguePage'; 
import { BookingManagementPage } from './pages/BookingManagementPage';
import { Settings } from './pages/Settings'; 
import { Bottom } from "./components/Footer";

const ROUTES = {
  CATALOG: '/room-assets2',
  BOOKINGS: '/bookings',
  SETTINGS: '/settings'
}

function App () {

  return (
    <BrowserRouter>
      <Header
        onBellClick={() => console.log("bell")}
      />
      
      <div className="contentContainer">
        <Routes> 
          <Route path={ROUTES.CATALOG} element={<AuditoriumCataloguePage/>} />
          <Route path={ROUTES.BOOKINGS} element={<BookingManagementPage/>} />
          <Route path={ROUTES.SETTINGS} element={<Settings/>} />
        </Routes>
        <Bottom />
        
      </div>
      
    </BrowserRouter>
  );
}

export default App;