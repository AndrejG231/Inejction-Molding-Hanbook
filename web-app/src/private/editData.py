import json

with open('./parts.json') as p:
    parts = json.load(p)

with open('./materials.json') as p:
    materials = json.load(p)

with open('./presses.json') as p:
    molds = json.load(p)

# Edit


####

for mat in materials.keys():
    materials[mat]["parts"] = []

for mold in molds.keys():
    molds[mold] = []

for part in parts.keys():
    for material in parts[part]["materials"]:
        if material["sap"] not in materials.keys():
            print(f"Could not find material description for {material['sap']},\
            \n please enter material description:")

            desc = input()
            materials[material["sap"]] = {"name": desc, "parts": []}

        materials[material["sap"]]["parts"].append(part)

    for mld in parts[part]["molds"]:
        if(mld["imm"] not in molds.keys()):
            molds[mld["imm"]] = []

        molds[mld["imm"]].append(part)


with open('./materials.json', 'w', encoding='utf-8') as f:
    json.dump(materials, f, ensure_ascii=False, indent=4)

with open('./presses.json', 'w', encoding='utf-8') as f:
    json.dump(molds, f, ensure_ascii=False, indent=4)
