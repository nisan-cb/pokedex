import MongoManager from "./mongo";
import fs from 'fs';
import path from "path";

function readDataFromFile() {
    const dataPath = path.join(__dirname, '../../data/data.json');
    const allPokemons = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    return allPokemons;
}



// allPokemons.forEach(pokedata => {
//     db.addSingalePOkemon(pokedata);
// });

async function run() {
    const allPokemons = readDataFromFile();
    const db = new MongoManager();

    const result = await db.connect();
    console.log(result);
    allPokemons.forEach(async pokedata => {
        const result = await db.addSingalePOkemon(pokedata);
        console.log(result);
    })


}
run();
