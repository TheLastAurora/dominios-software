import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
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



@NgModule({
  declarations: [
    ToastComponent,
    SnackbarComponent,
    TooltipComponent,
    AvatarComponent
  ],
  imports: [
    CommonModule,
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
    ToastComponent,
    TooltipComponent
  ]
})
export class ComponentsModule { }
