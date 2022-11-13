import axios from "axios";

const BASE_URL = 'https://youtube-v3-alternative.p.rapidapi.com'
const options = {
  headers: {
    'X-RapidAPI-Host': 'youtube-v3-alternative.p.rapidapi.com',
    'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
  }
};


export const fetchYouTubeApi = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options)
  return data
}


const BASE_URL_PIXELS = 'https://api.pexels.com/'
const option = {
  headers: {Authorization: process.env.REACT_APP_PIXELS_API_KEY}
};


export const fetchPixelsAPI = async (url) => {
  const {data} = await axios.get(`${BASE_URL_PIXELS}/${url}`, option)
  return data
 }
