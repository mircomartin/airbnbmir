import React from 'react'

//Router
import { Route, Switch } from 'react-router-dom'

//Components
import { ProfileSreen } from '../components/auth/ProfileSreen'
import { EditProfile } from '../components/auth/EditProfile'
import { Inmuebles } from '../components/inmuebles/Inmuebles'
import NewInmueble from '../components/inmuebles/NewInmueble'

export const Dashboard = () => {
    return (
        <Switch>
            <Route exact path="/" component={Inmuebles}/>
            <Route exact path="/new-inmueble" component={NewInmueble}/>
            <Route exact path="/profile" component={ProfileSreen}/>
            <Route exact path="/profile/:id" component={EditProfile}/>

        </Switch>
    )
}
