import { Module } from "@nestjs/common";
import { Users } from "./users.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Assetsbarcodesscans } from "../../assets/barcodes/assets-barcodes-scans.entity";
import { Assetsbarcodes } from "../../assets/barcodes/assets-barcodes.entity";
import { Assetgroups } from "../../assets/groups/asset-groups.entity";
import { Cmspagesdrafts } from "../../cms/cms-pages-drafts.entity";
import { Cmspagesviews } from "../../cms/cms-pages-views.entity";
import { S3files } from "../../files/s3-files.entity";
import { Userinstances } from "../../instances/user-instances.entity";
import { Locationsbarcodes } from "../../locations/barcodes/locations-barcodes.entity";
import { Maintenancejobs } from "../../maintenance/maintenance-jobs.entity";
import { Crewassignments } from "../../projects/crew/crew-assignments.entity";
import { Projectsvacantrolesapplications } from "../../projects/crew/projects-vacant-roles-applications.entity";
import { Projectsnotes } from "../../projects/projects-notes.entity";
import { Projects } from "../../projects/projects.entity";
import { Modules } from "../../training/modules.entity";
import { Usermodulescertifications } from "../../training/user-modules-certifications.entity";
import { Usermodules } from "../../training/user-modules.entity";
import { Auditlog } from "../audit-log.entity";
import { Emailsent } from "../email/email-sent.entity";
import { Userpositions } from "../user-positions.entity";
import { Authtokens } from "./auth-tokens.entity";
import { Emailverificationcodes } from "./email-verification-codes.entity";
import { Passwordresetcodes } from "./password-reset-codes.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Users,
      Assetsbarcodesscans,
      Assetsbarcodes,
      Assetgroups,
      Cmspagesdrafts,
      Cmspagesviews,
      S3files,
      Userinstances,
      Locationsbarcodes,
      Maintenancejobs,
      Crewassignments,
      Projectsvacantrolesapplications,
      Projectsnotes,
      Projects,
      Modules,
      Usermodulescertifications,
      Usermodules,
      Auditlog,
      Emailsent,
      Userpositions,
      Authtokens,
      Emailverificationcodes,
      Passwordresetcodes,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [TypeOrmModule],
})
export class UsersModule {}
