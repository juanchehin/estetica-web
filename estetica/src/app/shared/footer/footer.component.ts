import { Component, OnInit } from '@angular/core';
import { ConfiguracionesService } from 'src/app/services/configuraciones.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent implements OnInit {

  configuraciones: any;
  categoriasDestacadas: any;

  twitter = '';
  facebook = '';
  youtube = '';
  instagram = '';
  direccion = '';
  telefono = '';
  email = '';
  monto_envio_gratis = 0;

  constructor(
    private configuracionesService: ConfiguracionesService,
    private router: Router
   ) {

    }

  ngOnInit() {
    this.listarDatosFooter();
  }

  // ==============================
  listarDatosFooter()
  {

  }

  // ==============================
  listarCategoriasDestacadas()
  {
   
  }

  goTwitter() {
    window.location.href='https://twitter.com/' + this.twitter;
}

goFacebook() {
  window.location.href='https://www.facebook.com/' + this.facebook;
}

goInstagram() {
  window.location.href='https://www.instagram.com/'+ this.instagram;
}

goYouTube() {
  window.location.href='https://www.youtube.com/' + this.youtube;
}


// ==================================================
// Carga
// ==================================================

async rutearCategoria(IdCategoria: any) {
  
  var url = "/categoria/" + IdCategoria;

  await this.router.navigateByUrl('.', { skipLocationChange: true });


  return this.router.navigateByUrl(url);

}

}
