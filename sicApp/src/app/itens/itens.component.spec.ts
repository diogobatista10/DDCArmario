import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItensComponent } from './itens.component';
import { AppComponent } from '../app.component';
import { ProdutosComponent } from '../produtos/produtos.component';
import { MaterialComponent } from '../material/material.component';
import { AcabamentosComponent } from '../acabamentos/acabamentos.component';
import { CategoriasComponent } from '../categorias/categorias.component';
import { ProdutoDetailComponent } from '../produto-detail/produto-detail.component';
import { MessagesComponent } from '../messages/messages.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ProdutoSearchComponent } from '../produto-search/produto-search.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from '../app-routing.module';

describe('ItensComponent', () => {
  let component: ItensComponent;
  let fixture: ComponentFixture<ItensComponent>;

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
    fixture = TestBed.createComponent(ItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
