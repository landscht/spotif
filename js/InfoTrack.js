import Auth from "./auth";
import $ from 'jquery';
import Profil from "./Profil";

export default class InfoTrack {

    corps;
    access_token;

    constructor(access_token) {
        this.access_token = access_token;
        this.corps =`<h1 class="title"></h1>
        <div class="image"></div>
        <table class="table">

    <tr class="album">

    </tr>
    <tr class="artist">

    </tr>
</table>
<button class="retour">retour</button>`;
    }

    render() {
        const auth = new Auth();
        var hash = auth.getHashParams();
        console.log(hash.access_token);
        $('.container').html(this.corps);

        $('.retour').click(function() {
            const profil = new Profil();
            profil.render();
        })

        $.ajax({
            url: 'https://api.spotify.com/v1/me/player',
            type: 'GET',
            headers: {
                'Authorization': `Bearer ${hash.access_token}`
            },
            success: function(data) {
                console.log(data['item']['album'].images[1].url);
                console.log(`<img src="${data['item']['album'].images[1].url}">`);
                $('.title').html(data['item'].name);
                $('.image').html(`<img src="${data['item']['album'].images[1].url}">`);
                $('.album').html(`<td>album</td><td>${data['item']['album'].name}</td>`);
                $('.artist').html(`<td>artist</td><td>${data['item'].artists[0].name}</td>`);
                
            }
        });
    }

}