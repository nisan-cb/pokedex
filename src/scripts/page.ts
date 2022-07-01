import { Card } from "./card";

export class Page {
    data: any;
    index: number;
    cards: Card[];
    parentEl: HTMLElement;
    el: HTMLElement;

    constructor(parentEl: HTMLElement, data: any, index: number) {
        this.el = this.createElement();
        this.parentEl = parentEl;
        this.data = data;
        this.index = index;
        this.cards = this.initCards();



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
        this.cards.forEach(card => {
            card.render();
        })

    }

    next() {
        return this.data.next;
    }
    createElement() {
        const el = document.createElement('div');
        el.setAttribute('id', 'page');

        return el;
    }
    render() {
        this.displayGrid();
        this.parentEl.append(this.el);
    }
}