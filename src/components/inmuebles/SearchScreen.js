import React, {useContext, useEffect} from 'react'

//Router
import { useParams } from 'react-router-dom';

//Context
import { InmueblesContext } from '../../context/inmuebles/InmueblesContext';
import { UiContext } from '../../context/ui/UiContext';

//Components
import { Spinner } from '../layout/Spinner';
import { InmuebleCardPublic } from './InmuebleCardPublic';

export const SearchScreen = () => {

	const { inmuebles, startListSearch } = useContext(InmueblesContext);
    const { loading } = useContext(UiContext);
    
    const { id } = useParams()
	
    useEffect(() => {
		startListSearch(id)
		// eslint-disable-next-line
    }, [])

	return (
		<div className="container inmuebles">
			<h2 className="inmuebles__title">Results</h2>
			{loading ? (
				<Spinner />
			) : (
				<div className="row">
					{inmuebles.map((inmueble) => (
						<InmuebleCardPublic key={inmueble.id} inmueble={inmueble} />
					))}
				</div>
			)}
		</div>
    )
}

