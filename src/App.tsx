import { Route, Switch } from "wouter";
import HomePage from "@/pages/HomePage";
import WhatShapesMePage from "@/pages/WhatShapesMePage";

function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/what-shapes-me" component={WhatShapesMePage} />
      <Route>
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-white/50">Page not found</p>
            <a href="/" className="text-[#c2410c] hover:underline mt-4 inline-block">Go home</a>
          </div>
        </div>
      </Route>
    </Switch>
  );
}

export default App;
