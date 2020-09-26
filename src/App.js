import React from 'react';

//Context
import { AuthState } from './context/auth/AuthState';
import { InmueblesState } from './context/inmuebles/InmueblesState';
import { UiState } from './context/ui/UiState';

//Components
import { AppRouter } from './routers/AppRouter';

function App() {
	return (
		<UiState>
			<InmueblesState>
				<AuthState>
					<AppRouter />
				</AuthState>
			</InmueblesState>
		</UiState>
	);
}

export default App;
