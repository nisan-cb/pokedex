import { Page } from "./page";

export class Manager {
    parentEl: HTMLElement
    el: HTMLElement;
    pages: Page[];
    currentPage: number;


    constructor(parentEl: HTMLElement) {
        this.parentEl = parentEl;
        this.el = this.createElement();
        this.pages = [];
        this.currentPage = -1;

        this.init();
    }

    async init() {
        await this.loadPageFromApi('');
        // console.log(this.pages)
        this.displayPage(0);


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
                            this.pages.push(new Page(this.el, data, this.pages.length));
                            // console.log(this.pages);
                            resolve('loaded')
                        })
                })
                .catch(error => reject(error));
        })


    }

    async displayPage(index: number) {
        if (index < 0)
            return;
        if (index < this.pages.length) {
            // console.log('page : ', index);
            this.pages[index].render();
        } else {
            this.loadPageFromApi(this.pages[this.pages.length - 1].next());
            this.displayPage(index);
        }
    }




    createElement() {
        const el = document.createElement('div');
        el.setAttribute('id', 'box');

        return el;
    }
    render() {

        this.parentEl.append(this.el);
    }
}

