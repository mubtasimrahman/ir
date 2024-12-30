import { Suspense, lazy } from "react";
import {  Routes, Route, HashRouter } from "react-router-dom"; // Correct import
import PublicApp from "./PublicApp";
const AdminApp = lazy(() => import("./AdminApp"));

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<PublicApp />} />
        <Route
          path="/tuntuni"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <AdminApp />
            </Suspense>
          }
        />
      </Routes>
    </HashRouter>
  );
}

export default App;
