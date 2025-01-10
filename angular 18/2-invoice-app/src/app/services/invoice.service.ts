import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice';
import { invoiceData } from '../data/invoice.data';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private invoice: Invoice = invoiceData;
  
  constructor() { }


  getInvoice(): Invoice {
    return {... this.invoice, total: this.getTotal()};
  }

  save(item: Item): Invoice {
    this.invoice.items = [...this.invoice.items, item];
    return {... this.invoice, total: this.getTotal()};
  }
  
  removeItem(id: number): Invoice {
    this.invoice.items = this.invoice.items.filter(item => item.id !== id);
    return {... this.invoice, total: this.getTotal()};
  }

  getTotal(): number {
    return this.calculateTotal(this.invoice.items);
  }

  calculateTotal(items: Item[]): number {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

}
