// HANDLERS
export function handleInputChange(e, inputChange) {
  inputChange(e.target.value);
}

export function handleOnSubmit(query, setCache, cache) {
  if (!cache.hasOwnProperty(query))
    fetchProducts(query, setCache, cache);
}

// FETCH FUNCTIONS
async function fetchProducts(query, setCache, cache) {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  const results = await fetch("http://localhost:8080/api/search?query=" + query, requestOptions)
  const data = await results.json();

  const asc = [...data].sort((a, b) => a.price - b.price);
  const desc = [...asc].reverse();

  const news = [...data].filter(e => e.condition === 'new');
  const used = [...data].filter(e => e.condition === 'used');

  setCache({
    ...cache,
    [query]: {
      noFilter: data,
      asc,
      desc,
      news,
      used
    }
  });
}