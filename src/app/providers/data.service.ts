// /**
//  * PunnuMistri - E-commerce app starter Ionic 4( )
//  *
//  * Copyright © 2018-present PunnuMistri. All rights reserved.
//  *
//  * This source code is licensed as per the terms found in the
//  * LICENSE.md file in the root directory of this source .
//  * 
//  */

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { v4 as uuid } from 'uuid';
// import { Device } from '@ionic-native/device/ngx';

// import { environment } from 'src/environments/environment';

// export class HomeTab {
//   title: string
// };

// export class NotificationsCard {
//   image: string;
//   title: string;
//   time: number
// }

// export class Notification {
//   all: Array<NotificationsCard>;
//   deals: Array<NotificationsCard>;
//   orders: Array<NotificationsCard>;
//   others: Array<NotificationsCard>
// }

// export class Review {
//   image: string;
//   name: string;
//   comment: string;
//   rating: number;
//   images: Array<string>
// }

// export class SearchParams {
//   searchterm: string;
//   category: any;
//   vehicle_type : any;
//   company: string;
//   tyre_types: string
// }

// export class Product {
//   id:any;
//   name: string;
//   vehicle_type : any;
//   company: any;
//   tyre_type: any;
//   image: Array<string>;
//   size: string;
//   color: string;
//   cost_price: number;
//   discount: number;
//   offer: boolean;
//   stock: number;
//   description: string;
//   currency: string;
//   bought: number;
//   shipping: number;
//   rating: number;
//   rating_count: number;
//   store_rate: number;
//   store_rating: number;
//   store_rating_count: number;
//   sold_by: string;
//   specs: string;
//   reviews: Array<Review>;
//   store_reviews: Array<Review>;
//   sizing: {
//     small: number;
//     okay: number;
//     large: number
//   };
//   buyer_guarantee: string
// }
// export class UserDO {
//   id: any;
//   fname: string;
//   lname: string;
//   mobile: string;
//   email: string;
//   uid: string;
//   password: string;
//   did: string;
//   aid: string;
//   latitude: any;
//   longitude: any;
// }
// export class User {
//   id: any;
//   fname: string;
//   lname: string;
//   mobile: string;
//   email: string;
//   address: Array<Address>;
//   uid: string;
//   did: string;
//   aid: string;
//   latitude: any;
//   longitude: any;
// }

// export class Address {
//   user_id: any;
//   first_name: string;
//   last_name: string;
//   address_line_1: string;
//   address_line_2: string;
//   country: string;
//   state: string;
//   city: string;
//   zipcode: number;
//   phone_number: number
// }
// export class Category {
//   Id: any;
//   Name: string
// }
// export class CategoryTabs {
//   CategoryId: any;
//   Products: Array<Product>
// }
// export class Company {
//   Id: any;
//   Name: string
// }
// export class Cat_Company {
//   CategoryId: any;
//   Companies: Array<Company>
// }
// export class vehicle_type {
//   Id: any;
//   Name: string
// }
// export class Cart {
//   user_id: any;
//   product: Product;
//   quantity: number
// }
// export class AuthData {
//   authstatus:boolean;
//   useremail: string;
// }
// export class Order {
//   id:any;
//   user_id: any;
//   order_date: Date;
//   amount: number;
//   delivery_date: Date;
//   status: string;
//   billing_address: Address;
//   shipping_address: Address;
//   tax: number
// }
// export class OrderProduct {
//   order_id:any;
//   product: Product;
//   amount:any;
//   quantity: any;
// }
// export class BillingInfo {
//   card_number:string;
//   expiry_date: string;
//   isSave : boolean ;
// }
// @Injectable({
//   providedIn: 'root'
// })

