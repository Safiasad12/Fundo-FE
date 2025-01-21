import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ARCHIVE_ICON, EDIT_ICON, NOTE_ICON, TRASH_ICON, MENU_ICON } from '../../../assets/svg-icons';
import { DataService } from 'src/app/services/data-service/data.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {

  searchQuery: string = ''
  



  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private router: Router, private dataService: DataService){
    iconRegistry.addSvgIconLiteral('note-icon', sanitizer.bypassSecurityTrustHtml(NOTE_ICON));
    iconRegistry.addSvgIconLiteral('archive-icon', sanitizer.bypassSecurityTrustHtml(ARCHIVE_ICON));
    iconRegistry.addSvgIconLiteral('trash-icon', sanitizer.bypassSecurityTrustHtml(TRASH_ICON));
    iconRegistry.addSvgIconLiteral('edit-icon', sanitizer.bypassSecurityTrustHtml(EDIT_ICON));
    iconRegistry.addSvgIconLiteral('menu-icon', sanitizer.bypassSecurityTrustHtml(MENU_ICON));


   

  }

  handleSignout(){
    localStorage.clear();
    this.router.navigate([""]);
  }

  handleSearchQuery(){
    this.dataService.updateSearchQuery(this.searchQuery)
  }

  handleSidebarIcons($event: string){
    if($event==='note'){
      this.router.navigate(["/dashboard/notes"])
    }
    else if($event==='archive'){
      this.router.navigate(["/dashboard/archive"])
    }
    else if($event==='trash'){
      this.router.navigate(["/dashboard/trash"])
    }
    console.log($event);
    
  }

}
