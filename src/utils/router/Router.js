
export const get = (url) => {
  console.log(`get || url: ${url}`);

  const response = fetch(`${url}`, {
    headers: {
      'Authorization' : `Bearer ${localStorage.getItem('jwt')}`,
      'Content-type': "application/json"
    },
    method: 'get'
  })
  .then(res => res.json());

  return response;
}

export const put = (url, body) => {
  console.log(`put || url: ${url} || payload: ${body}`);

  const response = fetch(`${url}`, {
    method: 'put',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify(body)
  })
  .then(res => res.json());

  return response;
}

export const deleteWithparams = (url, id) => {

  console.log(`delete with params || Url: ${url} || id: ${id}`);

  const response = fetch(`${url}/${id}`, {
    method: 'delete',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('jwt')}`
    }
  })
  .then(res => res.json())

  return response;
}

export const post = (url, body) => {
  console.log(`post || url: ${url} || payload: ${body}`);
  const response = fetch(`${url}`, {
      method: 'post',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify(body)
  }).then((res => res.json()));

  return response;
}

export const postThirdParty = (url, body) => {
  console.log(`postThirdParty || url: ${url} || payload: ${body}`);

  const response = fetch(`${url}`, {
    method: 'post',
    body: body
  }).then((res => res.json()));

  return response;
}
