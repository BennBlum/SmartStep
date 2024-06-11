import React, { useState , useContext} from 'react';
import { SmartStepContext } from '../../Contexts/SmartStepContext';

function SearchBox({onSearchResults}) {
    const smartStepService = useContext(SmartStepContext);

    let showError = false;
    const [searchText, setSearchText] = useState('');

    const handleSearch = (event) => {
        setSearchText(event.target.value);
    };

    const searchClick = async (text) => {
        let resultsPromise = smartStepService.search(text);
        let results = await resultsPromise;
        onSearchResults(results);
        setSearchText(''); 
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            searchClick(searchText);
            setSearchText('');
        }
    };

    return (
        <div id="divSearchBox" className="search-container">
            {showError && <p id="promptError" className="error-message">Please enter a question</p>}
            <div className="search-input-container">
                <input type="text" className="search-input" id="searchInput" placeholder="Search..." value={searchText} onChange={handleSearch} onKeyPress={handleKeyPress} />
                <svg id="btnSearch" className="icon" onClick={() => searchClick(searchText)}>
                    <use xlinkHref="#submit-svg"></use>
                </svg>
            </div>
        </div>
    );
}

export default SearchBox;