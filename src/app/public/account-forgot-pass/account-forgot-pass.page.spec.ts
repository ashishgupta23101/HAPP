import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountForgotPassPage } from './account-forgot-pass.page';

describe('AccountForgotPassPage', () => {
  let component: AccountForgotPassPage;
  let fixture: ComponentFixture<AccountForgotPassPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountForgotPassPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountForgotPassPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
