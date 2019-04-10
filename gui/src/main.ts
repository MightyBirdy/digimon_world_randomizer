import { app, BrowserWindow, Menu } from "electron";
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as path from "path";

import MainContainer from "./MainContainer"

let mainWindow: Electron.BrowserWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 850,
    minHeight: 850,
    width: 800,
    minWidth: 780
  });

  // and load the index.html of the app.
  mainWindow.loadFile( path.join( __dirname, "../index.html" ));

  // Open the DevTools.
  //mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on( "closed", () => { mainWindow = null; } );
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on( "ready", () => {
    const menu : Menu = null;
    // const menu = Menu.buildFromTemplate( [{ label: 'File',
    //                                         submenu: [{
    //                                             label: 'Exit',
    //                                             accelerator: 'CmdOrCtrl+W',
    //                                             role: 'close'
    //                                             }, {
    //                                             label: 'Reload',
    //                                             accelerator: 'CmdOrCtrl+R',
    //                                             click: ( item, focusedWindow ) => {
    //                                                 focusedWindow.reload()
    //                                                 }
    //                                             }]
    //                                       }] )
    Menu.setApplicationMenu( menu )
    createWindow()
    } );

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  if ( process.platform !== "darwin" ) {
    app.quit();
  }
});

// Re-open window if it's closed and the program is reactivated
app.on( "activate", () => {
  if ( mainWindow === null ) {
    createWindow();
  }
});
