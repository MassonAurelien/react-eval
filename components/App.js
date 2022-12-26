import React, {useEffect, useState } from "react";
import { Layout } from "antd";
import axios from "axios";
import ListSports from "./Sports/ListSports";

const App = () => {
    const [sports, setSports] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios('https://www.thesportsdb.com/api/v1/json/2/all_sports.php',);
            setSports(result.data);
        };
        fetchData();
        }, []);
    
    const { Content } = Layout;
    return(
        <Layout>
            <Content>
                <ListSports data={sports}/>
            </Content>
        </Layout>
    );
};

export default App;