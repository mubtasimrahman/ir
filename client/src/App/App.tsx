import { Suspense, lazy } from "react";
import {  Routes, Route, BrowserRouter } from "react-router";
import AirPurifier from "./AirPurifier";
import PublicApp from "./PublicApp";
const AdminApp = lazy(() => import("./AdminApp"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicApp />} />
        <Route path="/air-purifier" element={<AirPurifier />} />
        <Route
          path="/tuntuni"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminApp />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
