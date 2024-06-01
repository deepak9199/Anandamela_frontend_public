import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { authInterceptorProviders } from './Shared/_helpers/helpers';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AuthGuard } from './Shared/_guards/guard';
import { AuthService } from './Shared/_services/auth.service';
import { LoginComponent } from './System/auth/login/login.component';
import { LogoutComponent } from './System/auth/logout/logout.component';
import { RegistrationComponent } from './System/auth/registration/registration.component';
import { ForgetPasswordComponent } from './System/auth/forget-password/forget-password.component';
import { UpdatePasswordComponent } from './System/auth/update-password/update-password.component';
import { HomePageComponent } from './System/home-page/home-page.component';
import { CartPageComponent } from './System/cart-page/cart-page.component';
import { ProductPageComponent } from './System/product-page/product-page.component';
import { BuyPageComponent } from './System/buy-page/buy-page.component';
import { CategoryWiseProductPageComponent } from './System/category-wise-product-page/category-wise-product-page.component';
import { DefaultPageComponent } from './Shared/default-page/default-page.component';
import { NavBarComponent } from './Shared/nav-bar/nav-bar.component';
import { FooterComponent } from './Shared/footer/footer.component';
import { IonicModule } from '@ionic/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElectroincsComponent } from './System/home-page/electroincs/electroincs.component';
import { FurnitureComponent } from './System/home-page/furniture/furniture.component';
import { ContactUsComponent } from './System/contact-us/contact-us.component';
import { AboutUsComponent } from './System/about-us/about-us.component';
import { TermsConditionComponent } from './System/terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from './System/privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from './System/refund-policy/refund-policy.component';
import { ProfileComponent } from './System/profile/profile.component';
import { WiseListComponent } from './System/wise-list/wise-list.component';
import { NavBarDesktopComponent } from './Shared/nav-bar/nav-bar-desktop/nav-bar-desktop.component';
import { NavBarMobileComponent } from './Shared/nav-bar/nav-bar-mobile/nav-bar-mobile.component';
import { ElectronicsMobileComponent } from './System/home-page/electroincs/electronics-mobile/electronics-mobile.component';
import { ElectronicsDesktopComponent } from './System/home-page/electroincs/electronics-desktop/electronics-desktop.component';
import { ProductDesktopComponent } from './System/product-page/product-desktop/product-desktop.component';
import { ProductMobileComponent } from './System/product-page/product-mobile/product-mobile.component';

import { CartDesktopComponent } from './System/cart-page/cart-desktop/cart-desktop.component';
import { CartMobileComponent } from './System/cart-page/cart-mobile/cart-mobile.component';
import { BuyDesktopComponent } from './System/buy-page/buy-desktop/buy-desktop.component';
import { BuyMobileComponent } from './System/buy-page/buy-mobile/buy-mobile.component';
import { FooterDesktopComponent } from './Shared/footer/footer-desktop/footer-desktop.component';
import { FooterMobileComponent } from './Shared/footer/footer-mobile/footer-mobile.component';
import { PaymentGateWayComponent } from './System/auth/payment-gate-way/payment-gate-way.component';
import { LoadingComponent } from './Shared/loading/loading.component';
import { OrderHistoryComponent } from './System/order-history/order-history.component';
import { FurnitureMobileComponent } from './System/home-page/furniture/furniture-mobile/furniture-mobile.component';
import { FurnitureDesktopComponent } from './System/home-page/furniture/furniture-desktop/furniture-desktop.component';
import { OrderHistoryMobileComponent } from './System/order-history/order-history-mobile/order-history-mobile.component';
import { OrderHistoryDesktopComponent } from './System/order-history/order-history-desktop/order-history-desktop.component';
import { DisplayMessageComponent } from './Shared/display-message/display-message.component';
import { DisplayMessageService } from './Shared/_services/display-message.service';
import { ProductViewerComponent } from './Shared/product-viewer/product-viewer.component';
import { VoiceRecognitionComponent } from './System/voice-recognition/voice-recognition.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    RegistrationComponent,
    ForgetPasswordComponent,
    UpdatePasswordComponent,
    HomePageComponent,
    CartPageComponent,
    ProductPageComponent,
    BuyPageComponent,
    CategoryWiseProductPageComponent,
    DefaultPageComponent,
    NavBarComponent,
    FooterComponent,
    ElectroincsComponent,
    FurnitureComponent,
    ContactUsComponent,
    AboutUsComponent,
    TermsConditionComponent,
    PrivacyPolicyComponent,
    RefundPolicyComponent,
    ProfileComponent,
    WiseListComponent,
    NavBarDesktopComponent,
    NavBarMobileComponent,
    ElectronicsMobileComponent,
    ElectronicsDesktopComponent,
    ProductDesktopComponent,
    ProductMobileComponent,
    CartDesktopComponent,
    CartMobileComponent,
    BuyDesktopComponent,
    BuyMobileComponent,
    FooterDesktopComponent,
    FooterMobileComponent,
    PaymentGateWayComponent,
    LoadingComponent,
    OrderHistoryComponent,
    FurnitureMobileComponent,
    FurnitureDesktopComponent,
    OrderHistoryMobileComponent,
    OrderHistoryDesktopComponent,
    DisplayMessageComponent,
    ProductViewerComponent,
    VoiceRecognitionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    IonicModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [
    authInterceptorProviders,
    AuthGuard,
    AuthService,
    DisplayMessageService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
