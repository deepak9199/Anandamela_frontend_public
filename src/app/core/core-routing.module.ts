import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../System/home-page/home-page.component';
import { LoginComponent } from '../System/auth/login/login.component';
import { LogoutComponent } from '../System/auth/logout/logout.component';
import { CartPageComponent } from '../System/cart-page/cart-page.component';
import { ProductPageComponent } from '../System/product-page/product-page.component';
import { BuyPageComponent } from '../System/buy-page/buy-page.component';
import { CategoryWiseProductPageComponent } from '../System/category-wise-product-page/category-wise-product-page.component';
import { RegistrationComponent } from '../System/auth/registration/registration.component';
import { ForgetPasswordComponent } from '../System/auth/forget-password/forget-password.component';
import { ContactUsComponent } from '../System/contact-us/contact-us.component';
import { AboutUsComponent } from '../System/about-us/about-us.component';
import { TermsConditionComponent } from '../System/terms-condition/terms-condition.component';
import { PrivacyPolicyComponent } from '../System/privacy-policy/privacy-policy.component';
import { RefundPolicyComponent } from '../System/refund-policy/refund-policy.component';
import { ProfileComponent } from '../System/profile/profile.component';
import { WiseListComponent } from '../System/wise-list/wise-list.component';
import { OrderHistoryComponent } from '../System/order-history/order-history.component';
import { VoiceRecognitionComponent } from '../System/voice-recognition/voice-recognition.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent },
  { path: '', component: HomePageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'product', component: ProductPageComponent },
  { path: 'buy', component: BuyPageComponent },
  { path: 'categoryWiseProdcut', component: CategoryWiseProductPageComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'forgetpassword', component: ForgetPasswordComponent },
  { path: 'contactus', component: ContactUsComponent },
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'termscondition', component: TermsConditionComponent },
  { path: 'privicypolicy', component: PrivacyPolicyComponent },
  { path: 'refundpolicy', component: RefundPolicyComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'wishlist', component: WiseListComponent },
  { path: 'orderHistory', component: OrderHistoryComponent },
  { path: 'voicerecognition', component: VoiceRecognitionComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
