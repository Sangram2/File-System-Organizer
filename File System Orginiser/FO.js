// We will be creating a File System Organizer//
//Features of the Project -
//If you have numerous Files in a folder and they are not Properly arranged
//So you can use this tool to arrange them in specific directory according to their extension
// like text files will go into text File Folder .exe files will go into application folder and so on
// so at the end you will have a arranged set of files in specific folders

//js mein input Array ke from mein jaata hai from command line and that is array is process.argv Array


const treeModule=require('../commands/tree')
const helpModule=require('../commands/help')
const organizeModule=require('../commands/organize')
let input =process.argv.slice(2)  //index 0,1 are ignored and returns an array form index 2 uptill the end

// let inputArr=input
// console.log(input)

let command=input[0]  //[command,folderpath]

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: [
      "docx",
      "doc",
      "pdf",
      "xlsx",
      "xls",
      "odt",
      "ods",
      "odp",
      "odg",
      "odf",
      "txt",
      "ps",
      "tex",
    ],
    app: ["exe", "dmg", "pkg", "deb"],
  };
  

switch(command){
    case 'tree':
        treeModule.treeFnKey(input[1]);
        break;
    case 'organize':
        organizeModule.organizeFnKey(input[1]);
        break;
    case 'help':
        helpModule.helpFnKey()
        break;
    default :
        console.log('Please enter a Valid Command')
        break;
}












