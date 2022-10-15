import { Route } from "react-router";
import Authenticated from "../components/Authenticated";
import Asset from "../pages/assets/Asset";
import AssetType from "../pages/assets/AssetType";
import AssetTypeList from "../pages/assets/AssetTypeList";
import Login from "../pages/auth/Login";
import CmsPage from "../pages/cms/CmsPage";
import CmsPageList from "../pages/cms/CmsPageList";
import Project from "../pages/projects/Project";
import ProjectAssets from "../pages/projects/ProjectAssets";
import ProjectList from "../pages/projects/ProjectList";
import { OauthCallback, Logout } from "./Auth";

/**
 * All routes for the application
 * @returns <Routes />
 */
export function Routes() {
  return (
    <>
      {/* Login */}
      <Route path="/oauth_callback" exact component={OauthCallback} />
      <Route path="/logout" exact component={Logout} />
      <Route path="/login" exact component={Login} />

      {/* Authenticated Routes */}
      <Authenticated>
        {/* Assets */}
        <Route path="/assets/" component={AssetTypeList} exact />
        <Route path="/assets/:type" component={AssetType} exact />
        <Route path="/assets/:type/:asset" component={Asset} exact />

        {/* Projects */}
        <Route path="/projects/" component={ProjectList} exact />
        <Route path="/projects/:projectId" component={Project} exact />
        <Route
          path="/projects/:projectId/assets"
          component={ProjectAssets}
          exact
        />

        {/* CMS Pages */}
        <Route path="/cms/" component={CmsPageList} exact />
        <Route path="/cms/:pageId" component={CmsPage} exact />
      </Authenticated>
    </>
  );
}
