
/**
 * Search in the page metadatas for author information, or
 * return the page hostname.
 * @return The presumed page author.
 */
function getPageAuthor() {
  // transform the HTMLCollection to an array
  return [].slice.call(document.getElementsByTagName('META'))
    // keep only meta with attributes
    .filter(e => typeof e.attributes !== 'undefined')
    // defined as 'author' or 'creator'
    .filter(e => { 
      let value = e.attributes[0].value;
      return (-1 != value.search('author')) 
          || (-1 != value.search('creator'))
          || (-1 != value.search('twitter:creator'))
          || (-1 != value.search('twitter:site'))
          || (-1 != value.search('og:site_name'))
          ;
    })
    // keep only one, or the hostname if none exists.
    .reduce((a, curr) => curr.content, window.location.hostname)
    .split(',')[0];
}

/** Send the Selection data to the background extension script */
function notifyExtension() {
  browser.runtime.sendMessage({
    "type": "SELECTION",
    
    "data": {
      "text": window.top.getSelection().toString().trim(),
      "author": getPageAuthor(),
      "src": window.location.href
    }
  });
}

(() => {
  // Send a notify signal everytime a mouse selection is finished.
  document.addEventListener("mouseup", notifyExtension);
})();

