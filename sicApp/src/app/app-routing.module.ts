import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { ProdutoDetailComponent } from './produto-detail/produto-detail.component';
import { AcabamentosComponent } from './acabamentos/acabamentos.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ItensComponent } from './itens/itens.component';
import { MaterialComponent } from './material/material.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: ProdutoDetailComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'acabamentos', component: AcabamentosComponent },
  { path: 'categorias', component: CategoriasComponent },
  { path: 'itens', component: ItensComponent },
  { path: 'materiais', component: MaterialComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
