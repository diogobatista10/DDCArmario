import { Component, OnInit } from '@angular/core';

import { Material } from '../model/material';
import { MaterialService } from '../services/material.service';

@Component({
  selector: 'app-materiais',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  materiais: Material[];

  constructor(private materialService: MaterialService) { }

  ngOnInit() {
    this.getMateriais();
  }

  getMateriais(): void {
    this.materialService.getMateriais()
      .subscribe(materiais => this.materiais = materiais);
  }
  add(nome: string): void {

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
