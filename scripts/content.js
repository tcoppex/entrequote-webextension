
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
    // having property
    .filter(e => { 
      return e.attributes['itemprop'] 
          || e.attributes['name'] 
          || e.attributes['property']
    })
    //defined as 'author' or 'creator'
    .filter( e => {
      let value = e.name || e.content || '';
      return value.endsWith('author') 
          || value.endsWith('creator')
          || value.endsWith('site_name')
          || value.endsWith('site')
          ;
    })
    // keep only one, or the hostname if none exists.
    .reduce((a, curr) => curr.attributes[1].value, window.location.hostname)
    .split(',')[0]
    ;
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

