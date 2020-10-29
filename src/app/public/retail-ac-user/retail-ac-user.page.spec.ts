import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RetailAcUserPage } from './retail-ac-user.page';

describe('RetailAcUserPage', () => {
  let component: RetailAcUserPage;
  let fixture: ComponentFixture<RetailAcUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailAcUserPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RetailAcUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
