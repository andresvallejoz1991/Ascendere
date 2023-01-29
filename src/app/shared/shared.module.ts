import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { LoginModule } from './login/login.module';
import { SidebarModule } from './sidebar/sidebar.module';

@NgModule({
  imports: [
    ComponentsModule,
    SidebarModule,
    LoginModule,
  ],
  exports: [
    ComponentsModule,
    SidebarModule,
    LoginModule,
  ],
  declarations: [],
})
export class SharedModule { }
