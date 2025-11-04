

(async function initChatbot() {
  try {
    
    const response = await fetch('https://deploy2.nitj.ac.in/api/v1/admin/switch');
    const data = await response.json();
    
    
    if (!data.enabled) {
      console.log('Chatbot is disabled by admin.');
      return;
    }
    
    
    
    
    const chatIcon = document.getElementById('chatIcon');

    
    
    await chatIcon.decode();
    
    
    const chatWidgetContainer = document.getElementById('chat-widget-container');
    if (chatWidgetContainer) {
      
      chatWidgetContainer.classList.add('active');
    }
    
    

    
    const chatButton = document.getElementById('chatButton');
    const chatIframe = document.getElementById('chatIframe');
    const chatBubble = document.getElementById('chat-bubble');
    let isOpen = false;
    let firstInteraction = true;
    
    function toggleChat() {
      isOpen = !isOpen;
      if (isOpen) {
        openChat();
      } else {
        closeChat();
      }
      
      if (firstInteraction) {
        chatButton.classList.remove('pulse');
        chatBubble.classList.add('hide');
        firstInteraction = false;
      }
    }
    
    function openChat() {
      isOpen = true;
      chatIframe.classList.add('show');
      chatButton.classList.add('open');
      chatIcon.src = './public/assets/images/close.svg'; 
      chatIcon.alt = 'Close Chat';
    }
    
    function closeChat() {
      isOpen = false;
      chatIframe.classList.remove('show');
      chatButton.classList.remove('open');
      chatIcon.src = './public/assets/images/chat-icon.svg'; 
      chatIcon.alt = 'Chat Icon';
    }
    
    
    chatButton.addEventListener('click', toggleChat);
    
    
    chatButton.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleChat();
      }
    });
    
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeChat();
      }
    });
    
  } catch (error) {
    console.error('Error initializing chatbot or loading icon:', error);
  }
})();