// export class DataService {
// DeviceId:any;
// UUIDs:any;
//   constructor( private geolocation: Geolocation,private http: HttpClient,private device: Device) {
//     this.DeviceId = this.device.uuid;
//     this.UUIDs = uuid();
//    }
// // return AuthData object
//   login(_email: string , _password: string): Observable<any> {
//     var request={email: _email , password: _password}
//     return this.http.put(environment.api_Url_Beta + 'login', request, {
//       headers: new HttpHeaders()
//       .set('Content-Type', 'application/json')
//     });
//   }
//   changeLocation(_email: string , _latitude: any,_longitude:any): Observable<any> {
//     var request={email: _email , latitude: _latitude , longitude:_longitude}
//     return this.http.post(environment.api_Url_Prod + 'updateLocation', request, {
//       headers: new HttpHeaders()
//       .set('Content-Type', 'application/json')
//     });
//   }
// // return simple bool value
//   signup(data: UserDO): Observable<any> {
//     return this.http.post(environment.savePreferances + 'postUser', data, {
//       headers: new HttpHeaders()
//       .set('Content-Type', 'application/json')
//     });
//   }
//   // return Array of distinct Categories object
//   // getCategories(): Observable<any> {
//   //   return this.http.get(environment.apiURL + 'getCategories', {
//   //     headers: new HttpHeaders()
//   //     .set('Content-Type', 'application/json')
//   //   });
//   // }
//   getCategories():Array<Category>{
//     return this.Categories;
//   }
  
//   // return Array of distinct Company object
//   // getCompanies(_categoryId: any): Observable<any> {
//   //   return this.http.get(environment.apiURL + 'getCompanies', {
//   //     params: {
//   //       categoryId: _categoryId
//   //     },
//   //     headers: new HttpHeaders()
//   //     .set('Content-Type', 'application/json')
//   //   });
//   // }
//   getCompanies(_categoryId: any): Array<Company> {
//     var data =  this.Cat_Companies.filter(x => x.CategoryId === _categoryId);
//     if(data.length > 0){
//     return data[0].Companies;
//   }else{
//     return [];
//   }
//   }
//   getAllCompanies(): Array<Company> {
//     return this.AllCompanies;
//   }
//   // return Array of Product object
//   // getProductsList(_searchParams :SearchParams): Observable<any> {
//   //   return this.http.post(environment.apiURL + 'getProductsList',_searchParams, {
//   //     headers: new HttpHeaders()
//   //     .set('Content-Type', 'application/json')
//   //   });
//   // }
//   getProductsList(_categoryId: any): Array<Product> {
//     var data =  this.CategoryTabs.filter(x => x.CategoryId === _categoryId);
//     if(data.length > 0){
//       // if(this.searchParams && this.searchParams.searchterm !== ''){
//       //   return data[0].Products.filter(x => x.name.includes(this.searchParams.searchterm));
//       // }
//     return data[0].Products;
//   }else{
//     return [];
//   }
//   }
//   // return Product object
//   // getProductDetail(_productId :any): Observable<any> {
//   //   return this.http.get(environment.apiURL + 'getProductDetail', {
//   //     params: {
//   //       productId: _productId
//   //     },
//   //     headers: new HttpHeaders()
//   //     .set('Content-Type', 'application/json')
//   //   });
//   // }
//   getProductDetail(_productId :any): Product {
//     var data =  this.products.filter(x => x.id === _productId);
//     if(data.length > 0){
//     return data[0];
//   }else{
//     return null;
//   }
//   }
//   // return vehicle_types object
//   // getvehicle_type(): Observable<any> {
//   //   return this.http.get(environment.apiURL + 'getvehicle_type', {
//   //     headers: new HttpHeaders()
//   //     .set('Content-Type', 'application/json')
//   //   });
//   // }
//   getvehicle_type(): Array<vehicle_type> {
//     return this.vehicle_types;
//   }

//   // return Cart object
//   // getCartbyUser(_userId : any): Observable<any> {
//   //   return this.http.get(environment.apiURL + 'getCartbyUser', {
//   //     params: {
//   //       userId: _userId
//   //     },
//   //     headers: new HttpHeaders()
//   //     .set('Content-Type', 'application/json')
//   //   });
//   // }
//   getCartbyUser(_userId : any): Array<Cart> {
//     var data =  this.carts.filter(x => x.user_id === _userId);
//     if(data.length > 0){
//     return data;
//     }else{
//       return [];
//     }
//   }

