import React from "react";
import Routes from "./Routes";
import { AuthProvider } from "components/ui/AuthenticationGuard";

function App() {
  return (
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}


export default App;
