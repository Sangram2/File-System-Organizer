const fs=require('fs')
const path=require('path')

function treeFn(dirPath){
    if(dirPath==undefined){
        console.log('Please enter a valid Directory Path')
        return
    }   //check whether directory path is passed or not and if not then simply return

    else{
        let doesExist= fs.existsSync(dirPath)
        // this doesExist will tell the Target Folder exists or not
        if(doesExist==true){
            treeHelper(dirPath,' ')
        }
    }
}

function treeHelper(targetPath,indent){
    let isFile=fs.lstatSync(targetPath).isFile()

    if(isFile==true){
        let fileName=path.basename(targetPath)
        console.log(indent+"├──"+fileName)
    }
    else{
        let dirName=path.basename(targetPath)
        console.log(indent+"└──"+dirName)

        let children=fs.readdirSync(targetPath)
        for(let i=0;i<children.length;i++){
            let childPath=path.join(targetPath,children[i])

            treeHelper(childPath,indent+'\t');
        }
    }
}

module.exports={
    treeFnKey:treeFn
}