import $ from 'jquery';
import NavBar from './NavBar';

export default class Hue {
    
    corps;
    static user;

    constructor() {
        this.corps = `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">

    	</nav>
        <header class="header" id="header1">
            <div class="center">
                <div class="caption animated bounceInDown">
                    <h2 class="title name display-3">Philips Hue</h2>
                    <p class="text">Bienvenue dans l'intégrateur philips hue. Changer la couleur de vos appareils Philips hue en fonction de la musique en cours.</p>
                    <p class="text">Commençons.</p>
                </div>	
            </div>
            <!-- scroll-down -->
            <i class="scroll fa fa-angle-double-down"></i>
        </header>
        <!-- header #2 -->
        <header class="header" id="header2">
	        <div class="left">
		        <div class="caption">
			        <h2 class="title display-3 animated bounceInLeft">Recherche des ponts hue.</h2>
            <p class="text animated bounceInLeft">Selectionnez votre pont hue dans la liste.</p>
            <ul class="list-group bg-dark list-pont">
          </ul>
          <button class="btn btn-success allumer">Allumer lumière 1</button>
          <button class="btn btn-danger eteindre">Eteindre lumière 1</button>
		</div>	
	</div>
	<i class="scroll fa fa-angle-double-down"></i>
</header>`;
    }

    render() {
        const nav = new NavBar();
        $('body').html('');
        $('body').html(this.corps);
        nav.render();

        var hue = jsHue();
        hue.discover().then(bridges => {
            if(bridges.length === 0) {
                console.log('No bridges found. :(');
            }
            else {
                let ponts = '';
                let id = 1;
                bridges.forEach(b => {
                    console.log(b);
                    console.log('Pont trouvé à ladresse %s.', b.internalipaddress);
                    ponts = ponts + `<a href="#" class="pont${id}"><li class="list-group-item bg-dark pont${id}"><img src="../images/devicesBridgesV2.svg">${b.internalipaddress}</li></a>`;
                    console.log(`pont${id}`);
                    $('.list-pont').html(ponts);
                    $(`.pont${id}`).click((data) => {
                        event.preventDefault();
                        console.log(`je clique sur ${b.internalipaddress}`);
                        var bridge = hue.bridge(b.internalipaddress);

                        // create user account (requires link button to be pressed)
                        bridge.createUser('myApp#testdevice').then(data => {
                            // extract bridge-generated username from returned data
                            var username = data[0].success.username;

                            console.log('New username:', username);

                            // instantiate user object with username
                             this.user = bridge.user(username);
                             console.log(this.user);
                        });
                        return false;
                    })
                });
                
            }
        }).catch(e => console.log('Error finding bridges', e));
        console.log(this.user);
        console.log(hue.bridge('192.168.0.13')) 
        $('.allumer').click((data) => {
            console.log('allumer');
            console.log(this.user);
            this.user.setLightState(1, { on: true });
        })
        $('.eteindre').click((data) => {
            console.log('eteindre');
            this.user.setLightState(1, { on: false });
        })
    }

}