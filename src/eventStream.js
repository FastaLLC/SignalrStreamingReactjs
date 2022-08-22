import { HubConnectionBuilder } from "@microsoft/signalr";
import React, { useEffect, useState } from "react";
import "./App.css";

const EventStream = (props) => {
  const [connection, setConnection] = useState(undefined);
  const [data, setData] = useState([]);
  const [first, setFirst] = useState(true);
  const [latLng, setLatLng] = useState([7.329, 9.123]);
  const [center, setCenter] = useState({
    lat: latLng[0],
    lng: latLng[1],
  });

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl("https://localhost:6001/hubs/stream")
      .withAutomaticReconnect()
      .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then((result) => {
          console.log("Connected!");

          connection.stream("UserStream", 34).subscribe({
            next: (item) => {
              setData((prev) => [...prev, item]);
              console.log(item);
            },
            complete: () => {
              console.log("completed");
            },
            error: (err) => {
              console.log(`error ${err}`);
            },
          });
        })
        .catch((e) => console.log("Connection failed: ", e));
    }
  }, [connection, latLng]);

  return (
    <div className="App">
      <h1>Events</h1>
      {data
        .map((item, index) => {
          return (
            <div
              key={index}
              style={{
                border: "1px solid black",
                padding: "10px",
                margin: "auto",
                width: "400px",
                textAlign: "left",
              }}
            >
              <div>
                <li>
                  EventType : <strong>{item.event.label}</strong>
                </li>
              </div>
              <div>
                <li>
                  EventId : <strong>{item.event.value}</strong>
                </li>
              </div>
              <div>
                <li>
                  Message : <strong>{item.message}</strong>
                </li>
              </div>
              <div>
                <li>
                  data : <strong>{item.data}</strong>
                </li>
              </div>
            </div>
          );
        })
        .reverse()}

      {!data && <h1>No Event</h1>}
    </div>
  );
};

export default EventStream;
