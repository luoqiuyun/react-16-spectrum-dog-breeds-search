import React, { useEffect, useState } from "react";
import ImageLightbox from "../ImageLightbox";
import { Grid, View, SearchField, Flex, Provider, defaultTheme } from "@adobe/react-spectrum";
import {
  Cell,
  Column,
  Row,
  TableBody,
  TableHeader,
  TableView
} from "@react-spectrum/table";

import { filterBreeds } from "./helper/utils";
import { columns } from "./helper/config";

export enum Density {
  COMPACT = "compact",
  SPACIOUS = "spacious",
  REGULAR = "regular",
}

const BreedsList = ({ data }: ListProps) => {
  const [search, setSearch] = useState("");
  const [keywords, setKeywords] = useState("");
  const [idxBase, setIdxBase] = useState(0);
  const [filtered, setFiltered] = useState<object[]>([]);
  const [tableDensity, setTableDensity] = useState(Density.SPACIOUS);

  useEffect(() => {
    setTimeout(() => {
      setTableDensity(Density.SPACIOUS);
    }, 1000);
  });

  useEffect(() => {
    setFiltered(filterBreeds(data, search));
    setIdxBase(search === "" ? 0:data.length);
  }, [search, data]);

  const onChange = (value: string) => {
    setKeywords(value);
    const searchInput = value.trim().toLowerCase();
    if(searchInput.length > 0 && searchInput.length < 3) return;
    setTimeout(() => {
      setSearch(searchInput);
    }, 1000)
  };

  return (

<Provider theme={defaultTheme} height="100%">
  <View height="100%">
    <Grid
      areas={["header", "content"]}
      columns={["auto"]}
      rows={["size-1000", "auto"]}
    >
      <View gridArea="header">
        <Flex gap="size-100" alignItems="center" justifyContent="center">
          <SearchField
            marginStart={"size-200"}
            marginBottom={"size-200"}
            marginTop={"size-200"}
            width={"size-3600"}
            aria-label={"Search on page"}
            placeholder={"Search on page"}
            value={keywords}
            onChange={onChange}
          />
        </Flex>
      </View>
      <View gridArea="content">
        <TableView
          aria-label="List of images to apply filters to"
          width="100%"
          height="100%"
          overflowMode="wrap"
          density={tableDensity}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <Column
                width={column.width}
                allowsSorting={column.key === "filename"}
              >
                {column.name}
              </Column>
            )}
          </TableHeader>
          <TableBody loadingState="loading">
            {filtered.map((item: any, idx: number) => {
              const row = item.breeds[0];
              return (
                <Row key={`${row.id}-${idxBase + idx}`}>
                  {(key) => {
                    if (key === "url") {
                      return (
                        <Cell>
                          <ImageLightbox pic={row["url"]} />
                          <span className="piclabel">pic # {idx + 1}</span>
                        </Cell>
                      );
                    } else if (key === "name") {
                      return (
                        <Cell>
                          <div
                            style={{ margin: "20px 0 0 20px", height: "250px" }}
                          >
                            <p
                              style={{
                                color: "rgb(0, 128, 255, 0.8)",
                                fontSize: "18px",
                              }}
                            >
                              {row["name"]}
                            </p>
                            <strong>Height: </strong>
                            {row["height1"]}
                            <br />
                            <strong>Weight: </strong>
                            {row["weight1"]}
                            <br />
                            <strong>Life span: </strong>
                            {row["life_span"]}
                            <br />
                            <strong>Breed Group: </strong>
                            {row["breed_group"]}
                            <br />
                            <strong>Breed for: </strong>
                            {row["bred_for"]}
                            <br />
                            <strong>Temperament: </strong>
                            {row["temperament"]}
                            <br />
                          </div>
                        </Cell>
                      );
                    } else {
                      return <Cell>{''}</Cell>;
                    }
                  }}
                </Row>
              );
            })}
          </TableBody>
        </TableView>
      </View>
    </Grid>
  </View>
</Provider>

  );
};

export default BreedsList;

interface ListProps {
  data: any
}
