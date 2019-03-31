import Auth from "./auth";
import InfoTrack from "./InfoTrack";
import $ from 'jquery';

export default class Profil  {

    corps;

    constructor() {
        this.corps = `
        <header class="header" id="header1">
            <div class="center">
                <div class="caption animated bounceInDown">
                    <h2 class="title name display-3">Lecteur.</h2>
                    <p class="text">Controllez votre musique directement ici.</p>
                    <p class="test"></p>
		            <button type="button" class="pause btn btn-outline-danger">Pause</button>
		            <button type="button" class="play btn btn-outline-success">Play</button>
		            <button class="precedent btn btn-outline-primary">Precedent</button>
		            <button class="suivant btn btn-outline-primary">Suivant</button>
                     <p class="info_track"></p>
                </div>	
            </div>
            <!-- scroll-down -->
            <i class="scroll fa fa-angle-double-down"></i>
        </header>
        <!-- header #2 -->
        <header class="header" id="header2">
	        <div class="left">
		        <div class="caption">
			        <h2 class="title display-3 animated bounceInLeft">Vos artistes préférés</h2>
            <p class="text animated bounceInLeft">Retrouvez vos artistes préférés au cours de ce mois, des 6 derniers mois ou alors de cette année.</p>
            <div class="btn-group btn-group-toggle bouton-controle" data-toggle="buttons">
  <label class="btn btn-secondary active option-un-artist">
    <input type="radio" name="options" class="option-un-artist" id="option1-artist" autocomplete="off" checked> 1 mois
  </label>
  <label class="btn btn-secondary option-deux-artist">
    <input type="radio" name="options" id="option2-artist" autocomplete="off"> 6 mois
  </label>
  <label class="btn btn-secondary option-trois-artist">
    <input type="radio" name="options" id="option3-artist" autocomplete="off"> 1 an
  </label>
</div>
            <div class="container card-artist">

            </div>
		</div>	
	</div>
	<i class="scroll fa fa-angle-double-down"></i>
</header>
<!-- header #3 -->
<header class="header" id="header3">
	<div class="left">
		<div class="caption animated bounceInLeft">
			<h2 class="title display-3">Vos tracks préférées</h2>
			<p class="text">Retrouvez vos tracks préférés au cours de ce mois, des 6 derniers mois ou alors de cette année.</p>
            <div class="btn-group btn-group-toggle bouton-controle" data-toggle="buttons">
            <label class="btn btn-secondary active option-un-track">
              <input type="radio" name="options" class="option-un-artist" id="option1-artist" autocomplete="off" checked> 1 mois
            </label>
            <label class="btn btn-secondary option-deux-track">
              <input type="radio" name="options" id="option2-artist" autocomplete="off"> 6 mois
            </label>
            <label class="btn btn-secondary option-trois-track">
              <input type="radio" name="options" id="option3-artist" autocomplete="off"> 1 an
            </label>
          </div>
            <div class="container card-tracks">

            </div>
		</div>	
	</div>
	<i class="scroll fa fa-angle-double-down"></i>
</header>
<div class="demo-more d-lg-flex justify-content-around footer">
<p><i class="fa fa-users"></i> Spotif was created by Tony Landschoot le bg</p>
	<p><i class="fa fa-gift"></i> my github <a href="https://github.com/kopanol">kopanol</a></p></div>`;   
    }

