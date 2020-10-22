// HANDLERS
export function handleInputChange(e, cb) {
  cb(e.target.value);
}

export function handleOnSubmit(query, cb) {
  fetchProducts(query, cb);
}

// FETCH FUNCTIONS
async function fetchProducts(query, cb) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  const results = await fetch("http://localhost:8080/api/search?query=" + query, requestOptions)
  const data = await results.json();

  cb(data);
}