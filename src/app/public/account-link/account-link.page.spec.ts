import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountLinkPage } from './account-link.page';

describe('AccountLinkPage', () => {
  let component: AccountLinkPage;
  let fixture: ComponentFixture<AccountLinkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountLinkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountLinkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
