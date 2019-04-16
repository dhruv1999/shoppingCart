const electron =require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow,Menu}=electron;

let mainWindow;

//listen for app to be ready

app.on('ready',function(){
    //create a new windows
    //create a new window
    mainWindow = new BrowserWindow({});

    //load html file into window

    mainWindow.loadURL(url.format({
        pathname:path.join(__dirname,'mainWindow.html'),
        protocol:'file:',
        slashes:true
    }));    

    mainWindow.on('closed',function(){
        app.quit();
    });
        const mainMenu =Menu.buildFromTemplate(mainMenuTemplate);
        //build menu from template
                    
        //insert menu
        Menu.setApplicationMenu(mainMenu);
});


//Handle add window
function createAddWindow(){
    addWindow= new BrowserWindow({
        width:600,
        height:400,
        title:'Add shopping list Item'
    });

    //load html file into window

    addWindow.loadURL(url.format({
        pathname:path.join(__dirname,'addWindow.html'),
        protocol:'file:',
        slashes:true
    }));  

    //garbage colletion handle

    addWindow.on('close',function(){
        addWindow=null;
    });
}


//Create a menu template


const mainMenuTemplate=[
    {},
    {
    label:'File',
    submenu:[
        {
            label:'Add Item',
            click(){
                createAddWindow();
            }
        },
        {
            label:'Clear Items'
        },
        {
            label:'Quit',
            accelerator:process.platform == 'darwin' ? 'Command+Q' :'Ctrl+Q', //if darwin(mac) then commmand else ctrl+q for windows
            click(){
                app.quit();
            }
        }
        ]
    }

];


//if mac add empty object to menu

if(process.platform === 'darwin'){
    mainMenuTemplate.unshift({});
}

//add developer tools items if not in production

if(process.env.NOE_ENV !=='prodution'){
    mainMenuTemplate.push({
        label:'deveoper tools',
        submenu:[
            {
              label: 'Toggle dev tools',
              accelerator:process.platform == 'darwin' ? 'Command+I' :'Ctrl+I', //if darwin(mac) then commmand else ctrl+q for windows

              click(item,focusedWindow){
                focusedWindow.toggleDevTools();
              }
            },{
                role:'reload'
            }
        ]
    });
}