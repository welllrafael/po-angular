import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { GuideRoutingModule } from './guide-routing.module';

import { GuidesComponent } from './guides.components';
import { GuideApiComponent } from './guides/guide-api/guide-api.component';
import { GuideBrowserSupportComponent } from './guides/guide-browser-support/guide-browser-support.component';
import { GuideDevelopmentFlowComponent } from './guides/guide-development-flow/guide-development-flow.component';
import { GuideGettingStartedComponent } from './guides/guide-getting-started/guide-getting-started.component';
import { GuideGuideCodeComponent } from './guides/guide-guide-code/guide-guide-code.component';
import { GuideMigrationPouiV2Component } from './guides/guide-migration-poui-v2/guide-migration-poui-v2.component';
import { GuideMigrationPouiV3Component } from './guides/guide-migration-poui-v3/guide-migration-poui-v3.component';
import { GuideMigrationThfToPoUiComponent } from './guides/guide-migration-thf-to-po-ui/guide-migration-thf-to-po-ui.component';
import { GuidePressKitComponent } from './guides/guide-press-kit/guide-press-kit.component';
import { GuideSchematicsComponent } from './guides/guide-schematics/guide-schematics.component';
import { GuideSyncFundamentalsComponent } from './guides/guide-sync-fundamentals/guide-sync-fundamentals.component';
import { GuideSyncGetStartedComponent } from './guides/guide-sync-get-started/guide-sync-get-started.component';

@NgModule({
  imports: [SharedModule, GuideRoutingModule],
  declarations: [
    GuidesComponent,
    GuideApiComponent,
    GuideBrowserSupportComponent,
    GuideDevelopmentFlowComponent,
    GuideGettingStartedComponent,
    GuideGuideCodeComponent,
    GuideMigrationPouiV2Component,
    GuideMigrationPouiV3Component,
    GuideMigrationThfToPoUiComponent,
    GuidePressKitComponent,
    GuideSchematicsComponent,
    GuideSyncFundamentalsComponent,
    GuideSyncGetStartedComponent
  ]
})
export class GuideModule {}
