import Auth from "./auth";
import InfoTrack from "./InfoTrack";
import $ from 'jquery';

export default class Profil  {

    corps;

    constructor() {
        this.corps = `<h1>Spotif</h1><h2 class="title"></h2>
        <div class="image"></div>
		<p class="test"></p>
		<button type="button" class="pause btn btn-outline-danger">Pause</button>
		<button type="button" class="play btn btn-outline-success">Play</button>
		<button class="precedent btn btn-outline-primary">Precedent</button>
		<button class="suivant btn btn-outline-primary">Suivant</button>
        <p class="info_track"></p>
        <h3>Vos artistes préférés du mois</h1>
        <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Images</th>
      <th scope="col">Nom</th>
    </tr>
  </thead>
  <tbody class="artist_pref">
    
  </tbody>
</table>
<h3>Vos musiques préférées du mois</h3>
<table class="table">
<thead class="thead-dark">
  <tr>
    <th scope="col">#</th>
    <th scope="col">Images</th>
    <th scope="col">Nom</th>
  </tr>
</thead>
<tbody class="tracks_pref">
  
</tbody>
</table>
        <h3>Vos playlists</h3>
        <table class="table">
  <thead class="thead-dark">
    <tr>
      <th scope="col">#</th>
      <th scope="col">Images</th>
      <th scope="col">Nom</th>
      <th scope="col">Supprimer</th>
    </tr>
  </thead>
  <tbody class="playlist">
    
  </tbody>
</table>`;   
    }

    render() {
        const auth = new Auth();
        var hash = auth.getHashParams();
        $('.container').html(this.corps);
        console.log('ptn fait chier');
        console.log(hash.access_token);
        this.refresh_titre();

        
        $.ajax({
            url: `https://api.spotify.com/authorize?client_id=${auth.client_id}&response_type=code&redirect_uri=${auth.redirect_uri}&scope=user-read-private%20user-read-email&state=34fFs29kd09`,
            type: 'GET',
        })

        $.ajax({
            url: 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=3',
            type: 'GET',
            headers: {
                'Authorization': `Bearer ${hash.access_token}`
            },
            success: (data) => {
                console.log(data);
                let insert = '';
                let id = 1;
                data['items'].forEach(element => {
                    insert = insert + `<tr><th scope="row">${id}</th><td><img src="${element.images[0].url}" width="100px" height="100px"></td><td>${element.name}</td></tr>`;
                    id++;
                })
                $('.artist_pref').html(insert);
            }
        })

        $.ajax({
            url: 'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=3',
            type: 'GET',
            headers: {
                'Authorization': `Bearer ${hash.access_token}`
            },
            success: (data) => {
                console.log(data);
                let insert = '';
                let id = 1;
                data['items'].forEach(element => {
                    insert = insert + `<tr><th scope="row">${id}</th><td><img src="${element.album.images[0].url}" width="100px" height="100px"></td><td>${element.name}</td></tr>`;
                    id++;
                })
                $('.tracks_pref').html(insert);
            }
        })

        $.ajax({
            url: 'https://api.spotify.com/v1/me/playlists',
            type: 'GET',
            headers: {
                'Authorization': `Bearer ${hash.access_token}`
            },
            success: (data) => {
                let playlists = '';
                let id = 1;
                data['items'].forEach(element => {
                    playlists = playlists + `<tr><th scope="row">${id}</th><td><img src="${element.images[0].url}" width="100px" height="100px"></td><td>${element.name}</td></tr>`
                    id++;
                });
                $('.playlist').html(playlists);
            }
        })

        $.ajax({
            url: 'https://api.spotify.com/v1/artists/3NH8t45zOTqzlZgBvZRjvB',
            type: 'GET',
            headers: {
                'Authorization': `Bearer ${hash.access_token}`
            },
            success: (data) => {
                console.log(data);
            }
        })

        $.ajax( {
            url: 'https://api.spotify.com/v1/me',
            type: 'GET',
            headers: {
                'Authorization': `Bearer ${hash.access_token}`
            },
            success: (data) => {
                $('.title').html(`Bonjour ${data.display_name}`);
                $('image').html(`<img src="${data.images[0].url}">`);
            }

        })

        $('.pause').click((data) => {
            $.ajax({
                url: 'https://api.spotify.com/v1/me/player/pause',
                type: 'PUT',
                headers: {
                    'Authorization': `Bearer ${hash.access_token}`
                }
            });
        });
        
        $('.play').click((data) => {
            $.ajax({
                url: 'https://api.spotify.com/v1/me/player/play',
                type: 'PUT',
                headers: {
                    'Authorization': `Bearer ${hash.access_token}`
                }
            });
        });
        
        $('.precedent').click((data) => {
            $.ajax({
                url: 'https://api.spotify.com/v1/me/player/previous',
                type: 'POST',
                headers: {
                    'Authorization': `Bearer ${hash.access_token}`
                },
                success : (data) => {
                    this.refresh_titre();
                }
            });
            //refresh_titre();
        });
        
        $('.suivant').click((data) => {
            $.ajax({
                url: 'https://api.spotify.com/v1/me/player/next',
                type: 'POST',
                headers: {
                    'Authorization': `Bearer ${hash.access_token}`
                },
                success : (data) => {
                    this.refresh_titre();
                }
            });
            
        });
    }

    refresh_titre() {
        const auth = new Auth();
        var hash = auth.getHashParams();
        $.ajax({
            url: 'https://api.spotify.com/v1/me/player',
            type: 'GET',
            headers: {
                'Authorization': `Bearer ${hash.access_token}`
            },
            success: function(data) {
                    $('.info_track').html(`Vous écoutez <a href="#" class="info">${data['item'].name}</a>`);
                    $('.info').click((data) => {
                        const info = new InfoTrack();
                        info.render(this.access_token);
                        return false;
                    })
            }
        });
    }
    
}