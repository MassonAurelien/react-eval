import { useState, useEffect } from "react";
import { Row } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import Sport from "./Sport";

const ListSports = ({data}) => {
  const [loading, setLoading] = useState(false);
  const [storeData, setStoreData] = useState([])
  
  useEffect(() => {
      if (data.sports && data.sports.length > 0) {
        setLoading(true);
        setStoreData(data.sports);
      } else {
        console.log("Error : No data found");
      }
  }, [data]);
  
  useEffect(() => {
      if (storeData && storeData.length > 0) setTimeout(() => setLoading(false), 1000);
  }, [storeData]);

  if (loading)
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 40,
      }}
    >
      <LoadingOutlined style={{ fontSize: 24 }} />
    </div>
  );
  return (
    <Row style={{ padding: 32 }} gutter={16}>
      {storeData.map((item) => (
        <Sport sport={item} key={item.idSport}/>
      ))}
    </Row>
  );

};

export default ListSports;