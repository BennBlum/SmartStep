import { useState, useContext } from "react";
// import React, { useState , useContext} from 'react';
import SearchBox from "../Components/Search/SearchBox";
import SearchResults from "../Components/Search/SearchResults";
// import SearchResultDetails from "../Components/Search/SearchResultDetails";
import { Play } from "./Play";
import Toolbar from "../Components/Common/Toolbar";
import { SmartStepContext } from '../Contexts/SmartStepContext';
import { RegistryViews, switchView } from '../Common';

function SearchMessage() {
    return (
        <div>
        <p id="questionInfo" className="sub-body">Please provide a description in the box
            below
            of the task you would like to perform</p>                
    </div>
    );
}

export function Search({ switchMainView }) {
    const smartStepService = useContext(SmartStepContext);    
    const [showSearch, setShowSearch] = useState(true);
    const [showResults, setShowResults] = useState(false);
    const [showResultDetails, setShowResultDetails] = useState(false);
    const [showSearchBox, setshowSearchBox] = useState(true);
    const [results, setResults] = useState([]);
    const onSearchResults = async (resultsPromise) => {
        const results = await resultsPromise;
        setResults(results);
        setShowSearch(false);
        setShowResults(true);
        setShowResultDetails(false);
    }

    const onClickViewResultItem = (name) => {
        setShowResultDetails(true);
        setShowResults(false);
        setshowSearchBox(false);
        smartStepService.loadWalkThrough(name);
    }

    const onBackToResults = () => {
        setShowResultDetails(false);
        setShowResults(true);
        setshowSearchBox(true);
    }
    
    return (<div>
        <Toolbar switchView={switchMainView} />        
        <div id="divUser" className="view-container">
            {showSearch && <SearchMessage />}
            {showResults && <SearchResults results={results} onClickViewResultItem={onClickViewResultItem}/>}
            {showResultDetails && <Play onBackToResults={onBackToResults}/>}
            {showSearchBox && <SearchBox onSearchResults={onSearchResults}/>}
        </div>
    </div>)
}