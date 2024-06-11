
export function toggleChatbot(event) {
    if (event) {
      event.preventDefault();
    }
    var toggleBtn = document.querySelector('.toggle-btn');
    var chatbotWindow = document.getElementById('chatbotWindow');
    if (chatbotWindow.style.display === 'none' || chatbotWindow.style.display === '') {
      chatbotWindow.style.display = 'block';
      toggleBtn.style.display = 'none';
    } else {
      chatbotWindow.style.display = 'none';
      toggleBtn.style.display = 'block';
    }
    
  }


export function switchView(viewName, setView) {
  setView(viewName);
}


export const ViewNames = {
  WELCOME: 'Welcome',
  SEARCH: 'Search',  
  REGISTRY: 'Registry',
  WALKTHROUGH_DETAILS: 'WalkthroughDetails',
  RECORD: 'Record',
  
};

export const RegistryViews = {
  WALKTHROUGHS: 'Walkthroughs',
  DETAILS: 'Details'  ,
  RECORD: 'Record',  
  EDIT: 'Edit',
  PLAY: 'Play',
};