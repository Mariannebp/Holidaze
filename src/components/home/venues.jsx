import React, { useEffect, useState } from "react";
import { venuesUrl } from "../../components/constants";
import useApi from "../../components/hooks/useApi.jsx";
import { Typography, Box, Container, Link } from "@mui/material";
import * as g from "../../styles/global";
import { Circle, Wifi, DirectionsCar, FreeBreakfast, Pets } from "@mui/icons-material";
import Placeholder from "../../assets/images/placeholder.png";
import SearchBar from "./searchbar";

/**
 * Creates the content for the list of venues to the home page
 */
function Venues() {
  const url = venuesUrl + "?sort=created";
  const { data, isLoading, isError } = useApi(url);
  const [searchInput, setSearchInput] = useState("");
  console.log(data)
  useEffect(() => {
    document.title = "Holidaze | Home";
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Oops, something went wrong here..</div>;
  }

  return (
    <Container disableGutters  >
      <SearchBar searchInput={searchInput} onSearchInput={setSearchInput} data={data} />

      {data
        .filter((d) => {
          return searchInput.toLowerCase() === d.name.toLowerCase ? d : d.name.toLowerCase().includes(searchInput.toLowerCase());
        })
        .map((d) => (
          <Link href={`/pages/venue-specific/${d.id}`} key={d.id} underline='none'>
            <g.CardCorner >
              {d.media.length ? <g.CardMediaMain component="img" image={d.media[0]} alt={d.name} /> : <g.CardMediaPlaceholder component="img" image={Placeholder} alt={d.name} />}

              <g.BoxCardContent>
                <g.CardContentCont>
                  <Typography gutterBottom variant="h2" sx={{ borderBottom: '1px solid' }}>
                    {d.name}
                  </Typography>
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {d.location.city === "Unknown" || d.location.city === "" || d.location.country === "Unknown" || d.location.country === "" ? <Typography variant="body2">Mystery Location</Typography> : <Typography variant="body2">{d.location.city}, {d.location.country}</Typography>}
                      <Circle sx={{ width: '8px', margin: '7px' }} />
                      <Typography variant="body2">Max guests: {d.maxGuests}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {d.meta.wifi ? <Wifi sx={{ height: '20px', marginRight: '5px' }} /> : null}
                      {d.meta.parking ? <DirectionsCar sx={{ height: '20px', marginRight: '5px' }} /> : null}
                      {d.meta.breakfast ? <FreeBreakfast sx={{ height: '20px', marginRight: '5px' }} /> : null}
                      {d.meta.pets ? <Pets sx={{ height: '20px', marginRight: '5px' }} /> : null}
                    </Box>
                  </Box>

                  <Box sx={{ textAlign: "end" }}>
                    <Typography variant="h3">$ {d.price},-</Typography>
                    <Typography variant="body2">per night</Typography>
                    <g.ButtonMain variant="contained">VIEW</g.ButtonMain>
                  </Box>

                </g.CardContentCont>

              </g.BoxCardContent>
            </g.CardCorner>
          </Link>

        ))}

    </Container>
  )
}

export default Venues;