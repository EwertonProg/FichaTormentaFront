import {GrupoTalento} from "./GrupoTalento";
import {Origem} from "./Origem";

export class Talento {
  id: number;
  nome: string;
  descricao: string;
  beneficio: string;
  especial: string;
  preRequisito: string;
  grupoTalento: GrupoTalento;
  origem: Origem;
}
