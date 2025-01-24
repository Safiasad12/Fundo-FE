import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { ARCHIVE_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, MORE_ICON, REMINDER_ICON, RESTORE_ICON, DELETE_FOREVER_ICON, UNARCHIVE_ICON, NOTE_ICON } from '../../../assets/svg-icons';
import { NoteService } from 'src/app/services/note-service/note.service';
import { Dialog } from '@angular/cdk/dialog';
import { MatDialog } from '@angular/material/dialog';
import { AddNoteComponent } from '../add-note/add-note.component';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
  host: {
    class: "app-note-card-cnt"
  }
})
export class NoteCardComponent {
 @Input() noteDetails:any={};
 @Input() container:string='';
 @Output() updateNotesList = new EventEmitter()



 constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private noteService: NoteService, private dialog: MatDialog  ) {
  this.iconRegistry.addSvgIconLiteral('reminder-icon', this.sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
  this.iconRegistry.addSvgIconLiteral('collabrator-icon', this.sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
  this.iconRegistry.addSvgIconLiteral('color-palatte-icon', this.sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
  this.iconRegistry.addSvgIconLiteral('archive-icon', this.sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
  this.iconRegistry.addSvgIconLiteral('image-icon', this.sanitizer.bypassSecurityTrustHtml(IMG_ICON));
  this.iconRegistry.addSvgIconLiteral('more-icon', this.sanitizer.bypassSecurityTrustHtml(MORE_ICON));
  this.iconRegistry.addSvgIconLiteral('restore-icon', this.sanitizer.bypassSecurityTrustHtml(RESTORE_ICON));
  this.iconRegistry.addSvgIconLiteral('delete-forever-icon', this.sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));
  this.iconRegistry.addSvgIconLiteral('unarchive-icon', this.sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON));
 

}

handleEditNote() {
  const dialogRef = this.dialog.open(AddNoteComponent, {
    data: {
      noteDetails:this.noteDetails,
      openEditNote: true
      
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log(result);
    // this.updateNotesList.emit({data: result,  action: 'update'})
    this.handleNoteIconsClick("update", result)
  
  });
}


handleNoteIconsClick(action: string, color: string = "#ffffff"){

  if(action === 'archive'){
    this.noteService.toggleArchiveApiCall(this.noteDetails._id).subscribe({
      next: (res)=>{
        console.log(res);
        
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  else if(action === 'trash'){
    this.noteService.toggleTrashApiCall(this.noteDetails._id).subscribe({
      next: (res)=>{
        console.log(res);
        
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  else if(action === 'unarchive'){
    this.noteService.toggleArchiveApiCall(this.noteDetails._id).subscribe({
      next: (res)=>{
        console.log(res);
        
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  else if(action === 'color'){
    console.log(color);
    this.noteService.changeColorApiCall(this.noteDetails._id, {"color": color}).subscribe({
      next: (res)=>{
        // console.log(res);
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  else if(action === 'delete'){

    this.noteService.deletePermanentlyApiCall(this.noteDetails._id).subscribe({
      next: (res)=>{
        console.log(res);
      },
      error: (err)=>{
        console.log(err);
      }
    })

  }

  else if(action === 'restore'){
    this.noteService.toggleTrashApiCall(this.noteDetails._id).subscribe({
      next: (res)=>{
        console.log(res);
        
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }


  this.updateNotesList.emit({data: action == 'color' ? this.noteDetails.color= color : action == "update" ? color : this.noteDetails, action})
  
 
}

}


