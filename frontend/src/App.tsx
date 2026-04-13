import { Refine } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import routerProvider, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import "./App.css";
import { Toaster } from "./components/refine-ui/notification/toaster";
import { useNotificationProvider } from "./components/refine-ui/notification/use-notification-provider";
import { ThemeProvider } from "./components/refine-ui/theme/theme-provider";
import { dataProvider } from "./providers/data";
import { Folder } from "lucide-react";
import { Layout } from "./components/refine-ui/layout/layout";
import ItemList from "./pages/items/list";
import CreateItem from "./pages/items/create";
import ShowItem from "./pages/items/show";
import CategoriesList from "./pages/categories/list";
import CreateCategory from "./pages/categories/create";
import ShowCategory from "./pages/categories/show";
import EditItem from "./pages/items/edit";
import EditCategory from "./pages/categories/edit";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ThemeProvider>
          <DevtoolsProvider>
            <Refine
              dataProvider={dataProvider}
              notificationProvider={useNotificationProvider()}
              routerProvider={routerProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                projectId: "OsTYOK-6UJWzR-uZdR5t",
              }}
              resources={[
                {
                  name: "items",
                  list: "/items",
                  create: "/items/create",
                  show: "/items/:id",
                  edit: "/items/:id/edit",
                  meta: {
                    label: "Items",
                    icon: <Folder />
                  }
                },
                {
                  name: "categories",
                  list: "/categories",
                  create: "/categories/create",
                  show: "/categories/:id",
                  edit: "/categories/:id/edit",
                  meta: {
                    label: "Categories",
                    icon: <Folder />
                  }
                }
              ]}
            >
              <Routes>
                <Route
                  element={
                    <Layout>
                      <Outlet />
                    </Layout>
                  }
                >
                  <Route path="/" index element={<div>Home</div>} />

                  <Route path="*" element={<div>404</div>} />

                  <Route path="items">
                    <Route index element={<ItemList />} />
                    <Route path="create" element={ <CreateItem /> } />
                    <Route path=":id" element={ <ShowItem /> } />
                    <Route path=":id/edit" element={ <EditItem /> } />
                  </Route>

                  <Route path="categories">
                    <Route index element={ <CategoriesList /> } />
                    <Route path="create" element={ <CreateCategory /> } />
                    <Route path=":id" element= { <ShowCategory /> } />
                    <Route path=":id/edit" element={ <EditCategory /> } />
                  </Route>


                </Route>
              </Routes>
              <Toaster />
              <RefineKbar />
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
            <DevtoolsPanel />
          </DevtoolsProvider>
        </ThemeProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
