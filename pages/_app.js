import React from "react";
import App, { Container } from "next/app";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import createStore from "flux/createStore";
import {
  API_BASE_PATH,
  USER_PROFILE_ENDPOINT,
  REQUEST_HEADERS_AUTH_MANUAL_COOKIE,
  REQUEST_HEADERS_AUTH
} from "constants/api";
import { Provider } from "react-redux";
import "../static/custom-carbon-theme.scss";
import { PersistGate } from "redux-persist/integration/react";
import { pathType } from "utils/antMatcher";
import NProgress from "nprogress";
import { Router } from "server/routes";
import Axios from "axios";

Router.events.on("routeChangeStart", url => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());
class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    const { req, res, isServer, asPath } = ctx;
    const path = req ? req.originalUrl : asPath;
    const type = pathType(path);
    try {
      if (isServer) {
        const { cookie } = req.headers;
        const PORT = process.env.PORT || 3000;
        const { data } = await Axios.get(
          `http://localhost:${PORT}${USER_PROFILE_ENDPOINT}`,
          REQUEST_HEADERS_AUTH_MANUAL_COOKIE(cookie)
        );
        pageProps.user = JSON.stringify(data);

        if (type === 1 || path === "/") {
          res.writeHead(302, {
            Location: "/dashboard"
          });
          res.end();
        }
      } else {
        const { data } = await Axios.get(
          `${USER_PROFILE_ENDPOINT}`,
          REQUEST_HEADERS_AUTH
        );

        pageProps.user = JSON.stringify(data);

        if (type === 1 || path === "/" || path.includes("/#")) {
          Router.replaceRoute("/dashboard");
        }
      }
    } catch (err) {
      console.log(err);
      if (type === 3) {
        if (isServer) {
          res.writeHead(302, {
            Location: "/login"
          });
          res.end();
        } else {
          Router.replaceRoute("/login");
        }
      }
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <PersistGate loading={null} persistor={store.__persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp));
