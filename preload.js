// preload.js
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // APIs seguras para comunicação entre frontend e main process podem ser expostas aqui
});
