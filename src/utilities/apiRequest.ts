const getRequest = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    return 'failed to fetch data';
  }
  const data = await response.json();
  return data;
};

export default getRequest;
