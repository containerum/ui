// API_ENV=http://web.containerum.io SHOW_ENV=true npm test

const Nightmare = require('nightmare');
const expect = require('chai').expect; // jshint ignore:line

const isShowNightmare = process.env.SHOW_ENV || false;
const ui = process.env.API_ENV || 'http://web.containerum.io';

describe('Login Page', function () {
    this.timeout('30s');

    let nightmare = null;
    beforeEach(() => {
        nightmare = new Nightmare({ show: isShowNightmare });
    });

    describe('given fail data', () => {
        it('should not work login', (done) => {
            nightmare
            .goto(ui + '/Login')
            .wait('.c-logo-login')
            .type('.form-control[type=email]', 'ddncn2s@list.ru')
            .type('.form-control[type=password]', 'password')
            .click('.btn.btn-block.c-btn-green[type=submit]')
            .wait(4000)
            .evaluate(() => {
                return window.document.querySelector('#loginAlert').innerText.trim();
            })
            .end()
            .then((link) => {
                console.log(link);
                expect(link).to.equal('Email or Password is not valid');
                done();
            });
        });
    });

    describe('given right data', () => {
        it('should work login', (done) => {
            nightmare
            .goto(ui + '/Login')
            .wait('.c-logo-login')
            .type('.form-control[type=email]', 'mlgrg1uncn2s@list.ru')
            .type('.form-control[type=password]', 'password')
            .click('.btn.btn-block.c-btn-green[type=submit]')
            .wait('.c-nav-user-icon')
            .wait(2000)
            .evaluate(() => {
                return window.location.href;
            })
            .end()
            .then((link) => {
                console.log(link);
                expect(link).to.equal(ui + '/Namespaces/default');
                done();
            });
        });
    });
});

describe('Logout Page', function () {
    this.timeout('30s');

    let nightmare = null;
    beforeEach(() => {
        nightmare = new Nightmare({ show: isShowNightmare });
    });

    describe('given right data', () => {
        it('should work logout', (done) => {
            nightmare
            .viewport(1000, 1000)
            .goto(ui + '/Login')
            .wait('.c-logo-login')
            .type('.form-control[type=email]', 'mlgrg1uncn2s@list.ru')
            .type('.form-control[type=password]', 'password')
            .click('.btn.btn-block.c-btn-green[type=submit]')
            .wait(2000)
            .click('.btn.c-nav-user-btn')
            .wait(1000)
            .click('a.dropdown-item.text-danger')
            .wait(1000)
            .evaluate(() => {
                return window.location.href;
            })
            .end()
            .then((link) => {
                console.log(link);
                expect(link).to.equal(ui + '/Login');
                done();
            });
        });
    });
});
