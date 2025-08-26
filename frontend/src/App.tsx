import { Authenticated, Refine } from "@refinedev/core";
import {
  useNotificationProvider,
  ThemedLayoutV2,
  ErrorComponent,
  AuthPage,
} from "@refinedev/antd";
import routerProvider, {
  NavigateToResource,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  CatchAllNavigate,
} from "@refinedev/react-router";
import { BrowserRouter, Routes, Route, Outlet } from "react-router";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { App as AntdApp } from "antd";
import { Header } from "@/components/header";
import { Logo } from "@/components/logo";
import {
  TasksPageList,
  TasksPageCreate,
  TasksPageEdit,
} from "@/pages/tasks";

import { dataProvider } from "@/providers/data-provider";
import { authProvider } from "@/providers/auth-provider";
import { ConfigProvider } from "@/providers/config-provider";
import "@refinedev/antd/dist/reset.css";
import "./styles/custom.css";

const App: React.FC = () => {
  return (
    <DevtoolsProvider>
      <BrowserRouter>
        <ConfigProvider>
          <AntdApp>
            <Refine
              routerProvider={routerProvider}
              authProvider={authProvider}
              dataProvider={dataProvider}
              resources={[
                {
                  name: "tareas",
                  list: "/tareas",
                  create: "/tareas/create",
                  edit: "/tareas/edit/:id",
                }

              ]}
              notificationProvider={useNotificationProvider}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
                breadcrumb: false,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated
                      key="authenticated-routes"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <ThemedLayoutV2
                        Header={() => <Header />}
                        Sider={() => null}
                      >
                        <div
                          style={{
                            maxWidth: "1280px",
                            padding: "24px",
                            margin: "0 auto",
                          }}
                        >
                          <Outlet />
                        </div>
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route index element={<NavigateToResource />} />
                  <Route
                    path="/tareas"
                    element={
                      <TasksPageList>
                        <Outlet />
                      </TasksPageList>
                    }
                  >
                    <Route index element={null} />
                    <Route path="create" element={<TasksPageCreate />} />

                  </Route>
                  <Route
                    path="/tareas/edit/:id"
                    element={<TasksPageEdit />}
                  />
                  <Route path="*" element={<ErrorComponent />} />
                </Route>

                <Route
                  element={
                    <Authenticated key="auth-pages" fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route
                    path="/login"
                    element={
                      <AuthPage
                        type="login"
                        forgotPasswordLink
                        title={
                          <Logo
                            titleProps={{ level: 2 }}
                            svgProps={{
                              width: "48px",
                              height: "40px",
                            }}
                          />
                        }
                        formProps={{
                          initialValues: {
                            email: "demo@refine.dev",
                            password: "demodemo",
                          },
                        }}
                      />
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <AuthPage
                        type="register"

                        title={
                          <Logo
                            titleProps={{ level: 2 }}
                            svgProps={{
                              width: "48px",
                              height: "40px",
                            }}
                          />
                        }
                      />
                    }
                  />

                </Route>

                <Route
                  element={
                    <Authenticated key="catch-all">
                      <ThemedLayoutV2
                        Header={() => <Header />}
                        Sider={() => null}
                      >
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>
              <UnsavedChangesNotifier />
              <DocumentTitleHandler />
            </Refine>
          </AntdApp>
        </ConfigProvider>
        <DevtoolsPanel />
      </BrowserRouter>
    </DevtoolsProvider>
  );
};

export default App;
