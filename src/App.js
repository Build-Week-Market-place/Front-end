import React, {useContext} from 'react'
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

//testing // 

function App() {

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
              <SignForm/>
            </Route>
            <Route exact path='/register'>
              <Register/>
            </Route>
            <Route exact path='/home'> 
              <Home/>
            </Route> 
            <Route exact path='/users'>
              <Users/>
            </Route>
            <Route exact path='/items'>
              <Items/>
            </Route>
            <Route exact path='/upload'>
              <ItemEdit/>
            </Route>
            <Route exact path='/contact'>
              <Contact/>
            </Route>
          </Switch>
        </animated.div>
      ))}
    
    </div>
  );
}

export default App;

