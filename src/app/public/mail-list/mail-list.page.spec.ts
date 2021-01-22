import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MailListPage } from './mail-list.page';

describe('MailListPage', () => {
  let component: MailListPage;
  let fixture: ComponentFixture<MailListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MailListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