//   setCurrentUserDetail(user : UserDO){
//    this.current_user.address = [];
//    this.current_user.aid = user.aid;
//    this.current_user.id = user.id;
//    this.current_user.did = user.did;
//    this.current_user.email = user.email;
//    this.current_user.fname = user.fname;
//    this.current_user.latitude = user.latitude;
//    this.current_user.lname = user.lname;
//    this.current_user.longitude = user.longitude;
//    this.current_user.mobile = user.mobile;
//   }
//   // returns Array of Order object
//   updateLocation(email: string)
//   {
//     // this.geolocation.getCurrentPosition().then((resp) => {
//     // this.current_user.latitude = resp.coords.latitude;
//     // this.current_user.longitude = resp.coords.longitude;
//     //   alert(resp.coords.latitude);
//     //   alert(resp.coords.longitude);
//     //        this.changeLocation(email,resp.coords.latitude,resp.coords.longitude).subscribe(data => {
//     //         // tslint:disable-next-line: no-debugger
//     //         if(data.Error === true)
//     //         { 
//     //           this.fun.presentToast('Unable to Track location!', true, 'bottom', 2100);
//     //           return;
//     //         }
//     //         this.fun.presentToast('Live location updated', true, 'bottom', 2100);
//     //       },
//     //       error => {
//     //         this.fun.presentToast('Unable to Track location!', true, 'bottom', 2100);
//     //       });
//     //  }).catch((error) => {
//     //   this.current_user.latitude = 0;
//     //   this.current_user.longitude = 0;
//     //   this.fun.presentToast('Unable to Track location!', true, 'bottom', 2100);
//     //  });
     
//      //let watch = this.geolocation.watchPosition();
//      //watch.subscribe((data) => {
//       // data can be a set of coordinates, or an error (if an error occurred).
//       // data.coords.latitude
//       // data.coords.longitude
//      //});
//   }
//   // getOrders(_userId : any): Observable<any> {
//   //   return this.http.get(environment.apiURL + 'getOrders', {
//   //     params: {
//   //       userId: _userId
//   //     },
//   //     headers: new HttpHeaders()
//   //     .set('Content-Type', 'application/json')
//   //   });
//   // }
//   getTotalCartbyUser(_userId : any): number {
//     var data =  this.carts.filter(x => x.user_id === _userId);
//     if(data.length > 0){
//     return data.length;
//     }else{
//       return 0;
//     }
//   }
//   getOrders(_userId : any): Array<Order> {
//     var data =  this.orders.filter(x => x.user_id === _userId);
//     if(data.length > 0){
//     return data;
//     }else{
//       return [];
//     }
//   }
//   addtoCart(data : Product) {
//     var data1 =  this.carts.filter(x => x.product.id === data.id);
//     if(data1.length === 0){
//       this.carts.push({user_id:this.current_user.id,product: data,quantity:1});
//     }
//   }
//   saveOrder(data : Order, products : OrderProduct) {
//     // var data1 =  this.carts.filter(x => x.product.id === data.id);
//     // if(data1.length === 0){
//     //   this.orders.push({user_id:this.current_user.id,product: data,quantity:1});
//     // }
//   }
//   addtorecent(data : Product) {
//     var data1 =  this.recent.filter(x => x.id === data.id);
//     if(data1.length === 0){
//       this.recent.push(data);
//     }
//   }
//   addtoBilling(data : BillingInfo) {
//     var data1 =  this.BillingInfos.filter(x => x.card_number === data.card_number);
//     if(data1.length === 0){
//       this.BillingInfos.push(data);
//     }
//   }

