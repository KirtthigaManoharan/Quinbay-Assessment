import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Assets

// const SymptomsAssessment = React.lazy(() => import("../pages/SymptomsAssessment"));
const Products = React.lazy(() => import("../pages/Products"));

const AppRouter = () => {
  return (
    <div>
      <div className="content-backdrop">
        <Router>
          <Suspense fallback={<div></div>}>
          
            <Routes>
              <Route
                exact
                path="/"
                element={<Products />}
              />

            </Routes>
          </Suspense>
        </Router>
      </div>
    </div>
  );
};

export default AppRouter;
