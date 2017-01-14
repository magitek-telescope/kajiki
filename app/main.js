const electron = require('electron')
const app = electron.app
const Menu = electron.Menu
const BrowserWindow = electron.BrowserWindow
const path = require('path')
const url = require('url')
let mainWindow
function createWindow () {
  mainWindow = new BrowserWindow({width: 320, height: 500})
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}
app.on('ready', function(){
  const menu = Menu.buildFromTemplate(
    [{
      label: 'Edit',
      submenu: [
        {
          label: 'About Kajiki',
          click: function(){
            const openAboutWindow = require("about-window").default;
            openAboutWindow(
              {
                package_json_dir : path.join(__dirname, 'package.json'),
                icon_path        : path.join(__dirname, 'images/icon.png'),
                description      : "A few seconds upload to S3 very strong application."
              }
            );
          }
        },
        {
          type: 'separator'
        },
        {
          label: 'Undo',
          accelerator: 'CmdOrCtrl+Z',
          role: 'undo'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+CmdOrCtrl+Z',
          role: 'redo'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'CmdOrCtrl+X',
          role: 'cut'
        },
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        },
        {
          label: 'Paste',
          accelerator: 'CmdOrCtrl+V',
          role: 'paste'
        },
        {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        },
        {
          label: 'Debug',
          accelerator: 'Command+Option+I',
          click: function () {
            mainWindow.openDevTools()
          }
        },
        {
          label: 'Quit',
          accelerator: 'Command+Q',
          click: function () {
            app.quit()
          }
        }
      ]
    }]
  )
  Menu.setApplicationMenu(menu)
  createWindow()
})
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
