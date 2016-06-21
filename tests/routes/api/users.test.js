'use strict';


// import the moongoose helper utilities
var utils = require('../../utils');
var expect = require('chai').expect
var should = require('should');

// import our User mongoose model
var User = require('./../../../models/user');

var myApp = require('./../../../app.js');
var request = require('supertest')(myApp);

describe('User APIs', function () {
    describe('POST /api/users/', function () {
        it('should add a user with the username joe and hashed password 123', function (done) {
            request
                .post('/api/users/register')
                .send({name: "joe", password: "123"})
                .expect('Content-Type', /json/)
                .expect(200) //Status code
                .end(function(err,res) {
                    if (err) {
                        throw err;
                    }
                    //check for properties
                    res.body.should.have.property('user');
                    res.body.user.should.have.property('_id');

                    //check if user's properties get set correctly
                    res.body.user.name.should.equal('joe');
                    res.body.user.password.should.not.equal('123');
                    res.body.user.tasks.length.should.equal(0);
                    res.body.user.tasks.length.should.not.equal(1);

                    done();
                });
        });

        it("should give a json with an error 'name already taken' when we try submitting another user with the name 'joe'", function (done) {
            request
                .post('/api/users/register')
                .send({name: "joe", password: "123"})
                .expect('Content-Type', /json/)
                .expect(200) //Status code
                .end(function(err,res) {
                    res.body.should.have.property('error');
                    res.body.error.should.equal("name already taken");
                    done();
                });
        });
    });



});