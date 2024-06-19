const express = require('express')
const app = express();
const router = express.Router();

const axios = require('axios');
console.log(1234);
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE4NzgzODcyLCJpYXQiOjE3MTg3ODM1NzIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjZlYjE5NzVkLTAwYjItNDUxOS05YzU3LWJhZGMwNGJkMDUzZiIsInN1YiI6IjIxMDMwMzEwODAzOUBwYXJ1bHVuaXZlcnNpdHkuYWMuaW4ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6IjZlYjE5NzVkLTAwYjItNDUxOS05YzU3LWJhZGMwNGJkMDUzZiIsImNsaWVudFNlY3JldCI6InZLSFpYQU5JWWhOSXVzWU0iLCJvd25lck5hbWUiOiJMYXhpdCBLaGFucGFyYSIsIm93bmVyRW1haWwiOiIyMTAzMDMxMDgwMzlAcGFydWx1bml2ZXJzaXR5LmFjLmluIiwicm9sbE5vIjoiMjEwMzAzMTA4MDM5In0.di4fwYA508JinVHlK6iZAACxPhZehvRAO-MZRwUiD9A'
// Route to fetch data from the API
let products
router.get(`/categories/:categoryname/products`, async (req, res) => {
    try {
        const categoryname=req.params.categoryname
        console.log(categoryname);
        // console.log(123);
        // const {} =req.body
        console.log(`Bearer ${token}`);
        // const apiEndpoint = 'http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000';
        const apiEndpoint = `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=10000`;


        const response = await axios.get(apiEndpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        let idCounter = 1;
        products = response.data.map((product) => ({
            id: idCounter++,
            ...product
        }));
        // Log the data received from the API
        console.log('Data from API:', products);

        products.sort((a, b) => b.rating - a.rating);

        res.json(products); // Send the API response as JSON
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

router.get(`/categories/:categoryname/products/:productid`, async (req, res) => {
    try {
        const categoryname=req.params.categoryname
        const productid=req.params.productid

        console.log(categoryname);
        console.log(`Bearer ${token}`);
        // const apiEndpoint = 'http://20.244.56.144/test/companies/AMZ/categories/Laptop/products?top=10&minPrice=1&maxPrice=10000';
        const apiEndpoint = `http://20.244.56.144/test/companies/AMZ/categories/${categoryname}/products?top=10&minPrice=1&maxPrice=10000`;


        const response = await axios.get(apiEndpoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

     
        console.log('Data from API:', response);

        response.data.sort((a, b) => b.rating - a.rating);
        

        res.json(products); // Send the API response as JSON
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});



//===========export router=============
module.exports = router;