import Homepage from "./pages/Homepage";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Authentication from "./pages/Authentication";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<Authentication />} />
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
