import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../services/product.service";
import { findAll, loadProducts } from "../products.actions";
import { catchError, EMPTY, exhaustMap, map } from "rxjs";

@Injectable()
export class ProductsEffects {

    private actions$ = inject(Actions);
    private productService = inject(ProductService);

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProducts),
            exhaustMap(() => this.productService.findAll().pipe(
                map((products) => findAll({ products })),
                catchError(() => EMPTY)
            ))
        ));
}