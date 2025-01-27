import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DataService } from 'src/app/services/data-service/data.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';  // Add this if you're using mat-button
import { MatTooltipModule } from '@angular/material/tooltip'; // Add this if you're using matTooltip
import { MatMenuModule } from '@angular/material/menu';       // Correct import for MatMenuModule

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockDataService: jasmine.SpyObj<DataService>;
  let mockIconRegistry: jasmine.SpyObj<MatIconRegistry>;
  let mockSanitizer: jasmine.SpyObj<DomSanitizer>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockDataService = jasmine.createSpyObj('DataService', ['updateSearchQuery', 'getIdFromToken']);
    mockIconRegistry = jasmine.createSpyObj('MatIconRegistry', ['addSvgIconLiteral']);
    mockSanitizer = jasmine.createSpyObj('DomSanitizer', ['bypassSecurityTrustHtml']);

    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        MatMenuModule,       
        MatButtonModule,     
        MatTooltipModule      
      ],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: DataService, useValue: mockDataService },
        { provide: MatIconRegistry, useValue: mockIconRegistry },
        { provide: DomSanitizer, useValue: mockSanitizer },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call handleSignout and navigate to home', () => {
    spyOn(localStorage, 'clear');
    component.handleSignout();
    expect(localStorage.clear).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['']);
  });

  it('should call handleSearchQuery and update search query', () => {
    const query = 'test search query';
    component.searchQuery = query;
    component.handleSearchQuery();
    expect(mockDataService.updateSearchQuery).toHaveBeenCalledWith(query);
  });

  it('should call handleSidebarIcons and navigate to correct route', () => {
    component.handleSidebarIcons('note');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard/notes']);
    
    component.handleSidebarIcons('archive');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard/archive']);
    
    component.handleSidebarIcons('trash');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/dashboard/trash']);
  });

  it('should set credentials when ngOnInit is called with token', () => {
    const mockToken = 'mockAuthToken';
    const mockDecodedToken = { email: 'test@example.com', userName: 'Test User' };
    
    localStorage.setItem('authToken', mockToken);
    mockDataService.getIdFromToken.and.returnValue(mockDecodedToken);

    component.ngOnInit();
    expect(component.credentials.email).toBe(mockDecodedToken.email);
    expect(component.credentials.userName).toBe(mockDecodedToken.userName);
  });

  it('should not set credentials if no token exists in localStorage', () => {
    localStorage.removeItem('authToken');
    component.ngOnInit();
    expect(component.credentials.email).toBe('');
    expect(component.credentials.userName).toBe('');
  });
});
