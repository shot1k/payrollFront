import './App.css';
import 'antd/dist/antd.css';
import Home from './components/home/index';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { AppProvider } from './appContext';



function App() {



  return (
    <div className="App">

      <AppProvider >
        
        
        <Router>
          <Switch>
            <Route>
              <Home />
            </Route>
          </Switch>
        </Router>
      </AppProvider>


    </div>
  );
}

export default App;
