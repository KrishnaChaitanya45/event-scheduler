import Homepage from "./pages/Homepage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PersistentLogin from "./components/PersistentLogin";
import IndividualDate from "./components/calander/IndividualDate";

function App() {
  return (
    <div>
      {/* //? LocalizationProvider is used by the MUI date picker component */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* //? React Router Setup */}
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Authentication />} />
            <Route element={<PersistentLogin />}>
              <Route path="/" element={<Homepage />} />
              <Route path="/calendar/:date" element={<IndividualDate />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;
