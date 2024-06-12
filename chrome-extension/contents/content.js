console.log("content loaded...");

// const chatWindowID = '#chatbotWindow';
const chatWindowID = 'PLASMO-CSUI';
// const chatWindowID = 'plasmo-shadow-container';
let mouseOverEvent = null;

const clickActionDetails = {
    action: "click",
    style: "thick solid blue",
};

const mouveOverActionDetails = {
    action: "move",
    style: "thick solid green",
};

const isChatWindow = (event) => {
    return event.target.nodeName == chatWindowID;
}


document.addEventListener('mouseover', (event) => {    
    if (isChatWindow(event)) {
        // console.log("widget mouseover");
        mouseOverEvent = null
        return;
    }
    const mouseEvent = createCustomEvent(
        'customMouseOver',
        event.target.tagName,
        event.target,
        mouveOverActionDetails,
    );
    // console.log("mouse event");
    document.dispatchEvent(mouseEvent);
    mouseOverEvent = event;
});

document.addEventListener('click', (event) => {
    if (isChatWindow(event)) {
        // console.log("widget click");
        return;
    }
    const clickEvent = createCustomEvent(
        'customClick',
        event.target.tagName,
        event.target,
        clickActionDetails,
    );
    document.dispatchEvent(clickEvent);
});

document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && mouseOverEvent) {
        const mouseEvent = createCustomEvent(
            'customMouseOverRecord',
            mouseOverEvent.target.tagName,
            mouseOverEvent.target,
            mouveOverActionDetails,
        );
        document.dispatchEvent(mouseEvent);
        mouseOverEvent = null;
    }
});

let prevElement = null;

document.addEventListener('draw', (event) => {
    try {
        if (prevElement) {
            prevElement.style.outline = '';
        }

        let step = event.detail;        
        let element = findElementByProperties(step.element);

        if (element) {
            element.style.outline = event.action === clickActionDetails.action
                ? clickActionDetails.style
                : mouveOverActionDetails.style;
            prevElement = element;;
        }
    } catch (e) {
        // console.log(e);
    }
});

const getXPathOfElement = (element) => {
    try {
        if (element.id !== '')
            return 'id("' + element.id + '")';
        if (element === document.body)
            return element.tagName;

        let ix = 0;
        const siblings = element.parentNode.childNodes;
        for (let i = 0; i < siblings.length; i++) {
            const sibling = siblings[i];
            if (sibling === element)
                return getXPathOfElement(element.parentNode) + '/' + element.tagName + '[' + (ix + 1) + ']';
            if (sibling.nodeType === 1 && sibling.tagName === element.tagName)
                ix++;
        }
    }
    catch (e) {

    }
}

const getFeaturesFromTarget = (target) => {
    return {
        pathname: window.location.pathname,
        path: getXPathOfElement(target),
        innerText: target.innerText,
        nodeName: target.nodeName,
        id: target.id,
    }
}

const filterWords = (words) => {
    return words.filter(word => !word.includes('_'));
}

const isSubsequence = (arr, subArr) => {
    if (arr.length === 0 || subArr === 0)
        return false;

    let i = 0;
    let j = 0;
    while (i < arr.length && j < subArr.length) {
        if (arr[i] === subArr[j]) {
            j++;
        }
        i++;
    }
    return j === subArr.length;
}


const compareXPaths = (xpath1, xpath2) => {
    let segments1 = xpath1.split('/');
    let segments2 = xpath2.split('/');
    let tolerance = 0;

    if (segments1.length !== segments2.length) {
        return false;
    }

    let differences = 0;
    for (let i = 0; i < segments1.length; i++) {
        if (segments1[i] !== segments2[i]) {
            differences++;
            if (differences > tolerance) {
                return false;
            }
        }
    }

    return true;
}


const findElementByProperties = (properties) => {
    if (window.location.pathname !== properties.pathname) {
        return null;
    }

    try {
        let elements = document.querySelectorAll(properties.nodeName);
        let bestMatch = null;
        let bestMatchScore = 0;

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            let score = 0;

            if (element.id === properties.id) {
                score++;
            }
            let elementTexts = filterWords(element.innerText.replace(/\n/g, ' ').split(' '));
            let targetTexts = filterWords(properties.innerText.replace(/\n/g, ' ').split(' '));
            if (isSubsequence(elementTexts, targetTexts)) {
                score++;
            }
            let xpath = getXPathOfElement(element);
            if (compareXPaths(xpath, properties.path)) {
                score++;
            }

            if (score > bestMatchScore) {
                bestMatch = element;
                bestMatchScore = score;
            }
        }

        return bestMatch;
    }
    catch (e) {
        console.log(e);
    }
}

const createCustomEvent = (eventName, tagName, target, action) => {
    let eventDetails = getFeaturesFromTarget(target);
    eventDetails.step = -1;
    eventDetails.action = action;
    eventDetails.name = tagName;
    const customEvent = new CustomEvent(eventName, {
        detail: { ...eventDetails }
    });
    return customEvent;
}
