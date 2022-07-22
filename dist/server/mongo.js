"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MongoManager {
    constructor() {
        this.mongoose = require('mongoose');
        this.connectionString = 'mongodb+srv://nisan:1234@cluster1.xvhsvov.mongodb.net/?retryWrites=true&w=majority';
        this.connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        this.PokemonModel = this.createPokemonModel();
    }
    createPokemonModel() {
        const PokemonSchema = new this.mongoose.Schema({
            id: Number,
            name: String,
            height: Number,
            weight: Number,
            backImg: String,
            frontImg: String
        });
        return this.mongoose.model('pokemon', PokemonSchema, 'Pokemon');
    }
    connect() {
        return new Promise((resolve, reject) => {
            this.mongoose.connect(this.connectionString, this.connectionParams)
                .then(() => {
                resolve('Connected to the remote mongo DB');
            })
                .catch((err) => {
                reject(`Error connecting to remote mongo DB : , ${err}`);
            });
        });
    }
    addSingalePOkemon(pokedata) {
        const new_pokemon = new this.PokemonModel(pokedata);
        return new Promise((resolve, reject) => {
            new_pokemon.save((err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(`pokemon with id : ${pokedata.id} saved`);
            });
        });
    }
}
exports.default = MongoManager;
// const db = new MongoManager();
// db.connect();
// console.log(PokeDataInterface);
// db.addSingalePOkemon({
//     id: 1,
//     name: 'test',
//     height: 2,
//     weight: 4,
//     backImg: 'url',
//     frontImg: 'url'
// })
