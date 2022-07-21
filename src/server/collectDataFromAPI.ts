import { response } from "express";
import fs from "fs";
import fetch from "node-fetch";

console.log("collect data from API");
interface PokeData {
    id: number;
    name: string;
    height: number;
    weight: number;
    backImg: string;
    frontImg: string;

}

const pokemonsArray: PokeData[] = [];
const url = 'https://pokeapi.co/api/v2/pokemon';




function collectDataFromAPI(url) {
    console.log(url)
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(response => response.json())
            .then(pokeData => {
                // console.log(pokeData)
                const promiseArray = []
                pokeData.results.forEach(pokemonData => {
                    promiseArray.push(fetch(pokemonData.url).then(response => response.json()));
                })
                Promise.all(promiseArray)
                    .then((dataArray) => {
                        console.log(pokemonsArray.length);
                        dataArray.forEach(pokeData => {
                            const newPokemon: PokeData = {
                                id: pokeData.id,
                                name: pokeData.name,
                                height: pokeData.height,
                                weight: pokeData.weight,
                                backImg: pokeData.sprites.back_default,
                                frontImg: pokeData.sprites.front_default,
                            }
                            pokemonsArray.push(newPokemon);
                        })
                        if (pokeData.next)
                            collectDataFromAPI(pokeData.next)
                                .then(msg => resolve(msg))
                                .catch(err => reject(err))
                        else
                            resolve('done');
                    })


            })
            .catch(err => reject(err));
    })
}


async function run() {
    collectDataFromAPI(url)
        .then(msg => {
            console.log(pokemonsArray.length, '*********************************************************');
            const jsonContent = JSON.stringify(pokemonsArray);
            fs.writeFile('./data/data.json', jsonContent, 'utf8', (err) => {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }

                console.log("JSON file has been saved.");

            })
        })
        .catch(err => console.log(err));

}

run();
