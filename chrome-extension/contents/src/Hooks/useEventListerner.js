import { useEffect, useContext } from 'react';
import { SmartStepContext } from '../Contexts/SmartStepContext';
import { StateEnum } from '../Services/SmartStep';

const useEventListener = () => {
    const smartStepService = useContext(SmartStepContext);

    const dispatchDrawEvent = (element) => {
        const event = new CustomEvent('draw', { detail: {element} });
        document.dispatchEvent(event);
    };

    const sendStepUpdate = (event) => {
        // console.log("sending update...");
        const customEvent = new CustomEvent('updateStep', {detail:event.detail});
        document.dispatchEvent(customEvent);
    }

    useEffect(() => {
        const handleMouseOver = (event) => {
            if (smartStepService.state === StateEnum.PLAYBACK) {
                smartStepService.checkStepTarget(event.detail);
                sendStepUpdate(event);
            }
        };

        const handleMouseOverRecord = (event) => {
            if (smartStepService.state === StateEnum.RECORDING) {           
                smartStepService.addEvent(event.detail);
            }
        };

        const handleClick = (event) => {
            if (smartStepService.state === StateEnum.RECORDING)  {          
                smartStepService.addEvent(event.detail);
            }

            if (smartStepService.state === StateEnum.PLAYBACK) {
                smartStepService.checkStepTarget(event.detail);
                sendStepUpdate(event);
            }
        };

        document.addEventListener('customMouseOverRecord', handleMouseOverRecord);
        document.addEventListener('customMouseOver', handleMouseOver);
        document.addEventListener('customClick', handleClick);

        return () => {
            document.removeEventListener('customMouseOver', handleMouseOver);
            document.removeEventListener('customClick', handleClick);
        };
    }, [smartStepService, smartStepService.addEvent]);

    return { dispatchDrawEvent };
};

export default useEventListener;