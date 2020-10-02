import React from 'react'

//Router
import { Redirect, Route, Switch } from 'react-router-dom'

//Components
import { ProfileSreen } from '../components/auth/ProfileSreen'
import { EditProfile } from '../components/auth/EditProfile'
import { Inmuebles } from '../components/inmuebles/Inmuebles'
import NewInmueble from '../components/inmuebles/NewInmueble'
import { MisInmuebles } from '../components/inmuebles/MisInmuebles'
import { EditInmueble } from '../components/inmuebles/EditInmueble'
import { SingleInmuebleScreen } from '../components/inmuebles/SingleInmuebleScreen'
import { SearchScreen } from '../components/inmuebles/SearchScreen'

export const Dashboard = () => {
    return (
        <Switch>
            <Route exact path="/" component={Inmuebles}/>
            <Route exact path="/profile" component={ProfileSreen}/>
            <Route exact path="/profile/:id" component={EditProfile}/>
            <Route exact path="/properties/myproperties" component={MisInmuebles}/>
            <Route exact path="/properties/addproperty" component={NewInmueble}/>
            <Route exact path="/properties/myproperties/:id" component={EditInmueble}/>

            <Route exact path="/properties/:id" component={SingleInmuebleScreen}/>
            <Route exact path="/search/:id" component={SearchScreen}/>

            <Redirect to="/"/>
        </Switch>
    )
}
