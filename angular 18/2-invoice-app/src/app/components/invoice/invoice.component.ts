import { Invoice } from '../../models/invoice';
import { Item } from '../../models/item';
import { ClientViewComponent } from '../client-view/client-view.component';
import { CompanyViewComponent } from '../company-view/company-view.component';
import { FormItemComponent } from '../form-item/form-item.component';
import { InvoiceViewComponent } from '../invoice-view/invoice-view.component';
import { ListItemsComponent } from '../list-items/list-items.component';
import { TotalComponent } from '../total/total.component';
import { InvoiceService } from './../../services/invoice.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [
    InvoiceViewComponent,
    ClientViewComponent,
    CompanyViewComponent,
    ListItemsComponent,
    TotalComponent,
    FormItemComponent,
  ],
  templateUrl: './invoice.component.html',
})
export class InvoiceComponent implements OnInit {
  private invoiceService: InvoiceService = inject(InvoiceService);
  invoice: Invoice = new Invoice();

  ngOnInit(): void {
    this.invoice = this.invoiceService.getInvoice();
  }

  onAddItem(item: Item) {
    this.invoice = this.invoiceService.save(item);
  }

  onRemove(id: number) {
    this.invoice = this.invoiceService.removeItem(id);
  }
}
