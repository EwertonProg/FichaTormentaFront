import {Component, OnInit} from "@angular/core";
import {TalentoService} from "../../../service/talento.service";
import {Talento} from "../../../entity/Talento";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {isNull, isNullOrUndefined} from "util";
import {GrupoTalentoService} from "../../../service/grupo_talento.service";
import {OrigemService} from "../../../service/origem.service";
import {GrupoTalento} from "../../../entity/GrupoTalento";
import {Origem} from "../../../entity/Origem";

@Component({
  selector: 'talento-consulta',
  templateUrl: './talento-consulta.component.html',
  styleUrls: ['./talento-consulta.component.css']
})
export class TalentoConsultaComponent implements OnInit {
  talentos: Talento[] = [];
  talentosFiltrados: Talento[] = [];
  form: FormGroup;
  gruposTalento: GrupoTalento[];
  origens: Origem[];

  constructor(private service: TalentoService,
              private grupoTalentoService: GrupoTalentoService,
              private origemService: OrigemService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.initializeForm();
    this.popularGruposTalento();
    this.service.getAll().subscribe(retorno => {
      this.talentos = retorno;
      this.talentosFiltrados = retorno;
    })
  }

  filter() {
    debugger;
    this.talentosFiltrados = this.talentos;
    const nome = this.getAtributeValue("inputNome");
    if (!isNull(nome) && nome != "") {
      this.talentosFiltrados = this.talentosFiltrados.filter(value => value.nome.toUpperCase().includes(nome.toUpperCase()))
    }

    const idGrupoTalento = this.getAtributeValue("inputGrupoTalento");
    if (!isNull(idGrupoTalento) && idGrupoTalento != "") {
      this.talentosFiltrados = this.talentosFiltrados.filter(value => value.grupoTalento.id == idGrupoTalento)
    }
  }

  irEditarTalento(idTalento: number) {
    this.router.navigate(["/editar-talento", idTalento]);
  }

  irCadastrarTalento() {
    this.router.navigate(["/cadastrar-talento"]);
  }

  irVizualizarTalento(idTalento: number) {
    this.router.navigate(["/vizualizar-talento", idTalento]);
  }

  getAtributeValue(atributeValue: string) {
    return isNullOrUndefined(this.form.get(atributeValue)) ? null : this.form.get(atributeValue).value
  }

  private initializeForm() {
    this.form = new FormGroup({
      inputNome: new FormControl(''),
      inputOrigem: new FormControl(''),
      inputGrupoTalento: new FormControl('')
    })
  }


  private popularOrigens() {
    this.origemService.getAll().subscribe(value => {
      this.origens = value
    })
  }

  private popularGruposTalento() {
    this.grupoTalentoService.getAll().subscribe(value => {
      this.gruposTalento = value
    })
  }

}
