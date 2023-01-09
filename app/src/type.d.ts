/**
 * Asset Type object
 */
interface IAssetType {
  assets: [...IAssetTypeData];
  pagination: {
    page: number;
    total: number;
  };
}

interface IAssetTypeData {
  assetTypes_id: number;
  assetTypes_name: string;
  assetCategories_id: number;
  manufacturers_id: number;
  instances_id: number;
  assetTypes_description: string;
  assetTypes_productLink: string;
  assetTypes_definableFields: string;
  assetTypes_mass: number;
  assetTypes_inserted: string;
  assetTypes_dayRate: number;
  assetTypes_weekRate: number;
  assetTypes_value: number;
  manufacturers_name: string;
  manufacturers_internalAdamRMSNote: string;
  manufacturers_website: string;
  manufacturers_notes: string;
  assetCategories_name: string;
  assetCategories_fontAwesome: string;
  assetCategories_rank: number;
  assetCategoriesGroups_id: number;
  assetCategories_deleted: number;
  assetCategoriesGroups_name: string;
  thumbnails: [...any];
  assetTypes_mass_format: string;
  assetTypes_value_format: string;
  assetTypes_dayRate_format: string;
  assetTypes_weekRate_format: string;
  count: number;
  fields: [...any];
  tags: [...IAsset];
  files: IFile[];
}

type AssetTypeContextType = {
  AssetTypes: IAssetType;
  getMoreAssets: () => void;
  refreshAssetTypes: () => void;
};

/**
 * Asset object
 */
interface IAsset {
  assets_id: number;
  assetTypes_id: number;
  assetTypes_name: string;
  assets_notes: string;
  assets_tag: string;
  asset_definableFields_1: string;
  asset_definableFields_2: string;
  asset_definableFields_3: string;
  asset_definableFields_4: string;
  asset_definableFields_5: string;
  asset_definableFields_6: string;
  asset_definableFields_7: string;
  asset_definableFields_8: string;
  asset_definableFields_9: string;
  asset_definableFields_10: string;
  assets_dayRate: number;
  assets_weekRate: number;
  assets_value: number;
  assets_mass: number;
  assets_tag_format: string;
  assets_mass_format: string;
  assets_value_format: string;
  assets_dayRate_format: string;
  assets_weekRate_format: string;
  flagsblocks: {
    BLOCK: [...any];
    FLAG: [...any];
    COUNT: {
      BLOCK: number;
      FLAG: number;
    };
  };
  files: IFile[];
}

interface IFile {
  s3files_extension: string;
  s3files_id: number;
  s3files_meta_size: number;
  s3files_meta_uploaded: string;
  s3files_name: string;
  s3files_shareKey: any;
}

/* Project Object */
interface IProject {
  projects_id: number;
  projects_name: string;
  clients_name: string;
  projects_manager: number;
  thisProjectManager: boolean;
}

/* Individual Project Object */
interface IProjectData {
  project: any;
  files: [...any];
  assetsAssignmentsStatus: [...any];
  FINANCIALS: any;
}

/* Project Comment Object */
interface IComment {
  auditLog_id: number;
  auditLog_actionType: string;
  auditLog_actionTable: string;
  auditLog_actionData: string;
  auditLog_timestamp: string;
  users_userid: number;
  auditLog_actionUserid: number;
  projects_id: number;
  auditLog_deleted: number;
  auditLog_targetID: number;
  users_name1: string;
  users_name2: string;
  users_email: string;
}

/* Project Crew Roles Object */
interface IProjectCrewRole {
  projectsVacantRoles_id: number;
  projects_id: number;
  projectsVacantRoles_name: string;
  projectsVacantRoles_description: string;
  projectsVacantRoles_personSpecification: null;
  projectsVacantRoles_deleted: number;
  projectsVacantRoles_open: boolean;
  projectsVacantRoles_showPublic: boolean;
  projectsVacantRoles_added: string;
  projectsVacantRoles_deadline: string;
  projectsVacantRoles_firstComeFirstServed: number;
  projectsVacantRoles_fileUploads: number;
  projectsVacantRoles_slots: number;
  projectsVacantRoles_slotsFilled: number;
  projectsVacantRoles_questions: [...IProjectCrewRoleQuestion];
  projectsVacantRoles_collectPhone: number;
  projectsVacantRoles_privateToPM: number;
  projectsVacantRoles_visibleToGroups: string;
  projectsVacantRoles_applicationVisibleToUsers: string;
  projects_name: string;
  instances_id: number;
  projects_manager: number;
  projects_description: string;
  projects_created: string;
  clients_id: number;
  projects_deleted: number;
  projects_archived: number;
  projects_dates_use_start: string;
  projects_dates_use_end: string;
  projects_dates_deliver_start: string;
  projects_dates_deliver_end: string;
  projects_status: number;
  locations_id: number;
  projects_invoiceNotes: string;
  projects_defaultDiscount: number;
  projectsTypes_id: number;
  projects_parent_project_id: number;
  projects_status_follow_parent: number;
  users_userid: number;
  users_name1: string;
  users_name2: string;
  users_email: string;
  application: [...{ projectsVacantRolesApplications_id: number }];
}

interface IProjectCrewRoleQuestion {
  name: string;
  type: "text" | "textarea";
  notes: string;
  placeholder: string;
}

/**
 * CMS Page List
 */
interface CmsPageList {
  cmsPages_fontAwesome: string | null;
  cmsPages_name: string;
  cmsPages_id: number;
  SUBPAGES?: [...CmsPageList];
}

/**
 * CMS Content
 */
interface CmsContent extends CmsPageList {
  instances_id: number;
  cmsPages_showNav: number;
  cmsPages_showPublic: number;
  cmsPages_showPublicNav: number;
  cmsPages_visibleToGroups: number;
  cmsPages_navOrder: number;
  cmsPages_description: string;
  cmsPages_archived: boolean;
  cmsPages_deleted: boolean;
  cmsPages_subOf: number | null;
  cmsPages_added: Date;
  DRAFTS: null | {
    cmsPagesDrafts_id: number;
    cmsPagesDrafts_data: string;
    cmsPagesDrafts_revisionID: number;
    cmsPagesDrafts_dataARRAY: Array<CmsContentCard>;
  };
  CONTENT: string;
}

/**
 * The content of a Card on a CMS page
 */
interface CmsContentCard {
  color: string;
  content: string;
  outline: string;
  title: string;
  width: string;
}

/**
 * The Cms Card Color Map type defined in the CMS Page
 */
interface CmsCardColorMapType {
  [index: string]: string | undefined;
}

/**
 * The CMS Context Provider type
 */
type ICmsPageProvider = Array<CmsPageList>;

/**
 * The CMS Context Provider type
 */
type ICmsContentProvider = Array<CmsContent>;

/* AdamRMS Location */
interface ILocation {
  name: string;
  value: string;
  type: "barcode" | "asset" | "custom" | undefined;
}