//   current_Product:Product;
//   noOfCart: number = 0;
//   // returns OrderProduct object
//   // getOrderProducts(_orderId : any): Observable<any> {
//   //   return this.http.get(environment.apiURL + 'getOrderProducts', {
//   //     params: {
//   //       orderId: _orderId
//   //     },
//   //     headers: new HttpHeaders()
//   //     .set('Content-Type', 'application/json')
//   //   });
//   // }
//   getOrderProducts(_orderId : any): Array<OrderProduct> {
//     var data =  this.order_products.filter(x => x.order_id === _orderId);
//     if(data.length > 0){
//     return data;
//     }else{
//       return [];
//     }
//   }
//   AllCompanies:Array<Company>=[
//     {Id:1,Name:'MRF'},
//     {Id:2,Name:'Ralco'},
//     {Id:3,Name:'Apollo'},
//     {Id:4,Name:'JK Tyre & Ind'},
//     {Id:5,Name:'CEAT'}];
//   Cat_Companies : Array<Cat_Company> = [
//           {CategoryId:1, Companies:[
//         {Id:1,Name:'MRF'},
//         {Id:2,Name:'Ralco'},
//         {Id:3,Name:'Apollo'},
//         {Id:4,Name:'JK Tyre & Ind'},
//         {Id:5,Name:'CEAT'}
//       ]},
//       {CategoryId:2, Companies:[
//         {Id:1,Name:'MRF'},
//         {Id:2,Name:'Ralco'},
//         {Id:3,Name:'Apollo'},
//       ]},
//       {CategoryId:3, Companies:[
//         {Id:1,Name:'MRF'},
//         {Id:2,Name:'Ralco'},
//         {Id:3,Name:'Apollo'},
//         {Id:4,Name:'JK Tyre & Ind'},
//         {Id:5,Name:'CEAT'}
//       ]},
//       {CategoryId:4, Companies:[
//         {Id:1,Name:'MRF'},
//         {Id:2,Name:'Ralco'},
//         {Id:3,Name:'Apollo'},
//         {Id:4,Name:'JK Tyre & Ind'},
//         {Id:5,Name:'CEAT'}
//       ]}
//   ]
//   terms_of_use = 'The Terms and Conditions agreement can act as a legal contract between you, the mobile app owner or developer, and the users of your app. Like a Terms and Conditions for a website, this agreement for a mobile app would set the rules and terms that users must follow in order to use your app.' +
//     'Here are a couple of reasons why you\'ll want to have a Terms and Conditions for a mobile app:' +
//     'You can stop abusive users from using your app.' +
//     'You can terminate or block accounts at your sole discretion.' +
//     'Liability to users will be limited.' +
//     'And many more.' +
//     'If you don\'t have this agreement for your mobile app yet, use the Generator to create it!';
//   privacy_policy = 'You\'ll need the Privacy Policy agreement even if you don\'t collect any personal data yourself through the mobile app you\'re building, but instead use third party tools such as:' +
//     '- Google Analytics Mobile' +
//     '- Flurry' +
//     '- Firebase' +
//     '- Mixpanel' +
//     'And so on' +
//     'If you use at least one third party tool that might collect personal data through your mobile app, you need this agreement in place.' +
//     'Each app store also requires you to have this agreement in place before submitting the mobile app:' +
//     '- Apple App Store' +
//     '- Google Play Store' +
//     '- Microsoft Windows Phone Store'

//   card: NotificationsCard = {
//     image: 'assets/images/products/1.jpg',
//     title: 'Kya aapne kabhi online hotel book kia hai???\nHotel? Sastago',
//     time: 9
//   };

//   notifications: Notification = {
//     all: [this.card, this.card, this.card, this.card, this.card, this.card, this.card],
//     deals: [this.card, this.card, this.card, this.card, this.card, this.card, this.card],
//     orders: [],
//     others: [this.card, this.card, this.card, this.card, this.card, this.card, this.card],
//   }

//   /// Companies

// vehicle_types:Array<vehicle_type> = [
//   {Id:6,Name:'All'},
//   {Id:1,Name:'2 wheeler'},
//   {Id:2,Name:'3 wheeler'},
//   {Id:3,Name:'4 wheeler'},
//   {Id:4,Name:'OTR'},
//   {Id:5,Name:'Trucks'}

// ];

