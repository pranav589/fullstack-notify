import React from 'react'
import Nav from "./notes/Nav"
import EditNote from './notes/EditNote'
import CreateNote from './notes/CreateNote'
import Home from './notes/Home'
import {BrowserRouter,Route} from 'react-router-dom'

export default function Notes({setIsLogin}){
  return(
    <BrowserRouter>
    <div className="notes-page">
      <Nav setIsLogin={setIsLogin}/>
      <section>
        <Route path="/" component={Home} exact/>
        <Route path="/create" component={CreateNote} exact/>
        <Route path="/edit/:id" component={EditNote} exact/>
      </section>
    </div>
    </BrowserRouter>
  )
}