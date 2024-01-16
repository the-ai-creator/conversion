import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { CurrencyExchangeService } from '../../services/currencyExchangeService';

@Component({
  selector: 'currency-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-box.component.html',
  styleUrl: './currency-box.component.less',
})
export class CurrencyBoxComponent {
  @Input() currencyList: any;

  itemsList: any = [];
  convertedAmount: number = 0;

  constructor(private currencyExchangeService: CurrencyExchangeService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currencyList']) {
      for (const key in this.currencyList) {
        this.currencyList[key].name = `${this.currencyList[key].name} - ${key}`;
        this.itemsList.push(this.currencyList[key]);
      }
    }
  }

  ngOnInit() {}

  convertAmount() {
    let firstCurrency = document.getElementById(
      'select-box'
    ) as HTMLSelectElement;
    let secondCurrency = document.getElementById(
      'select-box2'
    ) as HTMLSelectElement;
    if (firstCurrency && secondCurrency) {
      var selectedOptionOne =
        firstCurrency.options[firstCurrency.selectedIndex];
      var selectedOptionTwo =
        secondCurrency.options[secondCurrency.selectedIndex];
      const baseCurrency = selectedOptionOne.value.toString().split('-');
      const endCurrency = selectedOptionTwo.value.toString().split('-');

      let amount = document.getElementById('styled-input') as HTMLInputElement;

      const itemOne = baseCurrency[baseCurrency.length - 1]
        .trim()
        .toLocaleLowerCase();
      const itemTwo = endCurrency[endCurrency.length - 1]
        .trim()
        .toLocaleLowerCase();
      this.currencyExchangeService
        .getConversion(itemOne, itemTwo)
        .subscribe((data) => {
          if (amount && data) {         
            this.convertedAmount = parseFloat(amount.value) * data[itemTwo];            
          }
        });
    }
  }

  validatePositiveNumber(input: any) {
    if (input) {
      const inputValue = input.data;

      const isValid = /^\d*(\.\d*)?$/.test(inputValue);
      let errorText = document.getElementById('error-message');
      const convertBtn = document.getElementsByClassName('convertBtn');

      if (!isValid) {
        if (errorText) {
          errorText.innerText = 'Please enter only numeric characters.';
          if (input.target.value) {
            input.target.value = inputValue.replace(/\D/g, '');
          }

          if (convertBtn) {
            (convertBtn[0] as HTMLElement).style.display = 'none';
          }
        }
      } else {
        (convertBtn[0] as HTMLElement).style.display = 'block';
        if (errorText && errorText !== null) {
          errorText.innerText = '';
        }
      }
    }
  }
}
