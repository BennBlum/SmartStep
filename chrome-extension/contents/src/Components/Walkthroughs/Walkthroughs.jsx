import React, { useContext, useEffect } from 'react';
import { SmartStepContext } from '../../Contexts/SmartStepContext';


export default function Walkthroughs({ onSelectWalkthrough }) {
    const smartStepService = useContext(SmartStepContext);
    const handleSelect = (event) => {
        onSelectWalkthrough(event);
    };

    useEffect(() => {
        if (smartStepService.hub.walkthroughs && smartStepService.hub.walkthroughs.length > 0) {
            handleSelect({ target: { value: JSON.stringify({index: 0, walkthrough: smartStepService.hub.walkthroughs[0]}) } });
        }
    }, [smartStepService.hub.walkthroughs]);

    return <>
        <p className="sub-head">Walkthroughs</p>
        <select id="walkthroughs" className="walkthroughs-select" size={8} onChange={handleSelect} defaultValue={smartStepService.hub.walkthroughs?.[0]}>
            {smartStepService.hub.walkthroughs?.map((walkthrough, index) => (
                <option key={index} value={JSON.stringify({index, walkthrough})}>
                    {walkthrough}
                </option>
            ))}
        </select>
    </>
}


