import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { REMINDER_ICON, COLOR_PALATTE_ICON, COLLABRATOR_ICON } from '../../../assets/svg-icons';
import { NoteService } from 'src/app/services/note-service/note.service';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {

  title: string = "";
  description: string = "";
  
  isExpanded = false;

  submitted: boolean = false;
  @Output() updateNotesList = new EventEmitter()



  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private noteService: NoteService) {
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
    iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));   
  }

 


  handleAddNote() {

    if(this.isExpanded === false){ 
      this.isExpanded = !this.isExpanded; 
    }
   else{
    this.isExpanded = !this.isExpanded; 

    if(this.title !== "" || this.description !== ""){

      this.noteService.addNoteApiCall({"title" :this.title, "description":this.description}).subscribe({
        
        next: (res: any) => {
          console.log(res);
          this.updateNotesList.emit({data: res.data, action: "add"})
          console.log("child");
          
        },
        error: (err: any) => {
          console.log(err);
          
        }
      });

    }

     this.title = ""
     this.description = ""
      
    }
   }
   
  }


