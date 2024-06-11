import React from 'react';
import { RegistryViews } from '../Common';


export function Edit({ switchSubView }) {
    return <>
            <div className="controls">
                <p className="sub-head">Edit</p>
                {/* <div>
                        {showNameError && <p id="nameError" className="error-message">Please enter a name</p>}
                        <input type="text" className="record-txt" id="txtName" placeholder="Name" />
                    </div>
                    <div>
                        {showDescriptionError && <p id="descriptionError" className="error-message">Please enter a description</p>}
                        <input type="text" className="record-txt" id="txtDescription" placeholder="Description" />
                    </div> */}                
                <button id="btnCancel" className="std-btn" onClick={() => switchSubView(RegistryViews.WALKTHROUGHS)}>Cancel</button>
            </div>
        </>
}