import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import typeOrmOptionsInput from "./ormconfig";
import {ClientsModule} from "./clients/clients.module";
import {LocationsModule} from "./locations/locations.module";
import {AssettypesModule} from "./assets/asset-types.module";
import {AssetsModule} from "./assets/assets.module";
import {ManufacturersModule} from "./assets/manufacturers.module";
import {AssetsassignmentsstatusModule} from "./assets/assignments/assets-assignments-status.module";
import {AssetsassignmentsModule} from "./assets/assignments/assets-assignments.module";
import {AssetsbarcodesscansModule} from "./assets/barcodes/assets-barcodes-scans.module";
import {AssetsbarcodesModule} from "./assets/barcodes/assets-barcodes.module";
import {AssetcategoriesgroupsModule} from "./assets/categories/asset-categories-groups.module";
import {AssetcategoriesModule} from "./assets/categories/asset-categories.module";
import {AssetgroupsModule} from "./assets/groups/asset-groups.module";
import {ActionscategoriesModule} from "./auth/actions-categories.module";
import {ActionsModule} from "./auth/actions.module";
import {AuditlogModule} from "./auth/audit-log.module";
import {PositionsgroupsModule} from "./auth/positions-groups.module";
import {PositionsModule} from "./auth/positions.module";
import {UserpositionsModule} from "./auth/user-positions.module";
import {EmailsentModule} from "./auth/email/email-sent.module";
import {AuthtokensModule} from "./auth/users/auth-tokens.module";
import {EmailverificationcodesModule} from "./auth/users/email-verification-codes.module";
import {LoginattemptsModule} from "./auth/users/login-attempts.module";
import {PasswordresetcodesModule} from "./auth/users/password-reset-codes.module";
import {UsersModule} from "./auth/users/users.module";
import {CmspagesdraftsModule} from "./cms/cms-pages-drafts.module";
import {CmspagesviewsModule} from "./cms/cms-pages-views.module";
import {CmspagesModule} from "./cms/cms-pages.module";
import {S3filesModule} from "./files/s3-files.module";
import {InstancesModule} from "./instances/instances.module";
import {SignupcodesModule} from "./instances/signup-codes.module";
import {UserinstancesModule} from "./instances/user-instances.module";
import {InstanceactionscategoriesModule} from "./instances/permissions/instance-actions-categories.module";
import {InstanceactionsModule} from "./instances/permissions/instance-actions.module";
import {InstancepositionsModule} from "./instances/permissions/instance-positions.module";
import {LocationsbarcodesModule} from "./locations/barcodes/locations-barcodes.module";
import {MaintenancejobsmessagesModule} from "./maintenance/maintenance-jobs-messages.module";
import {MaintenancejobsstatusesModule} from "./maintenance/maintenance-jobs-statuses.module";
import {MaintenancejobsModule} from "./maintenance/maintenance-jobs.module";
import {ProjectsnotesModule} from "./projects/projects-notes.module";
import {ProjectstypesModule} from "./projects/projects-types.module";
import {ProjectsModule} from "./projects/projects.module";
import {ProjectsvacantrolesapplicationsModule} from "./projects/crew/projects-vacant-roles-applications.module";
import {ProjectsvacantrolesModule} from "./projects/crew/projects-vacant-roles.module";
import {CrewassignmentsModule} from "./projects/crew/crew-assignments.module";
import {PaymentsModule} from "./projects/finance/payments.module";
import {ProjectsfinancecacheModule} from "./projects/finance/projects-finance-cache.module";
import {ModulesstepsModule} from "./training/modules-steps.module";
import {ModulesModule} from "./training/modules.module";
import {UsermodulescertificationsModule} from "./training/user-modules-certifications.module";
import {UsermodulesModule} from "./training/user-modules.module";
const typeOrmOptions: TypeOrmModuleOptions = {
  ...typeOrmOptionsInput,
  migrationsTableName: "migrations_typeorm",
  migrationsRun: true,
  autoLoadEntities: false,
  keepConnectionAlive: true,
  retryAttempts: 10,
  retryDelay: 1000,
  synchronize: false,
};

//import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...typeOrmOptions,
      autoLoadEntities: true,

    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static"),
      serveStaticOptions: {
        dotfiles: "ignore",
        index: ["index.html"],
        fallthrough: false,
        lastModified: false,
        redirect: true,
      },
    }),
    AssettypesModule,
    AssetsModule,
    ManufacturersModule,
    AssetsassignmentsstatusModule,
    AssetsassignmentsModule,
    AssetsbarcodesscansModule,
    AssetsbarcodesModule,
    AssetcategoriesgroupsModule,
    AssetcategoriesModule,
    AssetgroupsModule,
    ActionscategoriesModule,
    ActionsModule,
    AuditlogModule,
    PositionsgroupsModule,
    PositionsModule,
    UserpositionsModule,
    EmailsentModule,
    AuthtokensModule,
    EmailverificationcodesModule,
    LoginattemptsModule,
    PasswordresetcodesModule,
    UsersModule,
    ClientsModule,
    CmspagesdraftsModule,
    CmspagesviewsModule,
    CmspagesModule,
    S3filesModule,
    InstancesModule,
    SignupcodesModule,
    UserinstancesModule,
    InstanceactionscategoriesModule,
    InstanceactionsModule,
    InstancepositionsModule,
    LocationsModule,
    LocationsbarcodesModule,
    MaintenancejobsmessagesModule,
    MaintenancejobsstatusesModule,
    MaintenancejobsModule,
    ProjectsnotesModule,
    ProjectstypesModule,
    ProjectsModule,
    CrewassignmentsModule,
    ProjectsvacantrolesapplicationsModule,
    ProjectsvacantrolesModule,
    PaymentsModule,
    ProjectsfinancecacheModule,
    ModulesstepsModule,
    ModulesModule,
    UsermodulescertificationsModule,
    UsermodulesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
