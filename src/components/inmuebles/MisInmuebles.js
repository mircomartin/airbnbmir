import React, { useContext, useEffect } from 'react'

//Context
import { InmueblesContext } from '../../context/inmuebles/InmueblesContext'
import { AuthContext } from '../../context/auth/AuthContext'

//Component
import { InmuebleCard } from './InmuebleCard'

export const MisInmuebles = () => {
    const { user } = useContext(AuthContext)
    const { inmuebles, startListMyProperties } = useContext(InmueblesContext)

    useEffect(() => {
        startListMyProperties(user.uid)
    }, [])
    
    return (
        <div className="container inmuebles">
            <h2 className="inmuebles__title">Your properties</h2>
            <div className="row">
                {
                inmuebles.map(inmueble => (
                    <InmuebleCard key={inmueble.id} inmueble={inmueble}/>
                ))
                }
            </div>
        </div>
    )
}
