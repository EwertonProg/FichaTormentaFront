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
import {TalentoCadastroComponent} from "../cadastro/talento-cadastro.component";
import {MatDialog} from "@angular/material";

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
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.inicializarFormulario();
    this.popularGruposTalento();
    this.popularOrigens();
    this.service.getAll().subscribe(retorno => {
      this.talentos = retorno;
      this.talentosFiltrados = retorno;
    })
  }

  filtrar() {
    this.talentosFiltrados = this.talentos;
    const nome = this.getAtributeValue("inputNome");
    if (!isNull(nome) && nome != "") {
      this.talentosFiltrados = this.talentosFiltrados.filter(value => value.nome.toUpperCase().includes(nome.toUpperCase()))
    }

    const idGrupoTalento = this.getAtributeValue("inputGrupoTalento");
    if (!isNull(idGrupoTalento) && idGrupoTalento != "") {
      this.talentosFiltrados = this.talentosFiltrados.filter(value => value.grupoTalento.id == idGrupoTalento)
    }

    const idOrigem = this.getAtributeValue("inputOrigem");
    if (!isNull(idOrigem) && idOrigem != "") {
      this.talentosFiltrados = this.talentosFiltrados.filter(value => value.origem.id == idOrigem)
    }
  }

  irCadastrarTalento() {
    // this.router.navigate(["/cadastrar-talento"]);
    const dialogRef = this.dialog.open(TalentoCadastroComponent);
    dialogRef.afterClosed().subscribe(value => {
      if (!isNullOrUndefined(value)) {
        this.talentos.push(value);
        this.filtrar();
      }
    });
  }

  getAtributeValue(atributeValue: string) {
    return isNullOrUndefined(this.form.get(atributeValue)) ? null : this.form.get(atributeValue).value
  }

  limparFormulario() {
    this.form.patchValue({
      inputNome: null,
      inputOrigem: null,
      inputGrupoTalento: null,
    });
    this.talentosFiltrados = this.talentos;
  }

  private inicializarFormulario() {
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
