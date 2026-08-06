"use client";

import Grid from "@mui/material/Grid";

import NgoCard from "./NgoCard";

import type {
  INgo,
} from "@/src/types/ngo.types";

interface Props {
  ngos: INgo[];
}

export default function NgoGrid({
  ngos,
}: Props) {

  return (
    <Grid
      container
      spacing={3}
    >
      {ngos.map((ngo) => (

        <Grid
          key={ngo._id}
          size={{
            xs: 12,
            sm: 6,
            md: 4,
            lg: 3,
          }}
        >
          <NgoCard
            ngo={ngo}
          />
        </Grid>

      ))}
    </Grid>
  );
}