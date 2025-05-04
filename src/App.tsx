import { useContext } from "react"
import ThemeProvider from "./contexts/ThemeContext"

export default function App() {
	return (
		<>
			<ThemeProvider>
				<div>
					Hi
				</div>
			</ThemeProvider>
		</>
	)
}
