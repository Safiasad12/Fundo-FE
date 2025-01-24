// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { DashboardComponent } from './dashboard.component';

// describe('DashboardComponent', () => {
//   let component: DashboardComponent;
//   let fixture: ComponentFixture<DashboardComponent>;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [DashboardComponent]
//     });
//     fixture = TestBed.createComponent(DashboardComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });




  /*

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data-service/data.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockRouter: any;
  let mockDataService: any;

  beforeEach(async () => {
    mockRouter = {
      navigate: jasmine.createSpy('navigate'),
    };

    mockDataService = {
      updateSearchQuery: jasmine.createSpy('updateSearchQuery'),
    };

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [MatMenuModule, MatIconModule, FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: DataService, useValue: mockDataService },
        MatIconRegistry,
        DomSanitizer,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });


  describe('Element Rendering', () => {
    it('should render the navbar with the menu button', () => {
      const menuButton = fixture.debugElement.query(By.css('.navbar button[aria-label="menu button"]'));
      expect(menuButton).toBeTruthy();
    });

    it('should render the logo with the text "Keep"', () => {
      const logoText = fixture.debugElement.query(By.css('.logo')).nativeElement.textContent.trim();
      expect(logoText).toBe('Keep');
    });

    it('should render the search input', () => {
      const searchInput = fixture.debugElement.query(By.css('.search-bar input'));
      expect(searchInput).toBeTruthy();
    });

    it('should render the sidebar with all icons', () => {
      const sidebarIcons = fixture.debugElement.queryAll(By.css('.side-navbar button mat-icon'));
      expect(sidebarIcons.length).toBe(4); // Note, Edit, Archive, Trash
    });
  });

  describe('Validation Message Check', () => {
    it('should update the search query when input is provided', () => {
      const searchInput = fixture.debugElement.query(By.css('.search-bar input'));
      searchInput.nativeElement.value = 'Test Query';
      searchInput.triggerEventHandler('input', { target: searchInput.nativeElement });
      fixture.detectChanges();

      expect(component.searchQuery).toBe('Test Query');
      expect(mockDataService.updateSearchQuery).toHaveBeenCalledWith('Test Query');
    });
  });

  describe('API Call Check', () => {
    it('should call the data service with the search query', () => {
      component.searchQuery = 'New Query';
      component.handleSearchQuery();
      expect(mockDataService.updateSearchQuery).toHaveBeenCalledWith('New Query');
    });
  });

  describe('Navigation Check', () => {
    it('should navigate to the notes page when note icon is clicked', () => {
      component.handleSidebarIcons('note');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard/notes']);
    });

    it('should navigate to the archive page when archive icon is clicked', () => {
      component.handleSidebarIcons('archive');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard/archive']);
    });

    it('should navigate to the trash page when trash icon is clicked', () => {
      component.handleSidebarIcons('trash');
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard/trash']);
    });

    it('should clear localStorage and navigate to login on sign out', () => {
      spyOn(localStorage, 'clear');
      component.handleSignout();
      expect(localStorage.clear).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
    });
  });

  
});

*/
