import { Card } from "./card";
import { Pokemon } from "./pokemon";

export class ListManager {
    data: any;
    // index: number;
    // cards: Card[];
    parentEl: HTMLElement;
    el: HTMLElement;
    pokemonsArray: Pokemon[];
    lastPage: any;

    constructor(parentEl: HTMLElement, pokemonsArray: Pokemon[]) {
        this.el = this.createElement();
        this.parentEl = parentEl;
        this.pokemonsArray = pokemonsArray;
        this.lastPage = 1;
    }
    initCards(): Card[] {
        const result: Card[] = [];
        const array = this.data.results;
        console.log(array);
        array.forEach((data: { url: any; }) => {
            console.log(data.url)
            result.push(new Card(this.el, data));

        });
        return result

    }
    displayGrid() {
        // this.cards.forEach(card => {
        //     card.render();
        // })

    }

    loadMore() {

    }

    loadPageFromApi(url: string) {
        const defaultUrl = 'https://pokeapi.co/api/v2/pokemon';
        if (!url)
            url = defaultUrl;
        return new Promise((resolve, reject) => {
            fetch(url)
                .then(response => {
                    response.json()
                        .then(data => {
                            // console.log(data);
                            this.lastPage = data;
                            // this.pages.push(new Page(this.el, data, this.pages.length));
                            // console.log(this.pages);
                            resolve('loaded')
                        })
                })
                .catch(error => reject(error));
        })
    }

    next() {
        return this.data.next;
    }
    createElement() {
        const el = document.createElement('div');
        el.setAttribute('id', 'list');
        const ul = document.createElement('ul');
        const btn = document.createElement('buttom');
        btn.textContent = "Load more Pokémon"
        ul.innerHTML = 'No Results';
        el.append(ul, btn)

        return el;
    }
    render() {
        this.displayGrid();
        this.parentEl.append(this.el);
    }
}