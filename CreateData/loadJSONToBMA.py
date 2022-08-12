import os
import json
from pymongo import MongoClient
import shutil

os.chdir("C:/Users/tkuijpe1/BMA2/DocumentsDatabase")
files=os.listdir()

client = MongoClient('localhost:27017')
dbname = client['BioMaterialAtlas']
for x in files:
    with open(x) as f:
        for jsonObj in f:
            myDict = json.loads(jsonObj)
            dbname['Documents'].insert_one(myDict)
    # Move the file to the archive folder
    shutil.move(x,'C:/Users/tkuijpe1/BMA2/DocumentsDatabase_Archive')
