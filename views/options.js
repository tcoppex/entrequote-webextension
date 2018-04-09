// Current settings values.
const Settings = {
};

/* -------------------------------------------------------------------------- */

function notifyExtension() {
  browser.runtime.sendMessage({
    "type": "SETTINGS",
    "data": Settings
  });
}

/* -------------------------------------------------------------------------- */

function onError(error) {
  console.log(`Error : ${error}`);
}

// Load settings from local storage.
function loadSettingsFromStorage(onSuccess) {
  browser.storage.local.get(DefaultSettings).then((stored) => {
    for (let key in stored) {
      Settings[key] = stored[key];
    }
    onSuccess();
  }, onError);
}

// Save current settings to local storage.
function saveSettingsToStorage() {
  browser.storage.local.set(Settings).catch(onError);
  notifyExtension();
}

/* -------------------------------------------------------------------------- */

// Update UI options from Settings.
function updateUIOptions() {
  for (let key in Settings) {
    document.querySelector(`#${key}`).value = Settings[key];
  }
}

// Save UI options to Settings.
function saveUIOptions() {
  for (let key in Settings) {
    Settings[key] = document.querySelector(`#${key}`).value;
  }
}

function onSubmit(event) {
  event.preventDefault();
  saveUIOptions();
  saveSettingsToStorage();  
}

function resetSettings() {
  copyDefaultSettings(Settings);
  saveSettingsToStorage();
  updateUIOptions();
}

/* -------------------------------------------------------------------------- */

// Initializer.
(() => {
  document.addEventListener('DOMContentLoaded', loadSettingsFromStorage(updateUIOptions));
  document.querySelector('form').addEventListener('submit', onSubmit);
  document.querySelector('#reset-settings').addEventListener('click', resetSettings);
})();
