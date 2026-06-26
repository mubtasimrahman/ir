import { Suspense, lazy } from "react";
import {  Routes, Route, BrowserRouter } from "react-router";
import PublicApp from "./PublicApp";

const AirPurifier = lazy(() => import("./AirPurifier"));
const AdminApp = lazy(() => import("./AdminApp"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicApp />} />
        <Route
          path="/air-purifier"
          element={
            <Suspense fallback={null}>
              <AirPurifier />
            </Suspense>
          }
        />
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
