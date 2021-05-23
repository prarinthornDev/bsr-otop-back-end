import "./App.css";
import React  from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import MainLayout from "./component/Mainlayout";
import Login from './pages/Login';
import Register from './pages/Register';
import ListProduct from './pages/ListProduct';
import ListProductSaller from './pages/ListProductSaller';
import ProductDetail from './pages/ProdoctDetail';
import ProfileSaller from './pages/ProfileSaller';
import NotFoundPage from './pages/NotFounfPage';
import Sale from './pages/Sale';
import test from './pages/test';


function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ListProduct} />
        <Route path="/login/:isLogin?" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/listProductSaller" component={ListProductSaller} />
        <Route path="/register" component={Register} />
        <Route path="/sale/:id?" component={Sale} />}
        <Route path="/profileSaller/:id?" component={ProfileSaller} />
        <Route path="/productDetail/:id?" component={ProductDetail} />
        <Route path="/test" component={test} />
        <Route component={NotFoundPage} />
      </Switch> 
    </Router>
  );
}

/* if (isLogin){
  return <Redirect to='/home' />
}  */
export default App;
