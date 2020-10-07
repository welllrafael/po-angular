import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

// Route Configuration
export const guidesRoutes: Routes = [
  {
    path: '',
    component: GuidesComponent,
    children: [
      { path: 'api', component: GuideApiComponent },
      { path: 'browser-support', component: GuideBrowserSupportComponent },
      { path: 'development-flow', component: GuideDevelopmentFlowComponent },
      { path: 'getting-started', component: GuideGettingStartedComponent },
      { path: 'guide-code', component: GuideGuideCodeComponent },
      { path: 'migration-poui-v2', component: GuideMigrationPouiV2Component },
      { path: 'migration-poui-v3', component: GuideMigrationPouiV3Component },
      { path: 'migration-thf-to-po-ui', component: GuideMigrationThfToPoUiComponent },
      { path: 'press-kit', component: GuidePressKitComponent },
      { path: 'schematics', component: GuideSchematicsComponent },
      { path: 'sync-fundamentals', component: GuideSyncFundamentalsComponent },
      { path: 'sync-get-started', component: GuideSyncGetStartedComponent },
      { path: '', redirectTo: 'getting-started' }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(guidesRoutes)],
  exports: [RouterModule]
})
export class GuideRoutingModule {}
