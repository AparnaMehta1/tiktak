
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { Suspense } from "react";
import Login from "../src/pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './App.css';
import ADMIN from "../src/pages/admin";
import RequiredAuth from "./components/RequiredAuth";
import Engineer from "./pages/Engineer";
import Customer from "./pages/Customer";
import Notfound from "./components/Notfound";
import Unauthorized from "./components/Unauthorized";
 const ROLES = {
   "CUSTOMER":'customer',
   "ENGINEER":'engineer',
   "ADMIN":'admin',
 }
function App() {
  return (
  
      <Router>
        <Routes>
          <Route exact path="/" element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login/>
            </Suspense>
          } />
            <Route path="/Unauthorized" element={<Unauthorized/>} />
          <Route element={<RequiredAuth allowdRoles={[ROLES.ADMIN]}/>}>
            <Route path="/admin" exact element={<ADMIN/>}></Route>
          </Route>
          <Route element={<RequiredAuth allowdRoles={[ROLES.CUSTOMER]}/>}>
            <Route path="/customer" exact element={<Customer/>}></Route>
          </Route>
          <Route element={<RequiredAuth allowdRoles={[ROLES.ENGINEER]}/>}>
            <Route path="/engineer" exact element={<Engineer/>}></Route>
          </Route>
         
          <Route path="/*" element={<Notfound />} />
        </Routes>
      </Router>
  
  
  );
}

export default App;
