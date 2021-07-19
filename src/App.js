/*eslint-disable no-unused-vars*/
import React, { useState } from "react";
import './App.css'; 
import Main from './components/Main';
import ThemeContext from "./components/ThemeContext" 

function App() {
  const [theme, setTheme] = useState("dark")

  const handleToggle = () => {
    setTheme((prev) => prev == "dark" ? "light" : "dark")
  }

  return (
    <ThemeContext.Provider value={theme}>
      <Main handleToggle={handleToggle} />
    </ThemeContext.Provider>  
  );
}

export default App;
