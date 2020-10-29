import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RetailAccountPage } from './retail-account.page';

describe('RetailAccountPage', () => {
  let component: RetailAccountPage;
  let fixture: ComponentFixture<RetailAccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailAccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RetailAccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