//   products: Array<Product> = [
//     { id:1,  name: 'Blaze-BA21-JK',vehicle_type:'2 wheeler',company:'JK', tyre_type:'Front', cost_price: 1600, discount: 80, offer: true, stock: 69, description: 'sample data', image: ['assets/images/products/Blaze-BA21-JK.jpg', 'assets/images/products/Blaze-BA21-JK.jpg', 'assets/images/products/Blaze-BA21-JK.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 1200, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/1.jpg', 'assets/images/products/1_1.jpg'] }, { image: 'assets/images/products/1_2.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/1.jpg'] }], store_reviews: [{ image: 'assets/images/products/1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/1.jpg', 'assets/images/products/1_1.jpg'] }, { image: 'assets/images/products/1_2.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/1.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' },
//     { id:2,  name: 'ACTIGRIP-S3-APOLLO',vehicle_type:'3 wheeler',company:'Apollo', tyre_type:'Rear', cost_price: 1400, discount: 80, offer: false, stock: 69, description: 'sample data', image: ['assets/images/products/ACTIGRIP-S3-APOLLO.jpg', 'assets/images/products/2.jpg', 'assets/images/products/3.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 400, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/2.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/2.jpg'] }], store_reviews: [{ image: 'assets/images/products/2.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/2.jpg', 'assets/images/products/2.jpg'] }, { image: 'assets/images/products/2.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/2.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' },
//     { id:3,  name: 'ACTIGRIP-S4-APOLLO',vehicle_type:'4 wheeler',company:'Apollo', tyre_type:'Rear', cost_price: 2000, discount: 80, offer: false, stock: 69, description: 'ACTIGRIP-S4-APOLLO', image: ['assets/images/products/ACTIGRIP-S4-APOLLO.jpg', 'assets/images/products/3.jpg', 'assets/images/products/4.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 365, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/3.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/3.jpg'] }], store_reviews: [{ image: 'assets/images/products/3_1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/3.jpg', 'assets/images/products/3_1.jpg'] }, { image: 'assets/images/products/3.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/3.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' },
//     { id:4,  name: 'Challenger-F82-JK',vehicle_type:'Trucks',company:'JK', tyre_type:'Front', cost_price: 1400, discount: 20, offer: true, stock: 69, description: 'Challenger-F82-JK', image: ['assets/images/products/Challenger-F82-JK.jpg', 'assets/images/products/4.jpg', 'assets/images/products/5.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 1200, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/4.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/4.jpg'] }], store_reviews: [{ image: 'assets/images/products/4_1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/4.jpg', 'assets/images/products/4_1.jpg'] }, { image: 'assets/images/products/4.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/4.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' },
//     { id:5,  name: 'MILAZE60',vehicle_type:'OTR',company:'CEAT', tyre_type:'Front', cost_price: 1600, discount: 80, offer: false, stock: 69, description: 'MILAZE60', image: ['assets/images/products/MILAZE60.jpg', 'assets/images/products/1.jpg', 'assets/images/products/1_1.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 234, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], store_reviews: [{ image: 'assets/images/products/1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg', 'assets/images/products/1.jpg'] }, { image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' },
//     { id:6,  name: 'SECURAF851',vehicle_type:'OTR',company:'CEAT', tyre_type:'Front', cost_price: 2100, discount: 80, offer: false, stock: 69, description: 'sample data', image: ['assets/images/products/SECURAF851.jpg', 'assets/images/products/1.jpg', 'assets/images/products/1_1.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 234, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], store_reviews: [{ image: 'assets/images/products/1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg', 'assets/images/products/1.jpg'] }, { image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' },
//     { id:7,  name: 'SECURANEO1',vehicle_type:'OTR',company:'CEAT', tyre_type:'Front', cost_price: 2200, discount: 80, offer: false, stock: 69, description: 'sample data', image: ['assets/images/products/SECURANEO1.jpg', 'assets/images/products/1.jpg', 'assets/images/products/1_1.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 234, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], store_reviews: [{ image: 'assets/images/products/1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg', 'assets/images/products/1.jpg'] }, { image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' },
//     { id:8,  name: 'SW99-MRFS',vehicle_type:'OTR',company:'MRF', tyre_type:'Front', cost_price: 1800, discount: 80, offer: false, stock: 69, description: 'sample data', image: ['assets/images/products/SW99-MRFS.jpg', 'assets/images/products/1.jpg', 'assets/images/products/1_1.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 234, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], store_reviews: [{ image: 'assets/images/products/1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg', 'assets/images/products/1.jpg'] }, { image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' },
//     { id:9,  name: 'ZEC-MRF',vehicle_type:'OTR',company:'MRF', tyre_type:'Front', cost_price: 1900, discount: 80, offer: false, stock: 69, description: 'sample data', image: ['assets/images/products/ZEC-MRF.jpg', 'assets/images/products/1.jpg', 'assets/images/products/1_1.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 234, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], store_reviews: [{ image: 'assets/images/products/1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg', 'assets/images/products/1.jpg'] }, { image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' },
//     { id:10,  name: 'ZVT-MRF',vehicle_type:'OTR',company:'MRF', tyre_type:'Front', cost_price: 1500, discount: 80, offer: false, stock: 69, description: 'sample data', image: ['assets/images/products/ZVT-MRF.jpg', 'assets/images/products/1.jpg', 'assets/images/products/1_1.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 234, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], store_reviews: [{ image: 'assets/images/products/1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg', 'assets/images/products/1.jpg'] }, { image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' },
//     { id:11,  name: 'Ralco-Blaster-F',vehicle_type:'OTR',company:'Ralco', tyre_type:'Front', cost_price: 1900, discount: 80, offer: false, stock: 69, description: 'sample data', image: ['assets/images/products/Ralco-Blaster-F.jpg', 'assets/images/products/1.jpg', 'assets/images/products/1_1.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 234, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], store_reviews: [{ image: 'assets/images/products/1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg', 'assets/images/products/1.jpg'] }, { image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' },
//     { id:12,  name: 'Ralco-Speed-Blaster',vehicle_type:'OTR',company:'Ralco', tyre_type:'Front', cost_price: 1200, discount: 80, offer: false, stock: 69, description: 'sample data', image: ['assets/images/products/Ralco-Speed-Blaster.jpg', 'assets/images/products/1.jpg', 'assets/images/products/1_1.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 234, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], store_reviews: [{ image: 'assets/images/products/1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg', 'assets/images/products/1.jpg'] }, { image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' },
//     { id:13,  name: 'MRF Tube',vehicle_type:'OTR',company:'MRF', tyre_type:'Front', cost_price: 1200, discount: 80, offer: false, stock: 69, description: 'sample data', image: ['assets/images/products/tubeMRF.jpg', 'assets/images/products/1.jpg', 'assets/images/products/1_1.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 234, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], store_reviews: [{ image: 'assets/images/products/1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg', 'assets/images/products/1.jpg'] }, { image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' },
//     { id:14,  name: 'CEAT Tube',vehicle_type:'OTR',company:'CEAT', tyre_type:'Front', cost_price: 1200, discount: 80, offer: false, stock: 69, description: 'sample data', image: ['assets/images/products/tubeCEAT.jpg', 'assets/images/products/1.jpg', 'assets/images/products/1_1.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 234, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], store_reviews: [{ image: 'assets/images/products/1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg', 'assets/images/products/1.jpg'] }, { image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' },
//     { id:15,  name: 'JK Tube',vehicle_type:'OTR',company:'JK', tyre_type:'Front', cost_price: 1200, discount: 80, offer: false, stock: 69, description: 'sample data', image: ['assets/images/products/tubeJK.jpg', 'assets/images/products/1.jpg', 'assets/images/products/1_1.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 234, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], store_reviews: [{ image: 'assets/images/products/1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg', 'assets/images/products/1.jpg'] }, { image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' },
//     { id:16,  name: 'Ralco Tube',vehicle_type:'OTR',company:'Ralco', tyre_type:'Front', cost_price: 1200, discount: 80, offer: false, stock: 69, description: 'sample data', image: ['assets/images/products/tubeRalco.jpg', 'assets/images/products/1.jpg', 'assets/images/products/1_1.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 234, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], store_reviews: [{ image: 'assets/images/products/1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg', 'assets/images/products/1.jpg'] }, { image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' },
//     { id:17,  name: 'Apollo Tube',vehicle_type:'OTR',company:'Apollo', tyre_type:'Front', cost_price: 1200, discount: 80, offer: false, stock: 69, description: 'sample data', image: ['assets/images/products/tubeApollo.jpg', 'assets/images/products/1.jpg', 'assets/images/products/1_1.jpg'], rating_count: 11, store_rating_count: 11, currency: '₹', bought: 234, size: 'M', color: 'Black', shipping: 250, rating: 4, store_rating: 18090, store_rate: 3, sold_by: 'seller', specs: 'this is a sample product', reviews: [{ image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], store_reviews: [{ image: 'assets/images/products/1.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg', 'assets/images/products/1.jpg'] }, { image: 'assets/images/products/5.jpg', name: 'sample', comment: 'This is an amazing dress and totally out of budget. Need to sell my only kidney to purchase this one as other kidney is already sold for my iphone...lol', rating: 5, images: ['assets/images/products/5.jpg'] }], sizing: { small: 10, okay: 80, large: 5 }, buyer_guarantee: 'Return all products within 30 days of delivery if they are not up to your satisfaction' }

