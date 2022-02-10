const APIURL = 'https://economia.awesomeapi.com.br/json/all';

const getCoin = async () => {
  const response = await fetch(APIURL);
  const location = await response.json();
  // console.log(location);
  return location;
};

export default getCoin;
