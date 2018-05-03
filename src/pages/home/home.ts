import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Carro } from '../../modelos/carro';
import { HttpErrorResponse } from '@angular/common/http';
import { CarrosServiceProvider } from '../../providers/carros-service/carros-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public carros: Carro[];  

  constructor(public navCtrl: NavController, 
    private _loadingCtrl: LoadingController,/*controlando load para carregamento da api*/
    private _alertCtrl: AlertController,
    private _carrosService: CarrosServiceProvider) { 

    let loading = this._loadingCtrl.create({
      content: 'Buscando carros...'
    }); /*criando objeto da mensagem*/ 

    loading.present(); /*mostrando a mensagem*/

    this._carrosService.lista() // fazendo request na api
              .subscribe((carros) => { // pegando retorno do JSON
                  this.carros = carros; // colocando o retorno em this carros 

                  loading.dismiss(); /*fechando a pop up depois do metodo*/
              }, 
              (err: HttpErrorResponse) => {
                /*callback de erro*/
                  console.log(err);// printando o erro
                  loading.dismiss(); // fechando a caixa de mensagem

                  this._alertCtrl.create({ // creando alerta e especificando os atributos
                    title: 'Falha na conexão',
                    subTitle: 'Não foi possivel carregar a lista de carros, tente novamente mais tarde',
                    buttons: [
                      { text: 'Ok'} // atributo dos botoes
                    ]
                  }).present();
              }
            );
  }

}
