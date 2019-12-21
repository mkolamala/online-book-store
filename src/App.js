import React from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/MainComponent";
import { SnackbarProvider } from "notistack";
function App() {
  return (
    <div className="App">
      <SnackbarProvider maxSnack={3}>
        <BrowserRouter>
          <Main />
        </BrowserRouter>
      </SnackbarProvider>
    
    </div>
  );
}

export default App;
