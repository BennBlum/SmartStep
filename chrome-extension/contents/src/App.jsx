import React, { useState, useContext } from 'react';
import SvgSymbols from './Components/Common/SvgSymbols';

import { Welcome } from './Forms/Welcome';
import { Search } from './Forms/Search';
import { Registry } from './Forms/Registry';
import { ViewNames, switchView } from './Common';
import { SmartStepContext } from './Contexts/SmartStepContext';
import { useEffect } from 'react';


function App() {
  const smartStepService = useContext(SmartStepContext);
  const [view, setView] = useState(ViewNames.WELCOME);

  useEffect(() => {
    // console.log("load:", smartStepService.getCurrentView())
    if (smartStepService.getCurrentView() != null) {
      setView(smartStepService.getCurrentView());
      // console.log("load view:", view);
    }
    else {
      console.log("no view saved.");
    }
  }, []);

  const switchMainView = (newView) => {
    smartStepService.setCurrentView(newView);
    switchView(newView, setView);
  }

  return (
    <div className="App">
      <SvgSymbols />
      <div className="wigdet-window">
        <div className="chatbot-body">
          {view === ViewNames.WELCOME && <Welcome switchMainView={switchMainView} />}
          {view === ViewNames.SEARCH && <Search switchMainView={switchMainView} />}
          {view === ViewNames.REGISTRY && <Registry switchMainView={switchMainView} />}
        </div>
      </div>
    </div>
  );
}

export default App;