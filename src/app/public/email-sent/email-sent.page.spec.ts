import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmailSentPage } from './email-sent.page';

describe('EmailSentPage', () => {
  let component: EmailSentPage;
  let fixture: ComponentFixture<EmailSentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmailSentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
