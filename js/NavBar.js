import $ from 'jquery';
import Hue from './Hue';
import Profil from './Profil';

export default class {

    corps;

    constructor() {
        this.corps = `<a class="navbar-brand profil" href="#">Spotif</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <a class="nav-item nav-link hue" href="#">Philips Hue<img src="../images/devicesBridgesV2.svg"></a>
            </div>
        </div>`;
    }

    render() {
        $('.navbar').html(this.corps);
        $(".hue").click(function(event) {
            event.preventDefault();
            const hue = new Hue();
            hue.render();
            return false;
        })
        $(".profil").click(function(event) {
            event.preventDefault();
            const profil = new Profil();
            profil.render();
            return false;
        })
    }

}