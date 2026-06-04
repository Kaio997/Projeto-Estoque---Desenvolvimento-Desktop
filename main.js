const { app, BrowserWindow } = require('electron');
const path = require('path');

function criarJanela() {
  const janela = new BrowserWindow({
    width: 450,          
    height: 700,         
    resizable: false,    
    autoHideMenuBar: true, 
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  janela.loadFile('index.html');
}

app.whenReady().then(() => {
  criarJanela();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) criarJanela();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});