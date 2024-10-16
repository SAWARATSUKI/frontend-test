interface Prefecture {
  prefCode: number;
  prefName: string;
}

type ResponsePopulation = {
  label: string;
  data: {
    year: number;
    value: number;
  }[];
};
type ResponsePrefectures = {
  prefCode: number;
  prefName: string;
};

interface PopulationData {
  year: number;
  value: number;
  prefName: string;
}
