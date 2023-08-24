  import React from "react";
  import "./App.scss";
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";
  import { BrowserRouter, Routes, Route } from "react-router-dom";
  import Dashboard from "./page/Dashboard/Dashboard";
  import { Web3ReactProvider } from "@web3-react/core";
  import Web3 from "web3";
  import { useState } from "react";
  import { PrivateRoute } from "./Hooks/PrivateRoute";
  import Referrals from "./page/Referrals/Referrals";
  import Avtar from "./page/Avtar/Avtar";
  import Profile from "./page/Profile/Profile";
  import Pdfadd from "./page/Pdfadd";
  import Academy from "./page/Academy/Academy";
  import Support from "./page/Support/Support";
  import AdminSupport from "./page/AdminSuport/AdminSupport";
  import Uploadimg from "./page/Uploadimg/Uploadimg";
  import WithdrawHistory from "./page/WithdrawHistory/WithdrawHistory";
  import Uploadimgadmin from "./page/Uploadimgadmin/Uploadimgadmin";
import Allusers from "./page/Allusers/Allusers";
import AvatarbuyUsers from "./page/AvatarbuyUsers/AvatarbuyUsers";
  const Header = React.lazy(() => import("./components/Header/Header"));
  const Home = React.lazy(() => import("./page/Home/Home"));
  const Footer = React.lazy(() => import("./components/Footer/Footer"));
  const Signin = React.lazy(() => import("./page/Signin/index"));
  const AdminSignin = React.lazy(() => import("./page/Signinadmin/index"));
  const Dashboard1 = React.lazy(() => import("./page/Dashboard/Dashboard"));
  const Forgetpassword = React.lazy(() =>
    import("./page/Forgetpassword/Forgetpassword")
  );
  const AdminForgetpassword = React.lazy(() =>
    import("./page/Forgetpasswordadmin/Forgetpassword")
  );
  const Saidbar = React.lazy(() => import("./page/Saidbar/Saidbar"));
  const Saidbar1 = React.lazy(() => import("./page/Saidbaradmin/Saidbar"));
  const PrivacyPolicy = React.lazy(() =>
    import("./page/PrivacyPolicy/PrivacyPolicy")
  );
  const RiskDisclaimerPolicy = React.lazy(() =>
    import("./page/PrivacyPolicy/RiskDisclaimerPolicy")
  );
  const Tnc = React.lazy(() => import("./page/PrivacyPolicy/Tnc"));
  const Buypackages = React.lazy(() => import("./page/Buypackages/packages"));
  const Spinner = () => {
    return (
      <div className="body">
        <div id="loading-wrapper">
          <div id="loading-text">LOADING</div>
          <div id="loading-content"></div>
        </div>
      </div>
    );
  };
  function App() {
    const [step, setstep] = useState(false);
    const getLibrary = (provider) => {
      return new Web3(provider);
    };
    
    return (
      <>
        <Web3ReactProvider getLibrary={getLibrary}>
          <BrowserRouter>
            <React.Suspense fallback={<Spinner />}>
              <Routes>
                <Route
                  path="/"
                  element={
                    <>
                      <Home />
                      <Footer />
                    </>
                  }
                />
                <Route path="/reset/:id" element={<Forgetpassword />} />
                <Route path="/admin/:id" element={<AdminForgetpassword />} />
                <Route path="/Signin/:id" element={<Signin />} />
                <Route path="/admin/Signin/" element={<AdminSignin />} />
                <Route
                  path="/RiskDisclaimerPolicy"
                  element={<RiskDisclaimerPolicy />}
                />
                <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
                <Route path="/tnc" element={<Tnc />} />
                <Route
                  path="/"
                  element={<Saidbar step={step} setstep={setstep} />}
                >
                  <Route
                    path="/Avatars"
                    element={
                      <PrivateRoute>
                        <Avtar />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/Profile"
                    element={
                      <PrivateRoute>
                        <Profile />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/Dashboard"
                    element={
                      <PrivateRoute>
                        <Dashboard1 />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/referrals"
                    element={
                      <PrivateRoute>
                        <Referrals />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/Buypackages"
                    element={
                      <PrivateRoute>
                        <Buypackages />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/Academy"
                    element={
                      <PrivateRoute>
                        <Academy />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/WithdrawHistory"
                    element={
                      <PrivateRoute>
                        <WithdrawHistory />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/support"
                    element={
                      <PrivateRoute>
                        <Support />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/Upload/picture"
                    element={
                      <PrivateRoute>
                        <Uploadimg />
                      </PrivateRoute>
                    }
                  />
                </Route>
                <Route
                  path="/admin/dashboard"
                  element={
                    <PrivateRoute>
                      <Saidbar1 subpage={<Pdfadd />} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/suport"
                  element={
                    <PrivateRoute>
                      <Saidbar1 subpage={<AdminSupport />} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/Upload-picture"
                  element={
                    <PrivateRoute>
                      <Saidbar1 subpage={<Uploadimgadmin />} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/allusers"
                  element={
                    <PrivateRoute>
                      <Saidbar1 subpage={<Allusers />} />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/AvatarbuyUsers"
                  element={
                    <PrivateRoute>
                      <Saidbar1 subpage={<AvatarbuyUsers />} />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </React.Suspense>
          </BrowserRouter>
        </Web3ReactProvider>
      </>
    );
  }

export default App;
