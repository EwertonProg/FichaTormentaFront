import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './page/app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TalentoConsultaComponent} from "./page/talento/consulta/talento-consulta.component";
import {HttpClientModule} from '@angular/common/http';
import {ToolbarComponent} from "./component/toolbar/toolbar.component";
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatSelectModule,
  MatSnackBar,
  MatSnackBarModule,
  MatTableModule,
  MatToolbarModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TalentoCadastroComponent} from "./page/talento/cadastro/talento-cadastro.component";
import {EditorTextoComponent} from "./component/editor-texto/editor-texto.component";
import {QuillModule} from "ngx-quill";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import {WINDOW_PROVIDERS} from "./window.providers";
import {SampleService} from "./service/sample.service";

@NgModule({
  declarations: [
    ToolbarComponent,
    AppComponent,
    TalentoConsultaComponent,
    TalentoCadastroComponent,
    EditorTextoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    QuillModule,
    QuillModule.forRoot(),
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [MatSnackBar, WINDOW_PROVIDERS, SampleService, {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
