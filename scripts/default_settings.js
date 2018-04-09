const DefaultSettings = {
  'server-hostname': "127.0.0.1",
  'server-port': 4567
};

function copyDefaultSettings(obj) {
  for (let key in DefaultSettings) {
    obj[key] = DefaultSettings[key];
  };
}