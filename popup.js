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
  const text = document.querySelectorAll('h3')
  const word = 'havoc';

  if (document.body.textContent.includes(word)) {
    document.body.innerHTML = document.body.innerHTML.replace(/havoc/g, 'sniffari');
    console.log('found and changed');
  } else {
    console.log('not here...');
  }
  chrome.storage.sync.get("color", ({ color }) => {
    document.body.style.backgroundColor = color;
  });

}