import { Produto } from './Produto';
import { Acabamento } from './acabamento';
import { Dimensao } from './dimensao';
import { Material } from './Material';

export class Item {
  _id: number;
  produto: Produto;
  price: number;
  material: Material;
  acabamento: Acabamento;
  dimensao: Dimensao;
 }
