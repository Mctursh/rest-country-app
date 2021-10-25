/*eslint-disable no-unused-vars*/
import React, { useState } from "react";
import './App.css'; 
import Main from './components/Main';
import ThemeContext from "./components/ThemeContext" 

function App() {
  const [theme, setTheme] = useState("Dark")

  const handleToggle = () => {
    setTheme((prev) => prev == "Dark" ? "Light" : "Dark")
  }

  return (
    <ThemeContext.Provider value={theme}>
      <Main handleToggle={handleToggle} />
    </ThemeContext.Provider>  
  );
}

export default App;
