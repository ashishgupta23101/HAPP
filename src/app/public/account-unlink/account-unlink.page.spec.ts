import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountUnlinkPage } from './account-unlink.page';

describe('AccountUnlinkPage', () => {
  let component: AccountUnlinkPage;
  let fixture: ComponentFixture<AccountUnlinkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountUnlinkPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountUnlinkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
