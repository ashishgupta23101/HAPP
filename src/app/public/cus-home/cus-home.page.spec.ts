import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CusHomePage } from './cus-home.page';

describe('CusHomePage', () => {
  let component: CusHomePage;
  let fixture: ComponentFixture<CusHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CusHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
