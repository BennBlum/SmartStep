export default function SearchResults({results, onClickViewResultItem}) {
    const onItemClick = (index) => {
        onClickViewResultItem(results[index]);
    };

    return (
        <div id="results" className="results-container">
            <p id="query" className="sub-head">Results</p>
            {results.map((result, index) => (
                <div key={index} className="result-item" onClick={() => onItemClick(index)}>
                    <div className="orange-square"></div>
                    <p id='walkthroughId' className="result-link">{result}</p>
                </div>
            ))}
        </div>
    );
}

