import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import Order from "./pages/Order";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={["/", "/home"]} component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/order" component={Order} />
        <Route exact path="/checkout" component={Checkout} />
        <Route render={() => <h1 className="text-center mt-5 ">Page not found</h1>} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
