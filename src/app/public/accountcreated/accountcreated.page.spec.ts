import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccountcreatedPage } from './accountcreated.page';

describe('AccountcreatedPage', () => {
  let component: AccountcreatedPage;
  let fixture: ComponentFixture<AccountcreatedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountcreatedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccountcreatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
