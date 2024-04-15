const fs = require('node:fs');
const path = require('node:path');
const sportsFilePath = path.join(__dirname, '../deportes.json');

const readSportsFile = () => {
    const sportsData = fs.readFileSync(sportsFilePath);
    return JSON.parse(sportsData);
};

const writeSportsFile = (data) => {
    fs.writeFileSync(sportsFilePath, JSON.stringify(data, null, 2));
};

exports.getAllSport = (req, res) => {
    let sports = readSportsFile();    
    res.json(sports)
}
exports.createSport = (req, res) => {    
    const { name, price } = req.body;
    console.log(req.body)

    const sports = readSportsFile();

    const existingIds = sports.map(sport => sport.id);

    if (typeof name === 'undefined' || typeof price === 'undefined') {
        return res.status(400).send("Missing 'name' or 'price' in request body");
    }
    let newId = 1;
    while (existingIds.includes(newId)) {
        newId++;
    }
    const newSport = { id: newId, name, price };
    sports.push(newSport);
    writeSportsFile(sports);


    res.status(201).send(newSport);
}
exports.updateSport = (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const { price } = req.body;
    const sports = readSportsFile();
    const sportIndex = sports.findIndex(sport => sport.id === parseInt(id));

    if (sportIndex !== -1) {
        sports[sportIndex].price = price;
        sports[sportIndex].name = name;
        writeSportsFile(sports);
        res.status(200).json(sports[sportIndex]);
    } else {
        res.status(404).json({ message: 'Deporte no encontrado' });
    }
}
exports.deleteSport = (req, res) => {
    const { id } = req.params;
    let sports = readSportsFile();
    const sportIndex = sports.findIndex(sport => sport.id === parseInt(id));

    if (sportIndex !== -1) {
        sports = sports.filter(sport => sport.id !== parseInt(id));
        writeSportsFile(sports);
        res.status(200).json({ message: 'Deporte eliminado' });
    } else {
        res.status(404).json({ message: 'Deporte no encontrado' });
    }
}