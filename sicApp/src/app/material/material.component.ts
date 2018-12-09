import { Component, OnInit } from '@angular/core';

import { Material } from '../model/material';
import { MaterialService } from '../services/material.service';
import { AcabamentoService } from '../services/acabamento.service';
import { Acabamento } from '../model/Acabamento';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-materiais',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  materiais: Material[];
  acabamentos: Acabamento[];
  aca: Acabamento;
  mat: Material;
 

  constructor(private materialService: MaterialService, private acabamentoService: AcabamentoService) { }

  ngOnInit() {
    this.getMateriais();
  }

  getMateriais(): void {
    this.materialService.getMateriais()
      .subscribe(materiais => this.materiais = materiais);
    this.acabamentoService.getAcabamentos().subscribe(acabamentos => this.acabamentos = acabamentos)
  }
  add(nome: string): void {
    //this.mat.nome = nome;
   // this.acabamentoService.getAcabamento(id).subscribe(acabamento => this.aca = acabamento);
   // this.mat.acabamento = this.aca;

    if (!nome) { return; }
    this.materialService.addMaterial({ nome } as Material)
      .subscribe(material => {
        this.materiais.push(material);
      });
  }
  delete(material: Material): void {
    this.materiais = this.materiais.filter(h => h !== material);
    this.materialService.deleteMaterial(material).subscribe();
  }
}
