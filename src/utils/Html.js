import React from 'react';
import type { Element } from 'react';
import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';
import _ from 'lodash/fp';
import cookie from 'react-cookies';

import type { Store } from '../types';

type Props = { store: Store, htmlContent?: string };

const getAnalytics = () =>
  `
    <!-- Google Analytics -->
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-93921188-2', 'auto');
      ga('send', 'pageview');
      ga('require', 'linker');
      ga('linker:autoLink', ['containerum.com']);
    </script>
    <!-- /End Google Analytics -->
    <!-- Yandex.Metrika counter -->
    <script type="text/javascript">
      (function (d, w, c) {
      (w[c] = w[c] || []).push(function() {
        try {
          w.yaCounter44701450 = new Ya.Metrika({
            id:44701450,
            clickmap:true,
            trackLinks:true,
            accurateTrackBounce:true,
            webvisor:true
          });
        } catch(e) { }
      });

      var n = d.getElementsByTagName("script")[0],
      s = d.createElement("script"),
      f = function () { n.parentNode.insertBefore(s, n); };
      s.type = "text/javascript";
      s.async = true;
      s.src = "https://mc.yandex.ru/metrika/watch.js";

      if (w.opera == "[object Opera]") {
      d.addEventListener("DOMContentLoaded", f, false);
    } else { f(); }
    })(document, window, "yandex_metrika_callbacks");
    </script>
    <noscript><div><img src="https://mc.yandex.ru/watch/44701450" style="position:absolute; left:-9999px;" alt="" /></div></noscript>
    <!-- /Yandex.Metrika counter -->
  `;

const emailObject = email =>
  email ? `{ op: 'update_or_create', key: '$name', value: '${email}' }` : '';
const getCarrotquest = (userClient, email) =>
  `
    <script type="text/javascript">
      (function(){
        function Build(name, args){return function(){window.carrotquestasync.push(name, arguments);} }
        if (typeof carrotquest === 'undefined') {
          var s = document.createElement('script'); s.type = 'text/javascript'; s.async = true;
          s.src = '//cdn.carrotquest.io/api.min.js';
          var x = document.getElementsByTagName('head')[0]; x.appendChild(s);
          window.carrotquest = {}; window.carrotquestasync = []; carrotquest.settings = {};
          var m = ['connect', 'track', 'identify', 'auth', 'open', 'onReady', 'addCallback', 'removeCallback', 'trackMessageInteraction'];
          for (var i = 0; i < m.length; i++) carrotquest[m[i]] = Build(m[i]);
        }
      })();
      carrotquest.connect('15308-9fb36e7c20baba83e4b25000f8');
      carrotquest.identify([
            {op: 'update_or_create', key: 'User-Client', value: "${userClient}"},
            {op: 'update_or_create', key: 'User-Agent', value: window.navigator.userAgent},
            {op: 'update_or_create', key: 'User-Browser', value: window.navigator.appCodeName},
            {op: 'update_or_create', key: 'Platform', value: window.navigator.platform},
            ${emailObject(email)}
          ]);
    </script>
  `;

const Html = ({ store, htmlContent }: Props): Element<'html'> => {
  // Should be declared after "renderToStaticMarkup()" of "../server.js" or it won't work
  const head = Helmet.renderStatic();
  const attrs = head.htmlAttributes.toComponent();
  const { lang, ...rest } = attrs || {};
  const assets = webpackIsomorphicTools.assets();

  const browser = cookie.load('browser') ? cookie.load('browser') : null;
  const getProfileReducer = store.getState().getProfileReducer.data;
  const email = getProfileReducer ? getProfileReducer.login : null;
  return (
    <html {...rest} lang={lang || 'en'}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.css"
        />
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"
          integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta/css/bootstrap-grid.min.css"
        />
        <script src="https://www.google.com/recaptcha/api.js" async defer />
        {head.title.toComponent()}
        {head.base.toComponent()}
        {head.meta.toComponent()}
        {head.link.toComponent()}
        {/* Styles will be presented in production with webpack extract text plugin */}
        {_.keys(assets.styles).map(style => (
          <link
            key={_.uniqueId()}
            href={assets.styles[style]}
            media="screen, projection"
            rel="stylesheet"
            type="text/css"
          />
        ))}
        {/* Styles will be presented in development mode */}
        {/* I put all of the styles here to smoothen the flick */}
        {_.keys(assets.styles).length === 0 ? (
          <style
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html:
                require('../theme/normalize.css')._style +
                require('../containers/Login/Login.css')._style +
                require('../containers/NotFound/styles.scss')._style +
                require('../components/MiniSpinner/MiniSpinner.css')._style +
                require('../theme/custom.css')._style +
                require('../theme/individual.css')._style +
                require('../theme/style.css')._style +
                require('../theme/style-custom.css')._style +
                require('../containers/Support/Support.css')._style +
                require('../components/ProfileInfo/Profile.css')._style +
                require('../containers/Account/Account.css')._style
            }}
          />
        ) : null}
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: email ? getCarrotquest(browser, email) : null
          }}
        />
      </head>
      <body>
        <div
          id="react-view"
          // Rendering the route, which passed from server-side
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: htmlContent || '' }}
        />

        <script
          // Store the initial state into window
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html:
              store &&
              `window.__INITIAL_STATE__=${serialize(store.getState())};`
          }}
        />
        {_.keys(assets.javascript)
          .reverse() // Reverse the order of scripts for accessing vendor.js first
          .map(script => (
            <script key={_.uniqueId()} src={assets.javascript[script]} />
          ))}
        {head.script.toComponent()}
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" />
        <script
          src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js"
          integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1"
          crossOrigin="anonymous"
        />
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: getAnalytics() }}
        />
      </body>
    </html>
  );
};

Html.defaultProps = { htmlContent: '' };

export default Html;
