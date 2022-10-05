// Initialize button with user's preferred color


let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", ({ color }) => {
  changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: setPageBackgroundColor,
  });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
  // const text = document.querySelectorAll('h3')
  const word = 'News';

  if (document.body.textContent.includes(word)) {
    document.body.innerHTML = document.body.innerHTML.replace(/Output/g, 'sniffari');
    console.log('found and changed');
  } 

  // const text2 = document.querySelectorAll('h3')
  const word2 = 'to';

  if (document.body.textContent.includes(word2)) {
    document.body.innerHTML = document.body.innerHTML.replace(/to/g, 'or');
    console.log('found and changed');
  } 
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });

}