import {Component, Input, OnInit} from '@angular/core';
import 'quill-mention'
import {TalentoService} from "../../service/talento.service";
import {isNullOrUndefined} from "util";
import {SampleService} from "../../service/sample.service";

@Component({
  selector: 'app-editor-texto',
  templateUrl: './editor-texto.component.html',
  styleUrls: ['./editor-texto.component.css']
})
export class EditorTextoComponent implements OnInit {
  static talentosMentio: mentionDto[];
  private static urlOrigin: string;
  @Input() label: string;
  @Input() readOnly: boolean;
  @Input() required: boolean;
  texto: string = '';
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

        values = EditorTextoComponent.talentosMentio;

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

  constructor(private talentoService: TalentoService,
              private sampleService: SampleService) {
  }

  ngOnInit() {
    if (isNullOrUndefined(EditorTextoComponent.talentosMentio)) {
      EditorTextoComponent.urlOrigin = this.sampleService.getOrigin() + /editar-talento/;
    }
    if (isNullOrUndefined(EditorTextoComponent.talentosMentio)) {
      EditorTextoComponent.talentosMentio = [];
      this.talentoService.getAll().subscribe(
        talentos => talentos.forEach(
          talento => EditorTextoComponent.talentosMentio.push(new mentionDto(talento.nome, EditorTextoComponent.urlOrigin + talento.id))));
    }
  }

}

export class mentionDto {
  constructor(public value, public link) {
  }
}
