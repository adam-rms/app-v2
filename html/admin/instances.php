<?php
require_once __DIR__ . '/common/headSecure.php';

$PAGEDATA['pageConfig'] = ["TITLE" => "Instances", "BREADCRUMB" => false];

if (!$AUTH->permissionCheck(20)) die($TWIG->render('404.twig', $PAGEDATA));

if (isset($_GET['q'])) $PAGEDATA['search'] = $bCMS->sanitizeString($_GET['q']);
else $PAGEDATA['search'] = null;
if (isset($_GET['page'])) $page = $bCMS->sanitizeString($_GET['page']);
else $page = 1;
$DBLIB->pageLimit = 20; //Users per page
$DBLIB->orderBy("instances.instances_id", "ASC");
$DBLIB->where("instances.instances_deleted", 0);
if (strlen($PAGEDATA['search']) > 0) {
	//Search
	$DBLIB->where("(
		instances_name LIKE '%" . $bCMS->sanitizeString($PAGEDATA['search']) . "%'
		OR instances_address LIKE '%" . $bCMS->sanitizeString($PAGEDATA['search']) . "%'
		OR instances_phone LIKE '%" . $bCMS->sanitizeString($PAGEDATA['search']) . "%'
		OR instances_email LIKE '%" . $bCMS->sanitizeString($PAGEDATA['search']) . "%'
		OR instances_website LIKE '%" . $bCMS->sanitizeString($PAGEDATA['search']) . "%'
    )");
}
$instances = $DBLIB->arraybuilder()->paginate('instances', $page, ["instances.*"]);
$PAGEDATA['pagination'] = ["page" => $page, "total" => $DBLIB->totalPages];
$PAGEDATA['instances'] = [];
$PAGEDATA['totals'] = ["assets" => ["VALUE" => 0.0,"MASS" => 0.0, "COUNT" => 0], "STORAGEUSED" => 0, "STORAGEALLOWED" => 0];
foreach ($instances as $instance) {
	//Inventory
	$DBLIB->where("assets.instances_id", $instance['instances_id']);
	$DBLIB->orderBy("assets_inserted", "ASC");
	$DBLIB->where("assets_deleted", 0);
	$DBLIB->join("assetTypes", "assets.assetTypes_id=assetTypes.assetTypes_id", "LEFT");
	$assets = $DBLIB->get("assets", null, ["assets_inserted", "assetTypes_value", "assetTypes_mass"]);
	$instance['assets'] = ["VALUE" => 0.0,"MASS" => 0.0, "COUNT" => 0];
	foreach ($assets as $asset) {
		$instance['assets']['VALUE'] += $asset['assetTypes_value'];
		$instance['assets']['MASS'] += $asset['assetTypes_mass'];
		$instance['assets']['COUNT'] += 1;
		$PAGEDATA['totals']['assets']['VALUE'] += $asset['assetTypes_value'];
		$PAGEDATA['totals']['assets']['MASS'] += $asset['assetTypes_mass'];
		$PAGEDATA['totals']['assets']['COUNT'] += 1;
	}

	//Storage
	$DBLIB->where("s3files.instances_id", $instance['instances_id']);
	$DBLIB->where("(s3files_meta_deleteOn IS NULL)");
	$DBLIB->where("s3files_meta_physicallyStored", 1);
	$instance['STORAGEUSED'] = $DBLIB->getValue("s3files", "SUM(s3files_meta_size)");
	$PAGEDATA['totals']['STORAGEUSED'] += $instance['STORAGEUSED'];
	$PAGEDATA['totals']['STORAGEALLOWED'] += $instance['instances_storageLimit'];
	//USERS
	$DBLIB->join("userInstances", "users.users_userid=userInstances.users_userid","LEFT");
	$DBLIB->join("instancePositions", "userInstances.instancePositions_id=instancePositions.instancePositions_id","LEFT");
	$DBLIB->where("instances_id",  $instance['instances_id']);
	$DBLIB->where("userInstances.userInstances_deleted",  0);
	$instance['USERS'] = $DBLIB->getValue("users","COUNT(*)");


	$PAGEDATA['instances'][] = $instance;
}
echo $TWIG->render('instances.twig', $PAGEDATA);
?>