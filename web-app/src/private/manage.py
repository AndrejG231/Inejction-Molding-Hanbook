import json

with open('./parts copy.json') as f:
    parts = json.loads(f.read())

newParts = {}

for part in parts:
    newParts[parts[part]["moldNumber"]] = {
        "sap": part,
        "description": parts[part]["description"],
        "project": parts[part]["project"],
        "materials": parts[part]["materials"],
        "molds": parts[part]["molds"],
    }

for p in newParts:
    print("\n", p, ":", newParts[p])

with open("./parts.json", "w") as f:
    f.write(json.dumps(newParts))
