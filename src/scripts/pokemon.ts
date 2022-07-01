

export class Pokemon {
    data: any;
    parentEl: HTMLElement
    el: HTMLElement;

    constructor(parentEl: HTMLElement, data: any) {
        this.el = this.createElement();
        this.parentEl = parentEl
        this.data = data
        // console.log("data : " ,this.data);
    }

    createElement() {
        const el = document.createElement('div');
        el.classList.add('card');

        return el;
    }
    render() {
        fetch(this.data.url)
            .then(response => response.json())
            .then(data => {
                const img = document.createElement('img');
                img.src = data.sprites.front_default;
                const span = document.createElement('span');
                span.textContent = data.name;
                console.log(data)
                this.el.append(img, span);
            })
            .catch()
            .finally()

        this.parentEl.append(this.el);
    }
}
