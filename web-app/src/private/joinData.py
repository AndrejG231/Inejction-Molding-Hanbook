import json

with open('./materials.json') as matjson:
    materials = json.load(matjson)

with open('./presses.json') as immjson:
    presses = json.load(immjson)

with open('./parts.json') as parjson:
    parts = json.load(parjson)

for key in parts.keys():
    partMaterials = []
    for item in materials:
        for part in materials[item]["parts"]:
            if part["sap"] == key:
                #print(part, item)
                partMaterial = {
                    "sap": item,
                    "portion": part["portion"],
                    "volume": part["volume"]
                }
                partMaterials.append(partMaterial)

    parts[key]["materials"] = partMaterials

    partMolds = []
    for item in presses.keys():
        for part in presses[item]:
            if part["sap"] == key:
                partMold = {"imm": item, "cycleTime": part["cycleTime"]}
                partMolds.append(partMold)

    parts[key]["molds"] = partMolds

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(parts, f, ensure_ascii=False, indent=4)
