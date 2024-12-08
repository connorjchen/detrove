import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Typography, useTheme, Grid, Box } from "@mui/material";
import { displayErrors } from "../utils/utils.js";
import { RequestsEnum } from "../redux/helpers/requestsEnum";
import { getLoadingAndErrors } from "../redux/helpers/requestsSelectors";
import { useSnackbar } from "notistack";
import { getWaitlist } from "../redux/actions/adminActions";
import Loading from "../components/loading";

function Waitlist() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { waitlist } = useSelector((state) => state.waitlist);

  const { isLoading, errors } = useSelector((state) =>
    getLoadingAndErrors(state, [RequestsEnum.adminGetWaitlist])
  );

  useEffect(() => {
    dispatch(getWaitlist());
  }, [dispatch]);

  useEffect(() => {
    displayErrors(errors, enqueueSnackbar);
  }, [errors, enqueueSnackbar]);

  if (isLoading) return <Loading />;
  return (
    <Box>
      <Grid container rowSpacing={1} textAlign="center">
        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.accent.dark,
              fontSize: "28px",
              textDecoration: "underline",
            }}
          >
            Email
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.accent.dark,
              fontSize: "28px",
              textDecoration: "underline",
            }}
          >
            Branch
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.accent.dark,
              fontSize: "28px",
              textDecoration: "underline",
            }}
          >
            Timestamp
          </Typography>
        </Grid>
        {waitlist.map((user) => {
          const date = new Date(user.submitted_at);
          return (
            <>
              <Grid item xs={4}>
                {user.email}
              </Grid>
              <Grid item xs={4}>
                {user.branch}
              </Grid>
              <Grid item xs={4}>
                {date.toUTCString()}
              </Grid>
            </>
          );
        })}
      </Grid>
    </Box>
  );
}

export default Waitlist;
