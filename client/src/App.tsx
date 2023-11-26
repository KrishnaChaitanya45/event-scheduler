import Homepage from "./pages/Homepage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Authentication from "./pages/Authentication";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import PersistentLogin from "./components/PersistentLogin";
import IndividualDate from "./components/calander/IndividualDate";
import { axiosPrivate } from "./api/axios";
import { AppSelector } from "./redux/hooks/TypeDeclaredHooks";
import dayjs from "dayjs";
function App() {
  const { accessToken } = AppSelector((state) => state.auth.auth);
  const { events } = AppSelector((state) => state.events);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Authentication />} />
            <Route element={<PersistentLogin />}>
              <Route path="/" element={<Homepage />} />
              <Route
                path="/calendar/:date"
                loader={async ({ params }) => {
                  return events.map((evt) => {
                    return dayjs(evt.date).format("D-M-YYY") === params.date;
                  });
                }}
                element={<IndividualDate />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </div>
  );
}

export default App;
