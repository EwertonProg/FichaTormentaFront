import {Component, OnInit} from "@angular/core";
import {TalentoService} from "../../../service/talento.service";
import {Talento} from "../../../entity/Talento";
import {FormControl, FormGroup} from "@angular/forms";
import {MatTableDataSource} from "@angular/material";
import {Router} from "@angular/router";
import {SampleService} from "../../../service/sample.service";

@Component({
  selector: 'talento-consulta',
  templateUrl: './talento-consulta.component.html',
  styleUrls: ['./talento-consulta.component.css']
})
export class TalentoConsultaComponent implements OnInit {
  talentos: MatTableDataSource<Talento> = new MatTableDataSource();
  form: FormGroup;
  displayedColumns: string[] = ['nome', 'grupoTalento', 'origem', 'acao'];

  constructor(private service: TalentoService,
              private router: Router,
              private sampleService: SampleService) {
  }

  ngOnInit(): void {
    this.initializeForm();
    // this.service.getAll().subscribe(retorno => this.talentos.data = retorno)
  }

  buscar() {
    this.service.getAll().subscribe(value => {
      this.talentos.data = value;
    });
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

  private initializeForm() {
    this.form = new FormGroup({
      inputNome: new FormControl(''),
      inputOrigem: new FormControl(''),
      inputGrupoTalento: new FormControl('')
    })
  }
}
