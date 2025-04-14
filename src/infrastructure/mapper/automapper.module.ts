import { Module } from '@nestjs/common';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { CategoryProfile } from './category.mapper';
import { ProductProfile } from './product.mapper';

@Module({
  imports: [AutomapperModule.forRoot({ strategyInitializer: classes() })],
  exports: [AutomapperModule, CategoryProfile, ProductProfile],
  providers: [CategoryProfile, ProductProfile],
})
export class AppAutoMapperModule {}
