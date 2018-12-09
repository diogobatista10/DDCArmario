import { NgModule }       from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { AppComponent }         from './app.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { MessagesComponent }    from './messages/messages.component';
import { AppRoutingModule }     from './app-routing.module';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoDetailComponent } from './produto-detail/produto-detail.component';
import { MaterialComponent } from './material/material.component';
import { AcabamentosComponent } from './acabamentos/acabamentos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ItensComponent } from './itens/itens.component';
import { ProdutoSearchComponent } from './produto-search/produto-search.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    ProdutosComponent,
    MaterialComponent,
    AcabamentosComponent,
    CategoriasComponent,
    ItensComponent,
    ProdutoDetailComponent,
    MessagesComponent,
    DashboardComponent,
    ProdutoSearchComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }