'use server';
export async function getPrefectures(): Promise<Prefecture[]> {
  const res = await fetch(
    'https://opendata.resas-portal.go.jp/api/v1/prefectures',
    {
      headers: { 'X-API-KEY': process.env.RESAS_APIKEY! },
    }
  );
  const data = await res.json();
  return data.result;
}
export async function getPopulationData(
  prefCode: number
): Promise<ResponsePopulation[]> {
  const res = await fetch(
    `https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=${prefCode}`,
    {
      headers: { 'X-API-KEY': process.env.RESAS_APIKEY! },
    }
  );
  const data = await res.json();
  return data.result.data;
}
