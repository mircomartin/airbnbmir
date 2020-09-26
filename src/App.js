import React from 'react';

//Context
import { AuthState } from './context/auth/AuthState';
import { UiState } from './context/ui/UiState';

//Components
import { AppRouter } from './routers/AppRouter';

function App() {
	return (
		<UiState>
			<AuthState>
				<AppRouter />
			</AuthState>
		</UiState>
	);
}

export default App;
