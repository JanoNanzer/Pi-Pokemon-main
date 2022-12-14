import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import LandingPage from "./components/LandingPage/LandingPage";
import PokemonCreate from "./components/PokemonCreate/PokemonCreate";
import PokemonDetail from "./components/Detail/PokemonDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={LandingPage} />
          <Route exact path={"/home"} component={Home} />
          <Route path={"/home/:id"} component={PokemonDetail} />
          <Route path={"/createPokemon"} component={PokemonCreate} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
