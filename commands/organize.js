const fs=require('fs')
const path=require('path')
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
//Organize Function will organize all your folder's file in different folders according to their extension
function organizeFn(dirPath){//need a directory path as parameter
    let destPath
    if(dirPath==undefined){
        console.log('Please enter a valid Directory Path')
        return
    }  //check whether directory path is passed or not and if not then simply return

    let doesExist= fs.existsSync(dirPath)
    // this doesExist will tell the Target Folder exists or not

    if(doesExist==true){
        destPath=path.join(dirPath, 'organized_Files')
        // we created a path for organized_Files Folder


        // check whether in the given destPath does a folder exist with same name and if does not make a folder
        if(fs.existsSync(destPath)==false){
            fs.mkdirSync(destPath)

        }
        else{
            console.log('Folder Already Exists')
        }
    }
    else{
        console.log('Please enter a valid Path')
        return;
    }

    organizeHelper(dirPath,destPath)
}



function organizeHelper(src,dest){
    let childNames = fs.readdirSync(src)


    for(let i=0;i<childNames.length;i++){
        let childAdress = path.join(src,childNames[i])
        let isFile = fs.lstatSync(childAdress).isFile()

        if(isFile==true){
            let fileCategory = getCategory(childNames[i])
            // console.log(childNames[i]+' belong to '+ fileCategory);
            sendFile(childAdress,dest,fileCategory)
        }
    }
}



function getCategory(FileName){
    let ext=path.extname(FileName).slice(1)
    //we extracted extension names of the target Files

    for(let key in types){
        let cTypeArr = types[key]
        //we took out the Category type array here

        for(let i=0;i<cTypeArr.length;i++){
            if(ext==cTypeArr[i]){
                return key
            }
        }

    }
    return 'others'
    

    
}


function sendFile(srcFilePath,dest,fileCategory){
    // we will creat path for each category type encountered to create foldeds of their names
    let catPath = path.join(dest,fileCategory)

    if(fs.existsSync(catPath)==false){
        fs.mkdirSync(catPath)
    }


    let fileName = path.basename(srcFilePath)

    //we took out the basename of all the files

    let destFilePath=path.join(catPath,fileName)

    fs.copyFileSync(srcFilePath,destFilePath)

    fs.unlinkSync(srcFilePath)

    console.log('File Organized')
}


module.exports={
    organizeFnKey: organizeFn
}