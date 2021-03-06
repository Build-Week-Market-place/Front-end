import React, {useState,useContext, createContext} from 'react'
import './App.css';
import {useTransition, animated} from 'react-spring'
import {Route, Switch} from 'react-router-dom'
import {__RouterContext} from 'react-router'
import Home from './Unit2Components/page/Home'
import SignForm from './Unit2Components/page/SignForm';
import Register from './Unit2Components/page/register'
import Users from './Unit2Components/page/users'
import Items from './Unit2Components/page/items'
import ItemEdit from './Unit2Components/page/itemEdit'
import Contact from './Unit2Components/page/Contact'
import PrivateRoute from './Unit3Components/PrivateRoute'


export const BuyerSellerContext=createContext();

function App() {

  const [userName, setUserName]=useState("")






  const {location} = useContext(__RouterContext)
  const transitions = useTransition(location, location => location.pathname, {
    from:{opacity: 0, transform:'translate(100%,0)'},
    enter:{opacity: 1, transform:'translate(0%,0)'},
    leave:{opacity: 0.3, transform:'translate(-50%,0)'}
  })
  return (
    
    <div className="App">
      {transitions.map(({ item, props, key})=>(
        <animated.div key={key} style={props}>
          <Switch location={item}>
            <Route exact path='/'>
            <SignForm setUserName={setUserName}/>
            </Route>
            <Route exact path='/register'>
              <Register/>
            </Route>
            <PrivateRoute exact path='/home' component={Home}/> 
              
            <PrivateRoute exact path='/users' component={Users} />
              
            <PrivateRoute exact path='/items' component={Items}/>
              
            <PrivateRoute exact path='/upload' component={ItemEdit}/>
              
            <PrivateRoute exact path='/contact' component={Contact}/>
              
          </Switch>
        </animated.div>
      ))}
    
    </div>
    
  );
}

export default App;

