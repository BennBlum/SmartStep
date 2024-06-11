import { useState } from "react";

export default function WalkthroughInfo({ switchSubView, walkthroughInfo }) {
    const [showNoWalkthroughs, setShowNoWalkthroughs] = useState(false);
    return (<><div className="walkthrough-info">
        {showNoWalkthroughs && <div>
            <p>You have no walthroughs</p>
        </div>}

        {!showNoWalkthroughs && <div>
            <div>
                <p className="sub-head">{walkthroughInfo.name}</p>
            </div>
            <div>
                <p className="sub-body">{walkthroughInfo.description}</p>
            </div>
        </div>}
    </div></>)
}