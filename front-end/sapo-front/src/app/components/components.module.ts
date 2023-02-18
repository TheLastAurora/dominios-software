import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonsModule } from './buttons/buttons.module';
import { CardsModule } from './cards/cards.module';
import { FootersModule } from './footers/footers.module';
import { HeadersModule } from './headers/headers.module';
import { InputsModule } from './inputs/inputs.module';
import { ListsModule } from './lists/lists.module';
import { ToastComponent } from './toast/toast.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { AvatarComponent } from './avatar/avatar.component';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { ToasterComponent } from './toaster/toaster.component';



@NgModule({
  declarations: [
    ToastComponent,
    SnackbarComponent,
    TooltipComponent,
    AvatarComponent,
    SplashScreenComponent,
    ToasterComponent
  ],
  imports: [
    CommonModule,
    CardsModule,
    ButtonsModule,
    FootersModule,
    HeadersModule,
    InputsModule,
    ListsModule
  ],
  exports: [
    AvatarComponent,
    CommonModule,
    ButtonsModule,
    FootersModule,
    HeadersModule,
    InputsModule,
    ListsModule,
    SnackbarComponent,
    SplashScreenComponent,
    ToastComponent,
    TooltipComponent,
    SidebarModule,
    ToasterComponent
  ]
})
export class ComponentsModule { }
