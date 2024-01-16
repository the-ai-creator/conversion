import { Component, ViewEncapsulation } from '@angular/core';
import { mockDate } from '../../mocks/mocks';
import { CurrencyExchangeService } from '../../services/currencyExchangeService';
import { CurrencyBoxComponent } from '../currency-box/currency-box.component';
// import { image } from "../../images/world.jpg"


@Component({
  selector: 'app-main',
  providers: [CurrencyExchangeService],
  templateUrl: './main.component.html',
  standalone: true,
  imports:[CurrencyBoxComponent],
  styleUrl: './main.component.less',
  encapsulation: ViewEncapsulation.None
})
export class MainComponent {

  currencyItems:any = {};
  worldImage = "../../images/world.jpg"
  
  constructor(private currencyExchangeService: CurrencyExchangeService){

    this.currencyExchangeService.getData().subscribe(data => {
      this.currencyItems = data;      
    });

  }

}
