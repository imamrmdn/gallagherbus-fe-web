"use client";

import React, { useEffect, useState } from "react";
import { Collapse, Panel } from "antd";

//
const Home = () => {
  const [datas, setDatas] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/proxy/jadwal");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();
        setDatas(result.data);
      } catch (fetchError) {
        console.error("Fetch error:", fetchError.message);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!datas) {
    return <div>Loading...</div>;
  }

  const onChange = (key) => {
    console.log(key);
  };

  //
  const items = datas.map((item) => ({
    key: item.id,
    label: `Koridor: ${item.koridor_name}`,
    children: (
      <>
        <Collapse
          defaultActiveKey={item.id}
          items={item.halte.map((e) => ({
            key: e.id,
            label: `Halte Name: ${e.halte_name} - Arrival time in halte ${e.arrival_time_in_halte} | Derparture time in halte ${e.departure_time_in_halte}`,
            children: (
              <>
                <Collapse
                  style={{ backgroundColor: "aqua" }}
                  defaultActiveKey={e.koridor_id}
                  items={e.halte_schedule.map((f) => ({
                    key: f.id,
                    label: `Bus Name: ${f.bus_name}`,
                    children: (
                      <p>
                        Arrival Time Bus: {f.arrival_time_bus} | Departure Time
                        Bus: {f.departure_time_bus}{" "}
                      </p>
                    ),
                  }))}
                />
              </>
            ),
          }))}
        />
      </>
    ),
  }));

  return (
    <div
      style={{
        backgroundColor: "whitesmoke",
        margin: "50px",
        borderRadius: "10px",
      }}
    >
      <Collapse
        onChange={onChange}
        items={items}
        style={{ backgroundColor: "grey" }}
      />
    </div>
  );
};

export default Home;
