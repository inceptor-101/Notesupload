file_path = 'data.txt'

# Open the file in read mode
with open(file_path, 'r') as file:
    file_content = file.read()

lines = file_content.split('\n')

document = []
metadata = []
ids = []
for i, line in enumerate(lines):
    if (i==0):
        continue
    file = line.split('\t')

    if (len(file) == 2):
        document.append(file[0])
        emotion = int(file[1])
        if (emotion == 0):
            metadata.append({"emotion": False})
        else:
            metadata.append({"emotion": True})
        ids.append(str(i))
        

import chromadb
client = chromadb.PersistentClient(path="./sentiment")

collection = client.get_or_create_collection(name="sentimentAnalyser")
collection.add(
    documents=document,
    ids=ids,
    metadatas=metadata
)