const breedsStyle = {
  width: '65%',
  minHeight: '800px',
  maxHeight: '1200px',
  overflow: "auto",
  margin: "auto",
};

const columns = [
  { name: "img", key: "url", width: 300 },
  { name: "Profile", key: "name" },
  { name: "", key: "temperament", width: 1 },
  { name: "", key: "life_span", width: 1 },
  { name: "", key: "bred_for", width: 1 },
  { name: "", key: "breed_group", width: 1 },
  { name: "", key: "weight1", width: 1 },
  { name: "", key: "height1", width: 1 },
];

const noResults = [{
  breeds: [
    {
      id: "BJT0Jx5Nm",
      url: "no-results",
      name: "Anatolian Shepherd Dog",
      bred_for: "Livestock herding",
      breed_group: "Working",
      life_span: "11 - 13 years",
      temperament: "Steady, Bold, Independent, Confident, Intelligent, Proud",
      weight1: "80 - 150",
      height1: "27 - 29",
    }
  ],
  id: "BJT0Jx5Nm",
  url: "https://cdn2.thedogapi.com/images/BJT0Jx5Nm_1280.jpg",
  width: 1216,
  height: 1131
}];

const PAGE_SIZE = 20;

export { columns, breedsStyle, PAGE_SIZE, noResults };