//   ];


//   carts: Array<Cart> = [
//     { user_id:1, product: this.products[1], quantity: 1 },
//     { user_id:1, product: this.products[3], quantity: 2 },
//     { user_id:2, product: this.products[1], quantity: 1 },
//   ];
  
//   item_tab: Array<HomeTab> = [{ title: 'Overview' }];

//   notifications_tab: Array<HomeTab> = [{ title: 'All' },
//   { title: 'Deals' },
//   { title: 'Your Orders' },
//   { title: 'Other' }];

//   rewards_tab: Array<HomeTab> = [{ title: 'Dashboard' },
//   { title: 'Redeem' },
//   { title: 'Information' }];

//   rewards = {
//     points: 100,
//     since: new Date(),
//     available: [{ discount: 5, code: 'ABCDEF', expire: new Date(), expired: false }],
//     used: [{ discount: 10, code: 'XEFGSD', expire: new Date(), expired: true }],
//     redeem: [{ discount: 5, points: 200 }, { discount: 10, points: 600 }, { discount: 15, points: 1000 }]
//   };
// // Categories
// Categories: Array<Category> = [
//   {Id:1,Name:'All'},
//   {Id:2,Name:'Tyre'},
//   {Id:3,Name:'Tube'}
// ];
// CategoryTabs: Array<CategoryTabs> = [
//   { CategoryId:1,Products: [this.products[0],this.products[1],this.products[2],this.products[3],this.products[4],
//     this.products[5],this.products[6],this.products[7],this.products[8],this.products[9],this.products[10],this.products[11],this.products[12],
//     this.products[13],this.products[14],this.products[15],this.products[16]]},
//   { CategoryId:2,Products: [this.products[0],this.products[1],this.products[2],this.products[3],this.products[4],
//     this.products[5],this.products[6],this.products[7],this.products[8],this.products[9],this.products[10],this.products[11]]},
//   { CategoryId:3,Products: [this.products[12],this.products[13],this.products[14],this.products[15],this.products[16]]}
// ];



