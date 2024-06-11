
import React, { useState, useContext, useEffect } from 'react';
import { SmartStepContext } from '../Contexts/SmartStepContext';
import { RegistryViews } from '../Common';
import useEventListener from '../Hooks/useEventListerner';
import { StateEnum } from '../Services/SmartStep';

export function Play({ switchSubView, onCancelView, onBackToResults }) {
    const smartStepService = useContext(SmartStepContext);
    const [session, setSession] = useState(smartStepService.session.name);

    const [showPlaying, setShowPlaying] = useState(false);
    const [showNameError, setShowNameError] = useState(false);
    const [showDescriptionError, setShowDescriptionError] = useState(false);
    const [showSave, setShowSave] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [stepName, setStepName] = useState('');
    const [stepNote, setStepNote] = useState('');

    const [options, setOptions] = useState(smartStepService.session.events);
    const [selectedOption, setSelectedOption] = useState('');
    const [optionSteps, setOptionSteps] = useState({});

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        let element = smartStepService.session.events[parseInt(e.target.value)];
        dispatchDrawEvent(element);
    };

    const handleStepNameChange = (e) => {
        setStepName(e.target.value);
        setOptionSteps(prevState => ({
            ...prevState,
            [selectedOption]: { ...prevState[selectedOption], name: e.target.value }
        }));
    };

    const handleStepNoteChange = (e) => {
        setStepNote(e.target.value);
        setOptionSteps(prevState => ({
            ...prevState,
            [selectedOption]: { ...prevState[selectedOption], note: e.target.value }
        }));
    };

    const onCancelClick = (e) => {
        //clear outlines
        dispatchDrawEvent(null);
        if (onCancelView !== undefined && onCancelView !== null) {
            switchSubView(onCancelView);
        }
        else {
            onBackToResults();
        }


        // switchSubView(RegistryViews.WALKTHROUGHS);
    }

    useEffect(() => {
        const steps = optionSteps[selectedOption] || { name: '', note: '' };
        setStepName(steps.name);
        setStepNote(steps.note);
    }, [selectedOption]);

    useEffect(() => {
        setOptionSteps(prevState => ({
            ...prevState,
            [selectedOption]: { name: stepName, note: stepNote }
        }));
    }, [stepName, stepNote]);

    useEffect(() => {
        const handleSessionChange = (newSession) => {
            setSession(newSession);
            if (newSession.events) {
                setOptions(newSession.events);
                if (newSession.events.length > 0) {
                    setSelectedOption('0'); // Set selectedOption to the first item
                }
            }
        };
        smartStepService.subscribe(handleSessionChange);

        return () => {
            smartStepService.unsubscribe(handleSessionChange);
        };
    }, [smartStepService]);



    const startPlayingClick = () => {

        smartStepService.startPlayback(smartStepService.session.name);
        let index = smartStepService.session.stepIndex;
        setShowPlaying(true);
        setSelectedOption(index);
        let element = smartStepService.session.events[index];
        dispatchDrawEvent(element);
    }

    const stopPlayingClick = () => {
        setShowPlaying(false);
        dispatchDrawEvent(null);
    }

    const { dispatchDrawEvent } = useEventListener();


    const updateStep = (event) => {
        // console.log("update recieved.");
        // show next step target
        let index = smartStepService.session.stepIndex;
        // console.log("update step", index);
        setSelectedOption(index);
        let element = smartStepService.session.events[index];
        dispatchDrawEvent(element);

        if (smartStepService.state === StateEnum.PLAYBACK) {
            // console.log("i", index, smartStepService.session.events.length);            
            if (index === smartStepService.session.events.length) {
                console.log("walkthrough complete!");
                setShowPlaying(false);
                dispatchDrawEvent(null);
            }
        }
    }

    useEffect(() => {
        const handleUpdateStep = (event) => updateStep(event);
        document.addEventListener('updateStep', handleUpdateStep);
        return () => {
            document.removeEventListener('updateStep', handleUpdateStep);
        };
    }, []);


    return (
        <div id="divRecord" className="record-container">
            <div>
                <p className="sub-head">{session}</p>
                <hr></hr>
            </div>
            <div className="controls">
                {!showPlaying && <button className="std-btn" onClick={startPlayingClick}>Play</button>}
                {showPlaying && <button className="std-btn" onClick={stopPlayingClick}>Stop</button>}
                <button id="btnCancel" className="std-btn" onClick={onCancelClick}>Cancel</button>
            </div>
            <div>
                <select
                    id="steps"
                    className="record-select"
                    size={7}
                    value={selectedOption}
                    onChange={handleOptionChange}
                >
                    {options.map((option, index) => (
                        <option key={index} value={index.toString()}>
                            {option.name}
                        </option>
                    ))}
                </select>
            </div>
            {showPlaying && (
                <div>
                    <p>Step Name</p>
                    <input type="text" className="record-txt" value={stepName} onChange={handleStepNameChange} placeholder="Name" />
                    <p>Step Note</p>
                    <textarea className="step-note" value={stepNote} onChange={handleStepNoteChange}></textarea>
                </div>
            )}
            {showSave && (
                <div>
                    <p>{session?.name}</p>
                    <div>
                        {showNameError && <p id="nameError" className="error-message">Please enter a name</p>}
                        <input type="text" className="record-txt" value={name} onChange={(e) => setName(e.target.value)} id="txtName" placeholder="Name" />
                    </div>
                    <div>
                        {showDescriptionError && <p id="descriptionError" className="error-message">Please enter a description</p>}
                        <input type="text" className="record-txt" value={description} onChange={(e) => setDescription(e.target.value)} id="txtDescription" placeholder="Description" />
                    </div>
                </div>
            )}
        </div>
    );
}
