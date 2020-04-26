export default class MySearch {

    constructor(title,type,page) {
         $.get(`http://www.omdbapi.com/?s=${title}&type=${type}&apikey=66da583c&page=${page}`, json => this.json = json);
    }

    get films() {
        return this.json.Search == "undefined" ? 0 : this.json.Search;
    }
    get count() {
        return this.json.totalResults == "undefined" ? 0 : this.json.totalResults;
    }
}

