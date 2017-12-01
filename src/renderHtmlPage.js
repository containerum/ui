/* eslint max-len:0 */

import Helmet from 'react-helmet';
import serialize from 'serialize-javascript';

export default (content, initialState) => {
  const head = Helmet.rewind();
  const assets = webpackIsomorphicTools.assets();

  // Setup html page
  return `
    <!DOCTYPE html>
    <html ${head.htmlAttributes.toString()}>
      <head>
        <meta charset="utf-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta http-equiv="Content-Language" content="en" />
        <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700&amp;subset=cyrillic" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/ionicons/2.0.1/css/ionicons.css" />
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-beta/css/bootstrap-grid.min.css" />
        <script src="https://www.google.com/recaptcha/api.js" async defer></script>

        ${head.base.toString()}
        ${head.title.toString()}
        ${head.meta.toString()}
        ${head.link.toString()}

        ${
  /* Styles will be presented in production with webpack extract text plugin */
  Object.keys(assets.styles).map(style =>
    `<link href="${assets.styles[style]}" media="screen, projection" rel="stylesheet" type="text/css" />`)
    .join('\n')
}

        ${
  /* Styles will be presented in development mode
     I put all of the styles here to smoothen the flick */
  Object.keys(assets.styles).length === 0 ?
    `<style>${
      require('./styles/custom.css')._style +
      require('./styles/flags.css')._style +
      require('./styles/individual.css')._style +
      require('./styles/style.css')._style +
      require('./styles/style-custom.css')._style +
      require('./components/Account/Account.css')._style +
      require('./components/Account/Profile/Profile.css')._style +
      require('./components/Account/Profile/Profile.css')._style +
      require('./components/MiniSpinner/MiniSpinner.css')._style +
      require('./components/NotFound/NotFound.css')._style +
      require('./components/Support/Support.css')._style
    }</style>` : ''
}
      </head>
      <body>
        <div id="react-view">${content || null}</div>

        <script type="text/javascript">
          ${initialState && `window.__INITIAL_STATE__=${serialize(initialState)}`}
        </script>

        <!--[if gte IE 9 ]>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.9/es5-shim.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/es5-shim/4.5.9/es5-sham.min.js"></script>
        <![endif]-->

        ${
  /* Reverse the order of scripts for accessing vendor.js first */
  Object.keys(assets.javascript).reverse().map(script =>
    `<script src="${assets.javascript[script]}"></script>`)
    .join('\n')
}
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.11.0/umd/popper.min.js" integrity="sha384-b/U6ypiBEHpOf/4+1nzFpr53nxSS+GLCkfwBdFNTxtclqqenISfwAzpKaMNFNmj4" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/js/bootstrap.min.js" integrity="sha384-h0AbiXch4ZDo7tp9hKZ4TsHbi047NrKGLO3SEJAg45jXxnGIfYzk4Si90RDIqNm1" crossorigin="anonymous"></script>
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
        ${head.script.toString()}
      </body>
    </html>
  `;
};
