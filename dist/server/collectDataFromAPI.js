"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const node_fetch_1 = __importDefault(require("node-fetch"));
console.log("collect data from API");
const pokemonsArray = [];
const url = 'https://pokeapi.co/api/v2/pokemon';
function collectDataFromAPI(url) {
    console.log(url);
    return new Promise((resolve, reject) => {
        (0, node_fetch_1.default)(url)
            .then(response => response.json())
            .then(pokeData => {
            // console.log(pokeData)
            const promiseArray = [];
            pokeData.results.forEach(pokemonData => {
                promiseArray.push((0, node_fetch_1.default)(pokemonData.url).then(response => response.json()));
            });
            Promise.all(promiseArray)
                .then((dataArray) => {
                console.log(pokemonsArray.length);
                dataArray.forEach(pokeData => {
                    const newPokemon = {
                        id: pokeData.id,
                        name: pokeData.name,
                        height: pokeData.height,
                        weight: pokeData.weight,
                        backImg: pokeData.sprites.back_default,
                        frontImg: pokeData.sprites.front_default,
                    };
                    pokemonsArray.push(newPokemon);
                });
                if (pokeData.next)
                    collectDataFromAPI(pokeData.next)
                        .then(msg => resolve(msg))
                        .catch(err => reject(err));
                else
                    resolve('done');
            });
        })
            .catch(err => reject(err));
    });
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        collectDataFromAPI(url)
            .then(msg => {
            console.log(pokemonsArray.length, '*********************************************************');
            const jsonContent = JSON.stringify(pokemonsArray);
            fs_1.default.writeFile('./data/data.json', jsonContent, 'utf8', (err) => {
                if (err) {
                    console.log("An error occured while writing JSON Object to File.");
                    return console.log(err);
                }
                console.log("JSON file has been saved.");
            });
        })
            .catch(err => console.log(err));
    });
}
run();
