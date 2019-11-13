/*Step 1. Create a file routes/CompanyRoutes
Step 2. Create one route /company which will be a company document
Step 3. Create a CompanySchema and a CompanyModel in models/CompanyModel.js
    //Schema Company name
    // no. of employees
    //location
    //website
    //contact
    //logo
Step 4. Require the route in server.js 
Step 5. Make the route private */

const express = require('express');
const router = express.Router();
const Company = require('../models/Company');
router.post('/', (req, res)=>{ // /feed/...
    const formData = {
        companyname: req.body.companyname,
        employees: req.body.employees,
        location: req.body.location,
        website: req.body.website,
        contact: req.body.contact,
        logo: req.body.logo,
    }

    const newCompany = new Company(formData);
    newCompany
    .save()
    .then(newCompanyData=>{
        res.json(newCompanyData);
    })
    .catch(err=>{
        res.json(err)
    });

});
module.exports = router;