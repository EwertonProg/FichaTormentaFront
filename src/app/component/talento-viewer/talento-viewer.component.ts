import {Component, Input, OnInit, Output} from '@angular/core';
import {Talento} from "../../entity/Talento";
import {Router} from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material";
import {TalentoCadastroComponent} from "../../page/talento/cadastro/talento-cadastro.component";

@Component({
  selector: 'app-talento-viewer',
  templateUrl: './talento-viewer.component.html',
  styleUrls: ['./talento-viewer.component.css']
})
export class TalentoViewerComponent implements OnInit {
  @Input()
  talento:Talento;

  constructor(private router: Router, private dialog: MatDialog) { }

  ngOnInit() {
  }

  hasEspecial():boolean{
    return this.talento.especial != "";
  }

  hasDescricao():boolean{
    return this.talento.descricao != "";
  }
  hasPreRequisito():boolean{
    return this.talento.preRequisito != "";
  }

  returnEspecial():string {
    return "Especial: "+this.talento.especial;
  }
  returnDescricao():string {
    return "<P>"+this.talento.descricao+"</P>";
  }
  returnPreRequisito():string {
    return "Pre-Requisito: "+this.talento.preRequisito;
  }
  returnBeneficio():string {
    return "Beneficio: "+this.talento.beneficio;
  }

  irEditarTalento() {
    // this.router.navigate(["/editar-talento", this.talento.id]);
    const config = new MatDialogConfig();
    // config.maxHeight  = '80%';
    config.data =  {id: this.talento.id};
    this.dialog.open(TalentoCadastroComponent, config);
  }



}
