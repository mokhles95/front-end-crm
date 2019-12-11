import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';
import { SharedModule } from '../../shared/shared.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { PipesModule } from '../../theme/pipes/pipes.module';

@NgModule({
  declarations: [ShopsComponent],
    imports: [
        CommonModule,
        ShopsRoutingModule,
        SharedModule,
        NgxPaginationModule,
        SwiperModule,
        PipesModule
    ]
})
export class ShopsModule { }
