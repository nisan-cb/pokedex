import { Model, Models } from 'mongoose';
import { resolve } from 'path';
import { isElementAccessExpression } from 'typescript';
import { PokeData, PokeData as PokeDataInterface } from './interfaces'
import dotenv from 'dotenv'
dotenv.config()
export default class MongoManager {
    mongoose: any;
    connectionString: string;
    connectionParams: any;
    PokemonModel: any;

    constructor() {
        this.mongoose = require('mongoose');
        this.connectionString = process.env.MONGO_CONNECTION_STRING;
        this.connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
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
        })
        return this.mongoose.model('pokemon', PokemonSchema, 'Pokemon')

    }

    connect() {
        return new Promise((resolve, reject) => {
            this.mongoose.connect(this.connectionString, this.connectionParams)
                .then(() => {
                    resolve('Connected to the remote mongo DB');
                })
                .catch((err) => {
                    reject(`Error connecting to remote mongo DB : , ${err}`);
                })
        })


    }
    addSingalePOkemon(pokedata: PokeData) {
        const new_pokemon = new this.PokemonModel(pokedata)
        return new Promise((resolve, reject) => {
            new_pokemon.save((err, data) => {
                if (err)
                    reject(err)
                else
                    resolve(`pokemon with id : ${pokedata.id} saved`)
            })
        })

    }

}


// const db = new MongoManager();
// console.log(process.env.MONGO_CONNECTION_STRING)
// console.log(process.env.PORT)
// db.connect()
//     .then(result => console.log(result))
//     .catch(err => console.log(err));
// console.log(PokeDataInterface);
// db.addSingalePOkemon({
//     id: 1,
//     name: 'test',
//     height: 2,
//     weight: 4,
//     backImg: 'url',
//     frontImg: 'url'
// })