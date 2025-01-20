import { Component } from '@angular/core';
import { NoteService } from 'src/app/services/note-service/note.service';

@Component({
  selector: 'app-archive-container',
  templateUrl: './archive-container.component.html',
  styleUrls: ['./archive-container.component.scss']
})
export class ArchiveContainerComponent {

  archiveNotesList:any[] = []
  
  constructor(private noteService: NoteService){}
  
    ngOnInit() {
      this.noteService.fetchNotesApiCall().subscribe({
        next:(res:any)=>{
  
  
          for(let note of res.notes){
            if(note.isArchive){
              this.archiveNotesList.push(note);
            }
          }
          
        },
        error: (err)=>{
          console.log(err);
          
        }
  
      })
      console.log(this.archiveNotesList);
    }

    handleArchiveNotesList($event: {data: any, action: string}) {
      const {data, action} = $event
      console.log("parent method called", $event);
  
      if(action === 'delete' || action === 'restore'){
        this.archiveNotesList=this.archiveNotesList.filter((note: any)=> note._id !== data._id)
      }
    
    }

}
