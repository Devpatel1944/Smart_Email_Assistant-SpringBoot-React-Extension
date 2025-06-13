console.log("Email Writer Extension -Content Script Loaded");

function getEmailContent(){
    const selectors =[
      '.h7',
      '.a3s.aiL',
      '.gmail_quote',
      '[role="presentation"]'
    ];
    for(const selector of selectors){
     const content = document.querySelector(selector);
        if(content){
         return content.innerText.trim();
        }
        return '';
    }
 }

function createAIButton(){
           const button = document.createElement('div');
           button.className = 'T-I J-J5-Ji aoO v7 T-I-atl L3';
           button.style.marginRight = '8px';
           button.innerHTML ='AI Reply';
           button.setAttribute('role','button');
           button.setAttribute('data-tooltip','Generate AI Reply');
           return button;

}

function findComposeToolbar(){
   const selectors =[
     '.btC',
     '.aDh',
     '[role="toolbar"]',
     '.gu.Up'
   ];
   for(const selector of selectors){
    const toolbar = document.querySelector(selector);
       if(toolbar){
        return toolbar;
       }
       return null;
   }
}

function injectButton(){

    const exisitingButton = document.querySelector('.ai-reply-button');
    if(exisitingButton) exisitingButton.remove();

    const toolbar = findComposeToolbar();
    if(!toolbar){
        console.log("Toolbar not found")
        return;
    }
    console.log("Toolbar found");
    const button = createAIButton();

    button.classList.add('ai-reply-button');

    button.addEventListener('click' ,async()=>{
            try{
                button.innerHTML ='Generating...';
                button.disabled =true;

                const emailContent = getEmailContent();
                  
            const response =  await fetch('http://localhost:8080/api/email/generate',{
                   method:'POST',
                   headers:{
                    'Content-Type':'application/json',
                   },
                   body:JSON.stringify({
                    emailContent: emailContent,
                    tone:"professional"
                })
                });

                if(!response.ok){
                    throw new Error("API Request Failed");
                }

                const generateReply = await response.text();
                
                const composeBox =document.querySelector('[role="textbox"][g_editable="true"]');

                if(composeBox){
                    composeBox.focus();
                    document.execCommand('insertText',false,generateReply);
                }else{
                    console.log("Compose Box Not Fount!!")
                }
            }catch(error){

                console.error(error);
                 alert("Failed To Generate Reply");
            }finally{
                button.innerHTML = 'AI Reply';
                button.disabled = false;
            }
    });

    toolbar.insertBefore(button,toolbar.firstChild);
      
}
const observer = new MutationObserver((mutations)=>{
       for(const mutation of mutations){
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElements = addedNodes.some(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            (node.matches('.aDh, .btC,[role="dialog"]') || node.querySelector('.aDh, .btC,[role="dialog"]'))
            
        );

        if(hasComposeElements){
            console.log("Compose Window Deteced");
            setTimeout(injectButton ,500);
        }
       }
});

observer.observe(document.body,{
    childList:true,
    subtree:true
});