import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListingRetailerPage } from './listing-retailer.page';

describe('ListingRetailerPage', () => {
  let component: ListingRetailerPage;
  let fixture: ComponentFixture<ListingRetailerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingRetailerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListingRetailerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
