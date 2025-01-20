import { Component } from '@angular/core';
import { NoteService } from 'src/app/services/note-service/note.service';

@Component({
  selector: 'app-trash-container',
  templateUrl: './trash-container.component.html',
  styleUrls: ['./trash-container.component.scss']
})
export class TrashContainerComponent {

   trashNotesList:any[] = []
    
    constructor(private noteService: NoteService){}
    
      ngOnInit() {
        this.noteService.fetchNotesApiCall().subscribe({
          next:(res:any)=>{
    
    
            for(let note of res.notes){
              if(note.isTrash){
                this.trashNotesList.push(note);
              }
            }
            
          },
          error: (err)=>{
            console.log(err);
            
          }
    
        })
      }

      handleTrashNotesList($event: {data: any, action: string}) {
        const {data, action} = $event
        console.log("parent method called", $event);
    
        if(action === 'delete' || action === 'restore'){
          this.trashNotesList=this.trashNotesList.filter((note: any)=> note._id !== data._id)
        }
      
       }
  

}
