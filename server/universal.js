const path = require('path')
const fs = require('fs')

import React from 'react'
import {renderToString} from 'react-dom/server'
import {match, RouterContext} from 'react-router'

import createRoutes from '../src/routes'
import configureStore from '../src/store'
import {Provider} from 'react-redux'

const routes = createRoutes({})

module.exports = function universalLoader(req, res) {
  //res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'))
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

  fs.readFile(filePath, 'utf8', (err, htmlData)=>{
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }
    match({ routes, location: req.url }, (err, redirect, renderProps) => {
      if(err) {
        console.error('match err', err)
        return res.status(404).end()
      } else if(redirect) {
        res.redirect(302, redirect.pathname + redirect.search)
      } else if(renderProps) {
        let store = configureStore()
        const ReactApp = renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        )
        const RenderedApp = htmlData.replace(`{{SSR}}<div class="placeholder-pre-render"><div><div class="wrapper"><header class="header"><div class="header-top"><div class="header-top-container container"><div class="header__logo"><a href="/" class=""><img src="logo.png" alt=""></a></div><ul class="header-top-menu nav"></ul><div class="header-top-account"><div class="header-top-account__info"><div class="header-top-account__name dropdown"></div></div></div><div class="clearfix"></div></div></div></header><div class="content-block"><div class=" container no-back"><div class="row double two-columns"><div class="clearfix"></div></div></div></div></div><footer class="footer"><div class="footer-wrapper"><div class="footer-container container"><div class="footer__logo">Created by Exon Lab</div><a target="_blank" class="footer__download_cli">Download CLI <img src="arrows.png" alt=""></a><a target="_blank" href="https://containerum.com/documentation" class="footer__help">Docs</a></div></div></footer></div></div>`, ReactApp);
        res.send(RenderedApp)
      } else {
        return res.status(404).end()
      }
    })
  })
}

