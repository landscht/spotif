export default class Auth {

    client_id;
    client_secret;
    redirect_uri;

    constructor() {
        this.client_id = '9b976141d3324f198766ee8e48aaadca';
        this.client_secret = '18e2cf36acbd4663b4e27c450aec82a0';
        this.redirect_uri = 'http://localhost:8000';
    }

    getHashParams() {
        var hashParams = {};
        var e, r = /([^&;=]+)=?([^&;]*)/g,
            q = window.location.hash.substring(1);
        while ( e = r.exec(q)) {
           hashParams[e[1]] = decodeURIComponent(e[2]);
        }
        console.log(hashParams);
        return hashParams;
    }

    get client_id() {
        return this.client_id;
    }

    get client_secret() {
        return this.client_secret;
    }

    get redirect_uri() {
        return this.redirect_uri;
    }
}