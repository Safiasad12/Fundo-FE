import { Component } from '@angular/core';
import { DataService } from 'src/app/services/data-service/data.service';
import { NoteService } from 'src/app/services/note-service/note.service';

@Component({
  selector: 'app-notes-container',
  templateUrl: './notes-container.component.html',
  styleUrls: ['./notes-container.component.scss']
})
export class NotesContainerComponent {

notesList:any[] = []

searchQuery: string ="";

constructor(private noteService: NoteService, private dataService: DataService){}

  ngOnInit() {
    this.noteService.fetchNotesApiCall().subscribe({
      next:(res:any)=>{

        console.log(res)

        for(let note of res.notes){

          if(note.isArchive || note.isTrash){
            continue;
          }
          else{
            this.notesList.unshift(note);
          }
        }
      },
      error: (err)=>{
        console.log(err);
        
      }

     })

     this.dataService.currentSearchQuery.subscribe({
      next: (res)=>{
        console.log(res);
        this.searchQuery=res;
        
      }
     })
   }

   handleNotesList($event: {data: any, action: string}) {
    const {data, action} = $event
    console.log("parent method called", $event);
    if(action === 'add'){
      this.notesList = [data, ...this.notesList]
    }
    else if(action === 'archive' || action === 'trash'){
      this.notesList=this.notesList.filter((note: any)=> note._id !== data._id)
      localStorage.setItem("_id", data._id)
      // console.log(data._id);
    }
  
   }

}
