import React, { useEffect, useState } from "react";
import ImageLightbox from "../ImageLightbox";
import { Grid, View } from "@adobe/react-spectrum";
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
import SearchView from "./SearchView";

export enum Density {
  COMPACT = "compact",
  SPACIOUS = "spacious",
  REGULAR = "regular",
}

const BreedsList = ({ data }: ListProps) => {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("idle");
  const [idxBase, setIdxBase] = useState(0);
  const [filtered, setFiltered] = useState<object[]>([]);
  const [tableDensity, setTableDensity] = useState(Density.COMPACT);

  useEffect(() => {
    setTimeout(() => {
      setTableDensity(Density.SPACIOUS);
    }, 1000);
  });

  useEffect(() => {
    setLoading("loading");
    setFiltered(filterBreeds(data, search));
    setIdxBase(search === "" ? 0:data.length);
    setTimeout(() => {
      setLoading("idle");
    }, 5000);
  }, [search, data]);

  return (
    <Grid
      areas={["header", "content"]}
      columns={["auto"]}
      rows={["size-1000", "auto"]}
    >
      <SearchView setSearch={setSearch} />
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
          <TableBody>
            {filtered.map((item: any, idx: number) => {
              const row = item.breeds[0];
              return (
                <Row key={`${row.id}-${idxBase + idx}`}>
                  {(key) => {
                    if (key === "url") {
                      return (
                        <Cell>
                          <ImageLightbox pic={row["url"]} />
                          <span className="piclabel">pic # {idx++}</span>
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
  );
};

export default BreedsList;

interface ListProps {
  data: any
}
