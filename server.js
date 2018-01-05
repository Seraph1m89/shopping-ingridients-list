'use strict';

require('zone.js/dist/zone-node');
require('reflect-metadata');

const express = require('express');
const ngUniversal = require('@nguniversal/express-engine');
const { provideModuleMap } = require('@nguniversal/module-map-ngfactory-loader');
const { enableProdMode } = require("@angular/core");
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');
const { join } = require('path');
const DIST_FOLDER = join(process.cwd(), 'dist');
const PORT = process.env.PORT || 3000;
enableProdMode();

function angularRouter(req, res) {
    res.render('index', {req, res});
}

const app = express();

app.engine('html', ngUniversal.ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, "browser"));

app.get('/', angularRouter);
app.use(express.static(join(DIST_FOLDER, "browser")));
app.get('*', angularRouter);

app.listen(PORT, () => {console.log("Server is running on port " + PORT)});