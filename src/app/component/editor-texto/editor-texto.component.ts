import {Component, Input, OnInit} from '@angular/core';
import 'quill-mention'
import {TalentoService} from "../../service/talento.service";
import {isNullOrUndefined} from "util";
export const link = 'http://localhost:4200/editar-talento/';
@Component({
  selector: 'app-editor-texto',
  templateUrl: './editor-texto.component.html',
  styleUrls: ['./editor-texto.component.css']
})
export class EditorTextoComponent implements OnInit {
  @Input() label: string;
  @Input() readOnly: boolean;
  @Input() required: boolean;
  texto: string = '';

 static atValues: mentionDto[];

  configEditor = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike', {'color': ['green', 'blue']}],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        [{'script': 'sub'}, {'script': 'super'}],
        [{'indent': '-1'}, {'indent': '+1'}],
        [{'size': ['small', false, 'large', 'huge']}],
        [{'header': [1, 2, 3, 4, 5, 6, false]}],
        [{'font': []}],
        [{'align': []}],
        ['link'],
      ],
    },
    mention: {
      allowedChars: /^[A-Za-z\sÅÄÖåäö]*$/,
      mentionDenotationChars: ["Ø"],
      source: (searchTerm, renderList) => {
        let values;

          values = EditorTextoComponent.atValues;

        if (searchTerm.length === 0) {
          renderList(values, searchTerm);
        } else {
          const matches = [];
          for (var i = 0; i < values.length; i++)
            if (~values[i].value.toLowerCase().indexOf(searchTerm.toLowerCase())) matches.push(values[i]);
          renderList(matches, searchTerm);
        }
      },
    },
  };

  constructor(private talentoService: TalentoService) {
  }

  ngOnInit() {
    if(isNullOrUndefined(EditorTextoComponent.atValues)){
      EditorTextoComponent.atValues = [];
      this.talentoService.getAll().subscribe(talentos => talentos.forEach(talento => EditorTextoComponent.atValues.push(new mentionDto(talento.nome, link+talento.id))));
    }
  }

}

export class mentionDto{
  constructor(public value, public link){}
}
