import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NotRegisterPage } from './not-register.page';

describe('NotRegisterPage', () => {
  let component: NotRegisterPage;
  let fixture: ComponentFixture<NotRegisterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotRegisterPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NotRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
