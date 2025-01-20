import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ARCHIVE_ICON, COLLABRATOR_ICON, COLOR_PALATTE_ICON, IMG_ICON, MORE_ICON, REMINDER_ICON, RESTORE_ICON, DELETE_FOREVER_ICON, UNARCHIVE_ICON, NOTE_ICON } from '../../../assets/svg-icons';
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


 constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer ) {
  iconRegistry.addSvgIconLiteral('reminder-icon', sanitizer.bypassSecurityTrustHtml(REMINDER_ICON));
  iconRegistry.addSvgIconLiteral('collabrator-icon', sanitizer.bypassSecurityTrustHtml(COLLABRATOR_ICON));
  iconRegistry.addSvgIconLiteral('color-palatte-icon', sanitizer.bypassSecurityTrustHtml(COLOR_PALATTE_ICON));
  iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
  iconRegistry.addSvgIconLiteral('image-icon', sanitizer.bypassSecurityTrustHtml(IMG_ICON));
  iconRegistry.addSvgIconLiteral('more-icon', sanitizer.bypassSecurityTrustHtml(MORE_ICON));
  iconRegistry.addSvgIconLiteral('restore-icon', sanitizer.bypassSecurityTrustHtml(RESTORE_ICON));
  iconRegistry.addSvgIconLiteral('delete-forever-icon', sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON));
  iconRegistry.addSvgIconLiteral('unarchive-icon', sanitizer.bypassSecurityTrustHtml(UNARCHIVE_ICON));
 

}
handleNoteIconsClick(action: string){
  this.updateNotesList.emit({data: this.noteDetails, action})
}
}