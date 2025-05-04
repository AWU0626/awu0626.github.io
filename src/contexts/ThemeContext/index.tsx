import { useState, useEffect } from "react";
import { createContext } from "react"

// define context 
const ThemeContext = createContext<{
    theme: string,
    toggleTheme: (theme: string) => void,
}>({theme: 'dark', toggleTheme: () => {}});


// create provider
function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<string>('dark');

    // define toggle theme
    const toggleTheme = (newTheme: string) => {
        switch (newTheme) {
            case 'light':
                setTheme('light');
                break;
            case 'dark':
                setTheme('dark');
                break;
            default:
                console.error(`from toggleTheme, value of newTheme: ${newTheme} cannot be recognized`);
                break;
        }
    }

    // on theme change
    useEffect(() => {
        console.log(`Theme has been updated to ${theme}`)
    }, [theme])
    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export default ThemeProvider;