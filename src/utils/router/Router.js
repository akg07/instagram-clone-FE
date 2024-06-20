
export const get = (url) => {

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
  const response = fetch(`${url}`, {
    method: 'post',
    body: body
  }).then((res => res.json()));

  return response;
}
