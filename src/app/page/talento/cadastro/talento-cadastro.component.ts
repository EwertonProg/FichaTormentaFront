import {Component, OnInit, ViewChild} from "@angular/core";
import {TalentoService} from "../../../service/talento.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Talento} from "../../../entity/Talento";
import {GrupoTalentoService} from "../../../service/grupo_talento.service";
import {OrigemService} from "../../../service/origem.service";
import {GrupoTalento} from "../../../entity/GrupoTalento";
import {Origem} from "../../../entity/Origem";
import {EditorTextoComponent} from "../../../component/editor-texto/editor-texto.component";
import {ActivatedRoute} from "@angular/router";
import {isNullOrUndefined} from "util";
import {MatSnackBar} from '@angular/material/snack-bar';
@Component({
  selector: 'talento-cadastro',
  templateUrl: './talento-cadastro.component.html',
  styleUrls: ['./talento-cadastro.component.css']
})
export class TalentoCadastroComponent implements OnInit {
  form: FormGroup;
  talento: Talento = new Talento();
  gruposTalento: GrupoTalento[];
  origens: Origem[];
  edicao: boolean = false;

  @ViewChild('beneficioTexto', {static: false})
  beneficioTexto: EditorTextoComponent;

  @ViewChild('especialTexto', {static: false})
  especialTexto: EditorTextoComponent;

  @ViewChild('preRequisitoTexto', {static: false})
  preRequisitoTexto: EditorTextoComponent;

  constructor(private service: TalentoService,
              private grupoTalentoService: GrupoTalentoService,
              private origemService: OrigemService,
              private router: ActivatedRoute,
              private dialog:MatSnackBar) {
  }

  ngOnInit(): void {
    this.iniciarFormulario();
    this.popularCombos();

    this.router.params.subscribe(parametros => {
      if (!isNullOrUndefined(parametros['id'])) {
        this.service.findById(parametros['id']).subscribe(
          talentoRetorno => this.carregarTalento(talentoRetorno)
        );
        this.edicao = true;
      }
    });

  }

  private carregarTalento(talento: Talento) {
    this.talento = talento;
    this.form.patchValue({
      nome: talento.nome,
      grupoTalento: talento.grupoTalento.id,
      origem: talento.origem.id,
      numPagOrigem: talento.origem.numPagina,
      descricao: talento.descricao
    });
    this.beneficioTexto.texto = talento.beneficio;
    this.especialTexto.texto = talento.especial;
    this.preRequisitoTexto.texto = talento.preRequisito;
  }

  private iniciarFormulario() {
    this.form = new FormGroup({
      nome: new FormControl(null, Validators.required),
      grupoTalento: new FormControl(null, Validators.required),
      origem: new FormControl(null, Validators.required),
      numPagOrigem: new FormControl(null),
      descricao: new FormControl(null),
    })
  }

  private salvarTalento() {
    this.talento.nome = this.form.get('nome').value;
    this.talento.descricao = this.form.get('descricao').value;
    this.talento.beneficio = this.beneficioTexto.texto;
    this.talento.especial = this.especialTexto.texto;
    this.talento.preRequisito = this.preRequisitoTexto.texto;
    this.service.save(this.talento).subscribe(value => {
      this.dialog.open("Talento salvo com sucesso!!","OK!");
      this.carregarTalento(value);
    });
  }

  private popularCombos() {
    this.popularGruposTalento();
    this.popularOrigens();
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

  private selecionarOrigem(origem: Origem) {
    this.talento.origem = origem;
  }

  private selecionarGrupoTalento(grupo: GrupoTalento) {
    this.talento.grupoTalento = grupo;
  }

}
