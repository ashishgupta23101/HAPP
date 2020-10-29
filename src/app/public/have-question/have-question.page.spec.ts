import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HaveQuestionPage } from './have-question.page';

describe('HaveQuestionPage', () => {
  let component: HaveQuestionPage;
  let fixture: ComponentFixture<HaveQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HaveQuestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HaveQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