//   recent :Array<Product> = [];

//   current_product: Product = this.products[0];

//   current_user: User = {
//     id:1,
//     fname: 'Vaibhav',
//     uid: 'ALSIOCSIIUAISUC',
//     did: 'JIOU-ASBB-C871-0345',
//     aid: 'ASBB-ASBB-C871-0345',
//     lname: 'Vashistha',
//     mobile: '773779890',
//     latitude: 0,
//     longitude: 0,
//     email: 'admin@gmail.com',
//     address: [{ first_name: 'Vaibhav', last_name: 'Vashistha',address_line_1: 'ghar', address_line_2: 'ghar', city: 'jaipur',user_id:1, phone_number: 1125532553, zipcode: 12345, country: 'India',  state: 'Rajasthan' },
//     { first_name: 'Mrityunjaya', last_name: 'Tiwari',address_line_1: 'office', address_line_2: 'Office', city: 'Delhi',user_id:1,  phone_number: 1125532553, zipcode: 12345, country: 'India',  state: 'Delhi' }]
//   };
//   BillingInfos: Array<BillingInfo> = [{card_number:'3124',expiry_date:'12/22',isSave:true},
//   {card_number:'4564',expiry_date:'03/25',isSave:true}]
//   wish_cash = {
//     currency: '₹',
//     amount: 0.00,
//     history: [{ amount: 10 }, { amount: 20 }]
//   };

