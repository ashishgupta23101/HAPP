import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProductActivityPage } from './product-activity.page';

describe('ProductActivityPage', () => {
  let component: ProductActivityPage;
  let fixture: ComponentFixture<ProductActivityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductActivityPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductActivityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
