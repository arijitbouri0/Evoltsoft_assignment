import { lazy, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useMyProfileQuery } from "./redux/api/api";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";
import ProtectRouter from "./components/ProtectRouter";
import Layout from "./components/Layout";


const Home = lazy(() => import("./page/Home"));
const Login = lazy(() => import("./page/Login"));
const CreateStation = lazy(() => import("./page/CreateStation"));
const StationDetails = lazy(() => import("./page/StationDetails"));
const MapView= lazy(()=>import('./page/MapView'))

const App = () => {
  const dispatch = useDispatch();
  const { data, isSuccess, isError, isLoading } = useMyProfileQuery();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess && data && data.user) {
      dispatch(userExist(data?.user));
    }
    if (isError) {
      dispatch(userNotExist());
    }
  }, [dispatch, data, isSuccess, isError]);
  if (isLoading || (!user && !isError)) {
    return (
      <div className="text-center mt-10 text-lg text-gray-700">Loading...</div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route element={<ProtectRouter canAccess={!!user} />}>
            <Route path="/add-station" element={<CreateStation />} />
          </Route>
          <Route element={<ProtectRouter canAccess={!!user} />}>
            <Route path="/view-map" element={<MapView />} />
          </Route>
          <Route element={<ProtectRouter canAccess={!!user} />}>
            <Route path="/station/:id" element={<StationDetails />} />
          </Route>
        </Route>
        <Route
          path="/login"
          element={
            <ProtectRouter canAccess={!user} redirect="/">
              <Login />
            </ProtectRouter>
          }
        />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
};

export default App;
