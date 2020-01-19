<?php
require_once __DIR__ . '/../../apiHeadSecure.php';

if (!$AUTH->instancePermissionCheck(43) or !isset($_POST['assetsAssignments'])) die("404");
foreach ($_POST['assetsAssignments'] as $assignment) {
    $DBLIB->where("assetsAssignments_id", $assignment);
    $DBLIB->where("projects.instances_id", $AUTH->data['instance']['instances_id']);
    $DBLIB->where("projects.projects_deleted", 0);
    $DBLIB->join("projects", "assetsAssignments.projects_id=projects.projects_id", "LEFT");
    $assignment = $DBLIB->update("assetsAssignments", ["assetsAssignments_discount" => $_POST['assetsAssignments_discount']]);
    if (!$assignment) finish(false);
    else {
        $bCMS->auditLog("EDIT-DISCOUNT", "assetsAssignments", $_POST['assetsAssignments_discount'], $AUTH->data['users_userid'],null, $assignment['projects_id']);
    }
}
finish(true);