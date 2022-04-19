import { PAGE_SIZE, noResults } from "./config";

interface BreedsProps {
  breeds: BreedProps[];
  id: string;
}
interface BreedProps {
  breed_group: string;
}


const shouldLoadMore = (page: number) => {
  const theBreed = `pic # ${page * PAGE_SIZE}`;
  const spans = document.getElementsByTagName("span");
  for (var i = 0; i < spans.length; i++) {
    if (spans[i].textContent === theBreed) {
      return true;
    }
  }
  return false;
};

const breedsCompare = (d1: BreedsProps, d2: BreedsProps) => {
  const a = !!d1.breeds[0].breed_group ? d1.breeds[0].breed_group.toLowerCase():"zero";
  const b = !!d2.breeds[0].breed_group ? d2.breeds[0].breed_group.toLowerCase():"zero";
  if ( a < b ) return -1;
  if ( a > b ) return 1;
  return 0;
};

const filterBreeds = (data: any, filterText: string) => {
  if (filterText === "") return data;
  const keywords = filterText.split(/(\s+)/).filter((e) => e.trim().length > 0);
  const filtered = data.filter((item: any) => {
    const { name, bred_for, breed_group, temperament } = item.breeds[0];
    const attrs = `${name} ${bred_for} ${breed_group} ${temperament}`.toLowerCase();
    for (let i = 0; i < keywords.length; i++) {
      if (attrs.includes(keywords[i])) return true;
    }
    return false;
  });
  if(!filtered.length) return noResults;
  return filtered.sort(breedsCompare);
};

const formatData = (breeds: object[]) => {
  return breeds.map((item: any) => {
    const breeds = item.breeds[0];
    breeds.id = item.id;
    breeds.img = item.url;
    breeds.url = item.url;
    breeds.weight1 = breeds.weight.imperial;
    breeds.height1 = breeds.height.imperial;
    return item;
  });
};

export {
  shouldLoadMore,
  filterBreeds,
  formatData
};


