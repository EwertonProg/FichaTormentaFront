import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TalentoConsultaComponent} from "./page/talento/consulta/talento-consulta.component";
import {TalentoCadastroComponent} from "./page/talento/cadastro/talento-cadastro.component";


const routes: Routes = [
  {path: 'consultar-talento', component: TalentoConsultaComponent},
  {path: 'cadastrar-talento', component: TalentoCadastroComponent},
  {path: 'editar-talento/:id', component: TalentoCadastroComponent},
  {path: '', redirectTo: 'app-home', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
