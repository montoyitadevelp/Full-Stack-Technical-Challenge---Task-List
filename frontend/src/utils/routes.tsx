import { Header } from "@/components/header";
import { Logo } from "@/components/logo";
import {
    TasksPageList,
    TasksPageCreate,
    TasksPageEdit,
} from "@/pages/task";
import { CategoryPageCreate, CategoryPageEdit, CategoryPageList } from "@/pages/category";
import { LabelPageCreate, LabelPageList } from "@/pages/label";
import {
    ThemedLayoutV2,
    ErrorComponent,
    AuthPage,
} from "@refinedev/antd";
import {
    NavigateToResource,
    CatchAllNavigate,
} from "@refinedev/react-router";
import { Routes, Route, Outlet } from "react-router";
import { Authenticated } from "@refinedev/core";
import { RegisterForm } from "@/domains/auth/components/RegisterForm";

export const GeneralRoutes = () => {
    return <Routes>
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
            <Route
                path="/categorias"
                element={
                    <CategoryPageList>
                        <Outlet />
                    </CategoryPageList>
                }
            >
                <Route index element={null} />
                <Route path="create" element={<CategoryPageCreate />} />
            </Route>

            <Route
                path="/categorias/edit/:id"
                element={<CategoryPageEdit />}
            />

            <Route
                path="/etiquetas"
                element={
                    <LabelPageList>
                        <Outlet />
                    </LabelPageList>
                }
            >
                <Route index element={null} />
                <Route path="create" element={<LabelPageCreate />} />
            </Route>
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
                                svgProps={{ width: "48px", height: "40px" }}
                            />
                        }
                        renderContent={(content, title) => (
                            <>
                                {title}
                                <RegisterForm />
                            </>
                        )}
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
}