const getJSON = async url => {
  const res = await fetch(url);
  const data = await res.json();

  if (data.statusCode !== 200)
    throw new Error(
      data.message || 'There was a problem, please try again later.',
    );

  return data;
};

export { getJSON };
