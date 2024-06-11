import React, { useState } from 'react';
import SvgSymbols from './Components/Common/SvgSymbols';
// import ToggleButton from './Components/Common/ToggleButton';

import { Welcome } from './Forms/Welcome';
import { Search } from './Forms/Search';
import { Registry } from './Forms/Registry';
import { ViewNames, switchView } from './Common';
import { SmartStepContext } from './Contexts/SmartStepContext';
import SmartStep from './Services/SmartStep';


function App() {
  const [view, setView] = useState(ViewNames.WELCOME);

  const switchMainView = (newView) => {
    switchView(newView, setView);
  }

  return (
    <SmartStepContext.Provider value={new SmartStep()}>
      <div className="App">
        <SvgSymbols />
        <div className="wigdet-window">
          <div className="chatbot-body">
            {view === ViewNames.WELCOME && <Welcome switchMainView={switchMainView} />}
            {view === ViewNames.SEARCH && <Search switchMainView={switchMainView} />}
            {view === ViewNames.REGISTRY && <Registry switchMainView={switchMainView} />}            
          </div>
        </div>
        {/* <ToggleButton /> */}
      </div>
    </SmartStepContext.Provider>
  );
}

export default App;