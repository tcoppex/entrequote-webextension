/**
 *  The background script receive selected text from content.js when
 *  the plugin button is clicked and process it (currently send a notification).
 * 
 */


const Data = {
  selection: undefined,
  settings: {}
};

/**
 * Handle message send by the content script.
 * @param  {text, url, author} message [description]
 */
function getContentMessage(message) {
  const key = message.type.toLowerCase();
  Data[key] = message.data;
}

/** Send a system notification */
function notify(msg) {
  browser.notifications.create({
    "type": "basic",
    "iconUrl": browser.extension.getURL('./resources/icons/favicon.ico'),
    "title": "EntreQuotes",
    "message": msg
  });
}

/** Return the app server URL based on settings. */
function serverURL() {
  const hostname = Data.settings['server-hostname'];
  const port = Data.settings['server-port'];
  return `http://${hostname}:${port}/api/quotes`;
}

/** Performed when the user click on the extension button */
function onClickExtension() {
  let selection = Data.selection;
  if ( selection
    && (typeof selection.text !== 'undefined')
    && (selection.text !== '')) 
  {
    selection.created_at = Date.now();

    axios.post(serverURL(), selection)
      .then((r) => notify('Successfully saved selection.'))
      .catch((e) => notify('Failed to save the selection in database.' + e));
  }
}


(() => {
  copyDefaultSettings(Data.settings);
  browser.runtime.onMessage.addListener(getContentMessage);
  browser.browserAction.onClicked.addListener(onClickExtension);
/*
  browser.contextMenus.create({
    id: 'save-image-to-db',
    title: 'Bookmark image',
    contexts: ['image']
  });
*/
})();