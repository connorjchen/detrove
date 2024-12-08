import { Box, Typography, Tabs, Tab } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

const options = {
  legend: {
    display: false,
  },
  hover: {
    intersect: false,
  },
  elements: {
    line: {
      tension: 0,
    },
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {},
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          display: false,
        },
      },
    ],
  },
};

export default function LineGraph({ sneakerId }) {
  const [data, setData] = useState({});
  const [tab, setTab] = React.useState(0);

  useEffect(() => {
    let data = [];
    let numDays;

    if (tab === 0) {
      numDays = 1;
    } else if (tab === 1) {
      numDays = 7;
    } else if (tab === 2) {
      numDays = 30;
    } else if (tab === 3) {
      numDays = 90;
    } else if (tab === 4) {
      numDays = 365;
    } else {
      numDays = 1000;
    }

    for (var i = 0; i <= numDays; i++) {
      let date = new Date();
      date.setDate(date.getDate() - numDays + i);
      let value = 0;
      data.push({ x: date, y: value });
    }

    setData(data);
  }, [tab]);

  return (
    <Box
      borderRadius="16px"
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Box>
        <Typography variant="h6" fontSize="14px">
          Graph feature coming soon!
        </Typography>
      </Box>
      <Box height="100%">
        {data?.length > 0 && (
          <Line
            data={{
              datasets: [
                {
                  backgroundColor: "white",
                  borderColor: "#5AC53B",
                  borderWidth: 2,
                  pointBorderColor: "rgba(0, 0, 0, 0)",
                  pointBackgroundColor: "rgba(0, 0, 0, 0)",
                  pointHoverBackgroundColor: "#5AC53B",
                  pointHoverBorderColor: "#000000",
                  pointHoverBorderWidth: 4,
                  pointHoverRadius: 6,
                  data: data,
                },
              ],
            }}
            options={options}
          />
        )}
      </Box>
      <Box>
        <Tabs
          textColor="inherit"
          value={tab}
          onChange={(_, tab) => setTab(tab)}
          TabIndicatorProps={{
            style: {
              backgroundColor: "black",
            },
          }}
        >
          <Tab label="1D" />
          <Tab label="1W" />
          <Tab label="1M" />
          <Tab label="3M" />
          <Tab label="1Y" />
          <Tab label="ALL" />
        </Tabs>
      </Box>
    </Box>
  );
}
