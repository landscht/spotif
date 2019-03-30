import $ from 'jquery';
import Auth from './Auth.js';
import InfoTrack from './InfoTrack.js';
import Profil from './Profil.js';

const auth = new Auth();


function getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    console.log(hashParams);
    return hashParams;
}

var hash = auth.getHashParams();

if(hash.access_token === undefined) {
    let scopes = 'user-read-private user-read-email user-modify-playback-state playlist-modify-public user-read-playback-state';
    let url = `https://accounts.spotify.com/authorize?client_id=${auth.client_id}&redirect_uri=${auth.redirect_uri}&scope=${scopes}&response_type=token&state=123`
    $('.container').html('<h1>Se connecter à Spotif - test github</h1><button type="button" class="loggin btn btn-primary">Se connecter</button>');
    $('.loggin').click((data) => {
        window.location.replace(url);
    })
}else{
    const profil = new Profil();
    profil.render();
}

/*function $_GET(param) {
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace( 
        /([^&;=]+)=?([^&;]*)/g, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );
    console.log(vars);
    if ( param ) {
        console.log(vars);
        return vars[param] ? vars[param] : null;	
    }
    console.log(vars);
    return vars;
}*/






//const acc = $_GET('access_token');
//console.log(acc);


/*const profil = new Profil();

console.log(document.location.href);
const auth = new Auth();
var request = require('request');

//auth.render();
$('.container').html(`<h1>Connectez vous à Spotif</h1><button class="loggin">Se connecter</button>`);

function $_GET(param) {
    var vars = {};
    window.location.href.replace( location.hash, '' ).replace( 
        /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
        function( m, key, value ) { // callback
            vars[key] = value !== undefined ? value : '';
        }
    );

    if ( param ) {
        return vars[param] ? vars[param] : null;	
    }
    return vars;
}

console.log(new Buffer(auth.client_id + ':' + auth.client_secret).toString('base64'))
let scopes = 'user-read-private user-read-email user-modify-playback-state playlist-modify-public user-read-playback-state';
    let url = `https://accounts.spotify.com/authorize?client_id=${auth.client_id}&redirect_uri=${auth.redirect_uri}&scope=${scopes}&response_type=code&state=123`
    //window.location.replace(url);
    console.log(url);

$('.loggin').click(function(event) {
    event.preventDefault();
    
    window.location.replace(url);
    return false;
});

const code = $_GET('code');
console.log(code);

var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: auth.redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (new Buffer(auth.client_id + ':' + auth.client_secret).toString('base64'))
    },
    json: true
};

request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log(body);
      var access_token = body.access_token,
          refresh_token = body.refresh_token;
    }
});*/
