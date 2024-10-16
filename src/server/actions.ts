'use server';

export const getPrefectures = async () => {
  const res = await fetch(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures',
    {
      headers: { 'X-API-KEY': process.env.RESAS_APIKEY! },
    }
  );
  const data = await res.json();
  console.log(process.env.RESAS_API_KEY);
  return data.result;
};
