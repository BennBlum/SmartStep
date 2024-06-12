import React, { useState, useContext, useEffect } from 'react';
import Toolbar from "../Components/Common/Toolbar";
import Walkthroughs from "../Components/Walkthroughs/Walkthroughs";
import WalkthroughInfo from "../Components/Walkthroughs/WalkthroughInfo";
import { Edit } from './Edit';
import { Play } from './Play';
import { RegistryViews, switchView } from '../Common';
import { Record } from './Record';
import { SmartStepContext } from '../Contexts/SmartStepContext';

export function Registry({ switchMainView }) {
    const [subview, setSubview] = useState(RegistryViews.WALKTHROUGHS);
    const [, setWalkthroughs] = useState([]);
    const [selectedWalkthrough, setSelectedWalkthrough] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [numSteps, setNumSteps] = useState(0);


    const switchSubView = (newView) => {
        console.log("switch", newView);
        switchView(newView, setSubview);
        smartStepService.setCurrentSubView(newView);
    };

    const deleteWalkthrough = () => {
        smartStepService.deleteWalkthrough(selectedWalkthrough)
        setWalkthroughs(smartStepService.hub.walkthroughs);
    };

    const onSelectWalkthrough = (event) => {
        let data = JSON.parse(event.target.value);
        setSelectedWalkthrough(data.walkthrough);
        smartStepService.loadWalkThrough(data.walkthrough);
        setName(smartStepService.session.name);
        setDescription(smartStepService.session.description);
        setNumSteps(smartStepService.session.events.length);
    }

    const smartStepService = useContext(SmartStepContext);

    useEffect(() => {
        let subView = smartStepService.getCurrentSubView()
        console.log("load sub:", subview)
        if (subView != null) {
            switchView(subView, setSubview);
            console.log("load sub view:", subView);
        }
        else {
            console.log("no sub view saved.");
        }
    }, []);


    return (<div>
        <Toolbar switchView={switchMainView} />
        {subview === RegistryViews.WALKTHROUGHS && <WalkthroughInfo switchSubView={switchSubView} walkthroughInfo={{ name, description }} />}
        {subview === RegistryViews.WALKTHROUGHS && <div>
            <div className="walkthrough-controls">
                <p className="sub-foot">Number of Steps ({numSteps})</p>
                <button className="std-btn" onClick={() => switchSubView(RegistryViews.PLAY)}>Start</button>
            </div>
        </div>}
        {subview === RegistryViews.WALKTHROUGHS && <Walkthroughs onSelectWalkthrough={onSelectWalkthrough} />}
        {subview === RegistryViews.WALKTHROUGHS && <div className="walkthrough-controls">
            <button className="std-btn" onClick={() => switchSubView(RegistryViews.RECORD)}>New</button>
            <button className="std-btn" onClick={() => switchSubView(RegistryViews.EDIT)}>Export</button>
            <button className="std-btn" onClick={deleteWalkthrough}>Delete</button>
        </div>}
        {subview === RegistryViews.RECORD && <Record switchSubView={switchSubView} setWalkthroughs={setWalkthroughs} />}
        {subview === RegistryViews.EDIT && <Edit switchSubView={switchSubView} />}
        {subview === RegistryViews.PLAY && <Play switchSubView={switchSubView} onCancelView={RegistryViews.WALKTHROUGHS} />}
    </div>)
}
