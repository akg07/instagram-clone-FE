import axios from 'axios';

export const get = async (url) => {
  console.log(`get || url: ${url}`);
  const {data} = await axios.get(`${url}`, {
    headers: {
      'Authorization' : `Bearer ${localStorage.getItem('jwt')}`,
      'Content-type': "application/json"
    },
  });
  return data;
}

export const put = async (url, body) => {
  console.log(`put || url: ${url} || payload: ${body}`);
  const payload = JSON.stringify(body);
  const {data} = await axios.put(`${url}`,payload, {
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
  });

  return data;
}

export const deleteWithparams = async (url, id) => {
  console.log(`delete with params || Url: ${url} || id: ${id}`);

  const {data} = await axios.delete(`${url}/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  });

  return data;
}

export const post = async (url, body) => {
  console.log(`post || url: ${url} || payload: ${body}`);
  
  const payload = JSON.stringify(body);
  const { data } = await axios.post(`${url}`, payload, {headers: {
    'Content-type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('jwt')}`
  }})

  return data;
}

export const postThirdParty = async (url, body) => {
  console.log(`postThirdParty || url: ${url} || payload: ${body}`);
  const {data} = await axios.post(`${url}`, body)
  return data;
}
