import { Search } from './Search'; 
// import { getCurrentView } from '~/Common';

const StateEnum = Object.freeze({
    IDLE: "idle",
    RECORDING: "recording",
    PLAYBACK: "playback"
});


APP_KEY = "SmartStepApp";

class SmartStep {

    constructor() {
        this.state = StateEnum.IDLE;
        this.lastSearch = null;
        this.subscribers = [];
        this.prefix = "SmartStep:";
        this.lastEvent = null;
        this.currentView = null;
        this.currentSubView = null;
        this.initHub();
        // console.log("load app...")
    }

    subscribe(fn) {
        this.subscribers.push(fn);
    }

    unsubscribe(fn) {
        this.subscribers = this.subscribers.filter(subscriber => subscriber !== fn);
    }

    notifySubscribers() {
        for (let fn of this.subscribers) {
            fn(this.session);
        }

        this.saveAppState();
    }

    addEvent(event) {
        if (this.state !== StateEnum.RECORDING) {
            return;
        }

        if (this.session) {
            this.session = {
                ...this.session,
                events: [...this.session.events, event],
            };

            this.notifySubscribers();
        }
    }

    deleteEvent(index) {
        index = parseInt(index);
        if (index >= this.session.events.length) {
            return;
        }

        if (this.session) {
            this.session.events.splice(index, 1);
            this.notifySubscribers();
        }
    }

    loadAppState() {
        // console.log("loading state...");
        try {
            let appState = JSON.parse(localStorage.getItem(APP_KEY));
            console.log("appstate:", appState);
            if (appState) {
                this.session = appState.session;
                this.state = appState.state;
                this.currentView = appState.view;
                this.currentSubView = appState.subview;
                // console.log("state loaded.");
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    initHub() {
        this.hub = { walkthroughs: [] };

        var keys = Object.keys(localStorage);
        keys.sort();

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (new RegExp('^' + this.prefix).test(key)) {
                key = key.replace(this.prefix, '');
                this.hub.walkthroughs.push(key);
            }
        }

        this.loadAppState();
    }

    loadWalkThrough(name) {
        name = this.prefix + name;
        let session = JSON.parse(localStorage.getItem(name));
        if (session) {
            this.session = session;
        }
        else {
            this.session = {}
        }
    }

    deleteWalkthrough(name) {
        localStorage.removeItem(this.prefix + name);
        this.initHub();
    }

    saveWalkthrough(name, description) {
        this.session.name = name;
        this.session.description = description;
        localStorage.setItem(this.prefix + this.session.name, JSON.stringify(this.session));
        this.initHub();
    }

    getRegistryData() {
        let data = [];
        var keys = Object.keys(localStorage);
        keys.sort();

        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (new RegExp('^' + this.prefix).test(key)) {
                data.push(JSON.parse(localStorage.getItem(key)));                
            }
        }
        return data;
    }

    search(text) {
        this.lastSearch = text;
        const searchService = new Search();
        let data = this.getRegistryData();
        let result = searchService.search(text, data);
        return result;
    }

    exportWalkthrough(walkthroughID) {
        let walkthrough = this.loadWalkThrough(walkthroughID); 
    }

    setCurrentSubView(view) {
        console.log("set sub view", view);
        this.currentSubView = view;
        this.saveAppState();
    }

    getCurrentSubView() {
        try {
            return this.currentSubView;
        }
        catch {
        }
    }

    setCurrentView(view) {
        this.currentView = view;
        this.saveAppState();
    }

    getCurrentView() {
        try {
            return this.currentView;
        }
        catch {
        }
    }

    startRecoding() {
        // console.log("start recording.");

        let session = {};
        session.name = "Session " + new Date().toLocaleString();
        session.events = [];
        // save session
        this.session = session;
        this.state = StateEnum.RECORDING;

        this.saveAppState();
        
    }

    saveAppState() {

        let appState = {
            session : this.session,
            state : this.state,
            view: this.getCurrentView(),
            subview: this.getCurrentSubView(),
        }
        // console.log("save state:", appState);

        localStorage.setItem(APP_KEY, JSON.stringify(appState));
        // console.log("state saved.");
    }

    stopRecoding() {
        // console.log("stop recording.");
        // save session
        this.state = StateEnum.IDLE;
        this.saveAppState();
    }

    startPlayback(walkthroughID, startStepIndex = 0) {
        this.loadWalkThrough(walkthroughID);
        this.state = StateEnum.PLAYBACK;
        this.session.stepIndex = startStepIndex;        
        this.saveAppState();
    }

    stopPlayback() {
        this.session.stepIndex = 0;
        this.state = StateEnum.IDLE;
        this.saveAppState();
    }

    getCurrentStep(){
        if (this.session)
            return this.session.events[this.session.stepIndex];
        return null;
    }

    checkStepTarget(event) {
        try {
            // console.log("check:", event);
            let target = this.getCurrentStep();
            // console.log("target:", this.getCurrentStep());
    
            let stepComplete = event.action.action === target.action.action
            && event.id === target.id
            && event.innerText === target.innerText
            && event.nodeName === target.nodeName
            && event.path === target.path 
            && event.pathname === target.pathname;
            // console.log(stepComplete);
    
            if (stepComplete) {
                this.session.stepIndex++;
            }
        }
        catch (e) {
            // console.log(e);
        }

    }
}

export default SmartStep;
export { StateEnum };