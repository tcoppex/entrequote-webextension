The ***EntreQuote webextension*** allows you to save and export part of the web inside the [EntreQuote web application](https://github.com/tcoppex/entrequote-webapp).

# Quickstart

To quickly test the extension you can use the *web-ext* tool from the project root directory :
```
$ npm install -g web-ext
$ web-ext run 
```

Alternatively, on *Firefox* you can load temporary addons by typing *about:debugging* in the Firefox URL bar then click on **Load Temporary Add-on**.

On *Chrome*, you can navigate to *[chrome://extensions](//chrome://extensions)*, check the **Developer Mode** box and click on **Load Unpacked Extension**.

# Settings

If you need to change the distant server *hostname* or *port* you can do so in the extension settings. By default the extension try to connect to the server @ *[127.0.0.1:4567](http://127.0.0.1:4567)*.