//   orders: Array<Order> = [{
//     user_id:1,
//     amount: 123,
//     billing_address: { first_name: 'Vaibhav', last_name: 'Vashistha',address_line_1: 'ghar', address_line_2: 'ghar', city: 'jaipur', user_id:1, phone_number: 1125532553, zipcode: 12345, country: 'India', state: 'Rajasthan' },
//     shipping_address: { first_name: 'Mrityunjaya', last_name: 'Tiwari',address_line_1: 'ghar', address_line_2: 'ghar', city: 'jaipur', user_id:1, phone_number: 1125532553, zipcode: 12345, country: 'India', state: 'Rajasthan' },
//     delivery_date: new Date(),
//     id: 'B102013526',
//     order_date: new Date(),
//     status: 'Delivered',
//     tax: 40
//   }, {
//     user_id:1,
//     amount: 123,
//     billing_address: { first_name: 'Mrityunjaya', last_name: 'Tiwari',address_line_1: 'ghar', address_line_2: 'ghar', city: 'jaipur',user_id:1, phone_number: 1125532553, zipcode: 12345, country: 'India', state: 'Rajasthan' },
//     shipping_address: { first_name: 'Vaibhav', last_name: 'Vashistha',address_line_1: 'ghar', address_line_2: 'ghar', city: 'jaipur',user_id:1, phone_number: 1125532553, zipcode: 12345, country: 'India',  state: 'Rajasthan' },
//     delivery_date: new Date(),
//     id: 'B102013527',
//     order_date: new Date(),
//     status: 'Delivered',
//     tax: 40
//   }]
//   order_products : Array<OrderProduct>=[
//     {order_id:'B102013526', product:this.products[0],amount:100,quantity:1},
//     {order_id:'B102013526', product:this.products[3],amount:100,quantity:3},
//     {order_id:'B102013527', product:this.products[2],amount:90,quantity:2},
//     {order_id:'B102013527', product:this.products[1],amount:90,quantity:2},
//     {order_id:'B102013527', product:this.products[8],amount:90,quantity:2},
//   ]
// searchParams : SearchParams ={searchterm:'',category:1,company:'All',tyre_types:'All',vehicle_type:'All'};
//   faqs = {
//     'Shipping and Delivery': [
//       { 'How log does shipping take?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'How can I track my order?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'How much does shipping cost?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'Where does my order ship from?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'How do I change my shipping address?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' }
//     ],
//     'Returns and Refunds': [
//       { 'How do I return a product?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'Can I exchange an item?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'How do I cancel my order?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'What\'s the status of my refund?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'Can you issue my refund to a different card if my card is canceled, lost, expired, or stolen?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'I cancelled my order. How will I receive my refund?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' }
//     ],
//     'Payment, Pricing & Promotions': [
//       { 'How do I return a product?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'Can I exchange an item?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'How do I cancel my order?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'What\'s the status of my refund?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'Can you issue my refund to a different card if my card is canceled, lost, expired, or stolen?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'I cancelled my order. How will I receive my refund?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'What\'s the status of my refund?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'Can you issue my refund to a different card if my card is canceled, lost, expired, or stolen?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'I cancelled my order. How will I receive my refund?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' }
//     ],
//     'Orders': [
//       { 'What\'s the status of my refund?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'Can you issue my refund to a different card if my card is canceled, lost, expired, or stolen?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'I cancelled my order. How will I receive my refund?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'What\'s the status of my refund?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'Can you issue my refund to a different card if my card is canceled, lost, expired, or stolen?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'I cancelled my order. How will I receive my refund?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' }
//     ],
//     'Managing Your Account': [
//       { 'How do I return a product?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'Can I exchange an item?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'How do I cancel my order?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'What\'s the status of my refund?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'Can you issue my refund to a different card if my card is canceled, lost, expired, or stolen?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'I cancelled my order. How will I receive my refund?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' }
//     ],
//     'User Feedback': [
//       { 'How do I return a product?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'Can I exchange an item?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'How do I cancel my order?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'What\'s the status of my refund?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'Can you issue my refund to a different card if my card is canceled, lost, expired, or stolen?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'I cancelled my order. How will I receive my refund?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' }
//     ],
//     'Customer Support': [
//       { 'How do I return a product?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'Can I exchange an item?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'How do I cancel my order?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'What\'s the status of my refund?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'Can you issue my refund to a different card if my card is canceled, lost, expired, or stolen?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' },
//       { 'I cancelled my order. How will I receive my refund?': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse hendrerit sed lacus non condimentum. Sed sapien augue, ornare non eros eu, bibendum pulvinar purus. Aenean eu blandit elit, quis tincidunt turpis.' }
//     ]
//   };
// }
