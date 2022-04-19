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

const PAGE_SIZE = 20;

export { columns, breedsStyle, PAGE_SIZE };
