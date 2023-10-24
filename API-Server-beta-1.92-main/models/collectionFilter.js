import Model from './model.js';

export default class CollectionFilter {
    constructor(objects, params, model) {
        this.objects = objects;
        this.params = params;
        this.model = model;
    }
    getValeur(nomParam) {
        Object.keys(this.params).forEach(p => {
            if (p.toLowerCase() == nomParam.toLowerCase()) {
                return this.params[p];
            }
        });
        return false;
    }
    get() {
        let newList = [...this.objects];
        this.list = newList;

        this.sort();
        this.category();
        this.name();
        this.limit();
    }
    name() {
        let valeur = this.getValeur("sort");if(valeur == false){return;}
        let currentT = [...this.list];

        let newt = [];
        Object.keys(currentT).forEach(indx => {
            if (valueMatch(currentT[indx]["Name"], valeur)) {
                newt.push(currentT[indx]);
            }
        });
        this.list = newt;
    }
    sort() {
        let valeur = this.getValeur("sort");if(valeur == false){return;}
        let currentT = [...this.list];

        currentT.sort((x, y) => this.innerCompare(x, y));

        this.list = currentT;
    }
    category() {
        let valeur = this.getValeur("category");if(valeur == false){return;}
        let currentT = [...this.list];

        let newt = [];
        Object.keys(currentT).forEach(indx => {
            if (currentT[indx]["Category"] == valeur) {
                newt.push(currentT[indx]);
            }
        });
        this.list = newt;
    }

    limit() {
        let limitvaleur = this.getValeur("limit");if(valeur == false){return;}
        let offset = this.getValeur("offset");
        let currentT = [...this.list];

        let newt = [];
        let compteur = 0;
        Object.keys(currentT).forEach(indx => {
            let obj = currentT[indx];
            compteur++;
            if(compteur < limitvaleur)
                newt.push(obj);
        });
        this.list = newt;
    }

    valueMatch(value, searchValue) {
        try {
            let exp = '^' + searchValue.toLowerCase().replace(/\*/g, '.*') + '$';
            return new RegExp(exp).test(value.toString().toLowerCase());
        } catch (error) {
            console.log(error);
            return false;
        }
    }
    compareNum(x, y) {
        if (x === y) return 0;
        else if (x < y) return -1;
        return 1;
    }
    innerCompare(x, y) {
        if ((typeof x) === 'string')
            return x.localeCompare(y);
        else
            return this.compareNum(x, y);
    }
}