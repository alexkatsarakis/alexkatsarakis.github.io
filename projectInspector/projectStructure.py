import os
import json

currPath = os.path.realpath(__file__).rsplit(os.sep,2)[0] 

os.chdir(currPath)


def filesToObj(path):
    obj = {}
    for root, dirs, files in os.walk(path):
        if '.' in root or 'libs' in root:
            continue
        currPath = root.replace(path,'')
        arr = currPath.split(os.sep)
        arr.pop(0)
        
        currObjPointer = obj
        for i in arr:
            if i not in currObjPointer:
                currObjPointer[i] = {}

            currObjPointer = currObjPointer[i]
        
        for f in files:
            currObjPointer[f] = f

    return obj




obj = filesToObj(currPath)

f = open(currPath+'/projectInspector/projectStructure.json', "w")

json.dump(obj, f)