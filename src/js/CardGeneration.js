export default class CardGeneration {
    constructor(title, year, img) {
        this.card = `
        <div class="item">
            <div class="card" style="width: 18rem;">
            <img src="${img}" class="card-img-top" alt="...">
            <div class="card-body">
            <h6 class="card-title">${title}</h6>
            <p class="card-text">Year:${year}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
            </div>
            </div>
        </div>
        `;
    }

    get movie(){
        return this.card;
    }
}