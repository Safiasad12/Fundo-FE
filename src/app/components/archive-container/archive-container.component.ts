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
  
  
          // for(let note of res.notes){
          //   if(note.isArchive){
          //     this.archiveNotesList.push(note);
          //   }
          // }

          this.archiveNotesList=res.notes.filter((note: any)=> note.isArchive)
          
        },
        error: (err)=>{
          console.log(err);
          
        }
  
      })
      console.log(this.archiveNotesList);
    }

    handleArchiveNotesList($event: {data: any, action: string}) {
      const {data, action} = $event
  
      if(action === 'unarchive' || action === 'trash'){
        this.archiveNotesList=this.archiveNotesList.filter((note: any)=> note._id !== data._id)
      }
    
    }

}
