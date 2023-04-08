// Router component
// Using hash router because some hosting services struggle with default router

import { HashRouter, Routes, Route } from "react-router-dom";

import App from './App';

const RouteSwitch = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={ <App /> } />
      </Routes>
    </HashRouter>
  );
};

export default RouteSwitch;