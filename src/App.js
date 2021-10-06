
import { BrowserRouter, Switch , Route } from 'react-router-dom';
import './App.css';
import Inventory from './Component/Inventory/Inventory';
import NotFound from './Component/NotFound/NotFound';
import OrderReview from './Component/OrderReview/OrderReview';
import PlaceOrder from './Component/PlaceOrder/PlaceOrder';
import Header from './Header/Header';
import Shop from './Shop/Shop';



function App() {
  return (
    <div >

     
      <BrowserRouter>
          <Header></Header>
          <Switch>
              <Route exact path="/">
                 <Shop></Shop>
              </Route>
              <Route path="/shop">
                 <Shop></Shop>
              </Route>
              <Route path="/review">
                <OrderReview></OrderReview>
              </Route>
              <Route path="/inventory">
                <Inventory></Inventory>
              </Route>
              <Route path="/placeOrder">
                 <PlaceOrder></PlaceOrder>
              </Route>
              <Route path="*">
                   <NotFound></NotFound>
              </Route>

          </Switch>
      
      </BrowserRouter>
     
      
    </div>
  );
}

export default App;
