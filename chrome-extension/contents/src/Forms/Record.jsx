import React, { useState, useContext, useEffect } from 'react';
import { SmartStepContext } from '../Contexts/SmartStepContext';
import { RegistryViews } from '../Common';
import useEventListener from '../Hooks/useEventListerner';
import { StateEnum } from '../Services/SmartStep';

export function Record({ switchSubView, setWalkthroughs }) {
    const smartStepService = useContext(SmartStepContext);
    const [session, setSession] = useState(null);

    const [showRecording, setShowRecording] = useState(false);
    const [showNameError, setShowNameError] = useState(false);
    const [showDescriptionError, setShowDescriptionError] = useState(false);
    const [showSave, setShowSave] = useState(false);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const [stepName, setStepName] = useState('');
    const [stepNote, setStepNote] = useState('');

    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [optionSteps, setOptionSteps] = useState({});

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        const steps = optionSteps[e.target.value] || { name: '', note: '' };
        setStepName(steps.name);
        setStepNote(steps.note);
        let element = smartStepService.session.events[parseInt(e.target.value)];
        dispatchDrawEvent(element);
    };

    const handleStepNameChange = (e) => {
        setStepName(e.target.value);
        const selectedIndex = options.findIndex((option, index) => index.toString() === selectedOption);
        smartStepService.session.events[selectedIndex].name = e.target.value;
    };

    const handleStepNoteChange = (e) => {
        setStepNote(e.target.value);
        const selectedIndex = options.findIndex((option, index) => index.toString() === selectedOption);
        smartStepService.session.events[selectedIndex].description = e.target.value;
    };

    function deleteOption(index) {
        if (index !== '' && index !== null) {
            smartStepService.deleteEvent(index);
            refreshOptions();
        } else {
            console.log("Empty value received in deleteOption");
        }
    }

    function refreshOptions() {
        const currentSession = smartStepService.session;
        setSession(currentSession);
        console.log("cs:", currentSession);
        console.log("showRecording", showRecording);
        if (smartStepService.state == StateEnum.RECORDING) {
            setShowRecording(true);
        }
        else 
        {
            setShowRecording(false);
        }

        if (currentSession && currentSession.events) {
            setOptions(currentSession.events);
            if (currentSession.events.length > 0) {
                setSelectedOption('0'); // Reset selectedOption to the first item if any
            } else {
                setSelectedOption('');
            }
        }
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

        refreshOptions();

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

    const startRecordingClick = () => {
        setShowRecording(true);
        smartStepService.startRecoding();
    }

    const stopRecordingClick = () => {
        setShowRecording(false);
        smartStepService.stopRecoding();
        setShowSave(true);
    }

    const saveRecording = () => {
        let isNameError = !name.trim();
        let isDescriptionError = !description.trim();

        if (isNameError) {
            setShowNameError(true);
        }
        if (isDescriptionError) {
            setShowDescriptionError(true);
        }

        if (isNameError || isDescriptionError) {
            return;
        }

        smartStepService.saveWalkthrough(name, description);
        setWalkthroughs(smartStepService.hub.walkthroughs);
        setName('');
        setDescription('');
        setOptions([]);
        setShowSave(false);
        switchSubView(RegistryViews.WALKTHROUGHS);
    }

    const onCancel = () => {
        console.log("cancel...");
        smartStepService.cancelRecording();
        setShowRecording(false);
        setOptions([]);
        switchSubView(RegistryViews.WALKTHROUGHS);        
    }

    const { dispatchDrawEvent } = useEventListener();

    return (
        <div id="divRecord" className="record-container record-container-extended">
            <div className="controls">
                <p className="sub-head">Record</p>
                <div className="record-container-extended-btn">
                    {!showRecording && <button className="std-btn" onClick={startRecordingClick}>Record</button>}
                    {showRecording && <button className="std-btn" onClick={stopRecordingClick}>Stop</button>}
                </div>
                <button id="btnCancel" className="std-btn" onClick={onCancel}>Cancel</button>
            </div>
            {!showSave && showRecording && (
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
                    <div>
                        <button
                            className="std-btn"
                            onClick={() => {
                                deleteOption(selectedOption);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
            {showRecording && (
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
            {showSave && (
                <div>
                    <button id="btnSaveRecording" className="std-btn" style={{ marginTop: "10px" }} onClick={saveRecording}>
                        Save
                    </button>
                </div>
            )}
            <div>
                <p id="saveLabel" className="saved" style={{ float: "right" }}></p>
            </div>
        </div>
    );
}
