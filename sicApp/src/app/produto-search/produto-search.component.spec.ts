import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoSearchComponent } from './produto-search.component';
import { AppComponent } from '../app.component';
import { ProdutosComponent } from '../produtos/produtos.component';
import { MaterialComponent } from '../material/material.component';
import { AcabamentosComponent } from '../acabamentos/acabamentos.component';
import { CategoriasComponent } from '../categorias/categorias.component';
import { ItensComponent } from '../itens/itens.component';
import { ProdutoDetailComponent } from '../produto-detail/produto-detail.component';
import { MessagesComponent } from '../messages/messages.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';

describe('ProdutoSearchComponent', () => {
  let component: ProdutoSearchComponent;
  let fixture: ComponentFixture<ProdutoSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
