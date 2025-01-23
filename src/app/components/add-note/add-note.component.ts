import { Component, EventEmitter, Inject, Optional, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { REMINDER_ICON, COLOR_PALATTE_ICON, COLLABRATOR_ICON, ARCHIVE_ICON, IMG_ICON, MORE_ICON } from '../../../assets/svg-icons';
import { NoteService } from 'src/app/services/note-service/note.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.scss']
})
export class AddNoteComponent {

  title: string = "";
  description: string = "";
  color: string ="#ffffff";
  isArchive: boolean = false
  isTrash: boolean = false
  
  isExpanded = false;

  submitted: boolean = false;
  @Output() updateNotesList = new EventEmitter()



  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private noteService: NoteService, @Optional() @Inject(MAT_DIALOG_DATA) public data: any, @Optional() public dialogRef: MatDialogRef<AddNoteComponent>) {

    console.log("this is data");
    console.log(data);

    if(data) {
    this.isExpanded = data?.openEditNote
    this.title = data?.noteDetails.title
    this.description = data?.noteDetails.description
    this.color = data?.noteDetails.color
    }
    
    
    iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
    iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
    iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));   
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('image-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
    iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));
  }

 

  handleBackGroundColorForInputField(color: string = this.color){

    this.color = color;

  }




  handleAddNoteIconsClick(action: string) {

    
    // note open
    if(this.isExpanded === false){ 
      this.isExpanded = !this.isExpanded; 
    }

   else{

    if(action === 'close' || action === 'archive'){
      this.isExpanded = !this.isExpanded; 
      if(!this.data){

        if(action==='archive'){
          this.isArchive = true;
        }
       
        this.noteService.addNoteApiCall({"title" :this.title, "description":this.description, "isArchive":this.isArchive, "color" : this.color}).subscribe({
          
          next: (res: any) => {
            console.log(res);
            if(action === 'close'){
              this.updateNotesList.emit({data: res.data, action: "add"})
            } 
          },
          error: (err: any) => {
            console.log(err);
            
          }
        });
 
      }
      this.color = "#ffffff";

    }
   
    if(this.data){

      if(action === 'close'){

        this.noteService.updateNoteApiCall(this.data.noteDetails._id, {"newTitle": this.title, "newDescription": this.description}).subscribe({
        
          next: (res)=>{
            console.log(res);
            
          },
          error: (err)=>{
          
            console.log(err);
            
          }
        })

      }
    
      this.dialogRef.close({...this.data.noteDetails, title:this.title, description:this.description})
    }

      this.title = ""
      this.description = ""

      
  }

   
    console.log(this.isArchive);
    
   } 
   
  }


