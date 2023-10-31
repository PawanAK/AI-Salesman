import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const apikey = process.env.AMAZON_REAL_TIME_DATA_API_KEY;

// console.log('apikey: ', apikey);


const options = {
  method: 'GET',
  url: 'https://real-time-amazon-data.p.rapidapi.com/product-details',
  params: {
    asin: 'B07ND68YR5',
    country: 'IN'
  },
  headers: {
    'X-RapidAPI-Key': apikey,
    'X-RapidAPI-Host': 'real-time-amazon-data.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error, '\nfalling back to second api call \n----------------------------------');
    const options = {
        method: 'GET',
        url: 'https://amazon-pricing-and-product-info.p.rapidapi.com/',
        params: {
          asin: 'B07ND68YR5',
          domain: 'in'
        },
        headers: {
          'X-RapidAPI-Key': apikey,
          'X-RapidAPI-Host': 'amazon-pricing-and-product-info.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
}