    render() {
        $('body').html('');
        const auth = new Auth();
        var hash = auth.getHashParams();
        $('body').html(this.corps);
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
                data
                data['items'].forEach(element => {
                    let genres = '';
                    element.genres.forEach(genre => {
                        genres = genres + ` - ${genre}`;
                    })
                    insert = insert + `<div class="card bg-dark" style="width: 18rem;">
                    <img src="${element.images[0].url}" class="card-img-top" alt="${element.name}">
                    <div class="card-body bg-dark">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">${genres.substring(3)}</p>
                  </div>
                  <ul class="list-group list-group-flush bg-dark">
                    <li class="list-group-item bg-dark">${element.followers.total} followers</li>
                    <li class="list-group-item bg-dark">${element.popularity} ème</li>
                  </ul>
                    </div>
                  </div>`;
                })
                $('.card-artist').html(insert);
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
                    let artists = '';
                    element.artists.forEach(artist => {
                        artists = artists + ` - ${artist.name}`;
                    })
                    insert = insert + `<div class="card bg-dark" style="width: 18rem;">
                    <img src="${element.album.images[0].url}" class="card-img-top" alt="${element.name}">
                    <div class="card-body bg-dark">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="card-text">par ${artists.substring(3)}</p>
                  </div>
                  <ul class="list-group list-group-flush bg-dark">
                    <li class="list-group-item bg-dark">${element.popularity} ème</li>
                  </ul>
                    </div>
                  </div>`;
                    id++;
                })
                $('.card-tracks').html(insert);
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
                $('.name').html(`Bonjour ${data.display_name}`);
                $('image').html(`<img src="${data.images[0].url}">`);
            }

        })

        $('.option-un-artist').click((data) => {
            console.log('option 1');
            $.ajax({
                url: 'https://api.spotify.com/v1/me/top/artists?time_range=short_term&limit=3',
                type: 'GET',
                headers: {
                    'Authorization': `Bearer ${hash.access_token}`
                },
                success: (data) => {
                    console.log(data);
                    let insert = '';
                    data
                    data['items'].forEach(element => {
                        let genres = '';
                        element.genres.forEach(genre => {
                            genres = genres + ` - ${genre}`;
                        })
                        insert = insert + `<div class="card bg-dark" style="width: 18rem;">
                        <img src="${element.images[0].url}" class="card-img-top" alt="${element.name}">
                        <div class="card-body bg-dark">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">${genres.substring(3)}</p>
                      </div>
                      <ul class="list-group list-group-flush bg-dark">
                        <li class="list-group-item bg-dark">${element.followers.total} followers</li>
                        <li class="list-group-item bg-dark">${element.popularity} ème</li>
                      </ul>
                        </div>
                      </div>`;
                    })
                    $('.card-artist').html(insert);
                }
            })
        })
        
        $(".option-deux-artist").click((data) => {
            console.log('option 2')
            $.ajax({
                url: 'https://api.spotify.com/v1/me/top/artists?time_range=medium_term&limit=3',
                type: 'GET',
                headers: {
                    'Authorization': `Bearer ${hash.access_token}`
                },
                success: (data) => {
                    console.log(data);
                    let insert = '';
                    data
                    data['items'].forEach(element => {
                        let genres = '';
                        element.genres.forEach(genre => {
                            genres = genres + ` - ${genre}`;
                        })
                        insert = insert + `<div class="card bg-dark" style="width: 18rem;">
                        <img src="${element.images[0].url}" class="card-img-top" alt="${element.name}">
                        <div class="card-body bg-dark">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">${genres.substring(3)}</p>
                      </div>
                      <ul class="list-group list-group-flush bg-dark">
                        <li class="list-group-item bg-dark">${element.followers.total} followers</li>
                        <li class="list-group-item bg-dark">${element.popularity} ème</li>
                      </ul>
                        </div>
                      </div>`;
                    })
                    $('.card-artist').html(insert);
                }
            })
        })

        $(".option-trois-artist").click((data) => {
            console.log('option 2')
            $.ajax({
                url: 'https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=3',
                type: 'GET',
                headers: {
                    'Authorization': `Bearer ${hash.access_token}`
                },
                success: (data) => {
                    console.log(data);
                    let insert = '';
                    data
                    data['items'].forEach(element => {
                        let genres = '';
                        element.genres.forEach(genre => {
                            genres = genres + ` - ${genre}`;
                        })
                        insert = insert + `<div class="card bg-dark" style="width: 18rem;">
                        <img src="${element.images[0].url}" class="card-img-top" alt="${element.name}">
                        <div class="card-body bg-dark">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">${genres.substring(3)}</p>
                      </div>
                      <ul class="list-group list-group-flush bg-dark">
                        <li class="list-group-item bg-dark">${element.followers.total} followers</li>
                        <li class="list-group-item bg-dark">${element.popularity} ème</li>
                      </ul>
                        </div>
                      </div>`;
                    })
                    $('.card-artist').html(insert);
                }
            })
        })

        $('.option-un-track').click((data) => {
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
                        let artists = '';
                        element.artists.forEach(artist => {
                            artists = artists + ` - ${artist.name}`;
                        })
                        insert = insert + `<div class="card bg-dark" style="width: 18rem;">
                        <img src="${element.album.images[0].url}" class="card-img-top" alt="${element.name}">
                        <div class="card-body bg-dark">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">par ${artists.substring(3)}</p>
                      </div>
                      <ul class="list-group list-group-flush bg-dark">
                        <li class="list-group-item bg-dark">${element.popularity} ème</li>
                      </ul>
                        </div>
                      </div>`;
                        id++;
                    })
                    $('.card-tracks').html(insert);
                }
            })
        })

        $('.option-deux-track').click((data) => {
            $.ajax({
                url: 'https://api.spotify.com/v1/me/top/tracks?time_range=medium_term&limit=3',
                type: 'GET',
                headers: {
                    'Authorization': `Bearer ${hash.access_token}`
                },
                success: (data) => {
                    console.log(data);
                    let insert = '';
                    let id = 1;
                    data['items'].forEach(element => {
                        let artists = '';
                        element.artists.forEach(artist => {
                            artists = artists + ` - ${artist.name}`;
                        })
                        insert = insert + `<div class="card bg-dark" style="width: 18rem;">
                        <img src="${element.album.images[0].url}" class="card-img-top" alt="${element.name}">
                        <div class="card-body bg-dark">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">par ${artists.substring(3)}</p>
                      </div>
                      <ul class="list-group list-group-flush bg-dark">
                        <li class="list-group-item bg-dark">${element.popularity} ème</li>
                      </ul>
                        </div>
                      </div>`;
                        id++;
                    })
                    $('.card-tracks').html(insert);
                }
            })
        })

        $('.option-trois-track').click((data) => {
            $.ajax({
                url: 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=3',
                type: 'GET',
                headers: {
                    'Authorization': `Bearer ${hash.access_token}`
                },
                success: (data) => {
                    console.log(data);
                    let insert = '';
                    let id = 1;
                    data['items'].forEach(element => {
                        let artists = '';
                        element.artists.forEach(artist => {
                            artists = artists + ` - ${artist.name}`;
                        })
                        insert = insert + `<div class="card bg-dark" style="width: 18rem;">
                        <img src="${element.album.images[0].url}" class="card-img-top" alt="${element.name}">
                        <div class="card-body bg-dark">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="card-text">par ${artists.substring(3)}</p>
                      </div>
                      <ul class="list-group list-group-flush bg-dark">
                        <li class="list-group-item bg-dark">${element.popularity} ème</li>
                      </ul>
                        </div>
                      </div>`;
                        id++;
                    })
                    $('.card-tracks').html(insert);
                }
            })
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