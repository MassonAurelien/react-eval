import {Col, Card, Badge, Avatar, Button, message} from "antd";
import { useEffect, useState } from "react";
import { StarFilled, StarOutlined } from "@ant-design/icons";
import {
  setDoc,
  doc,
  getFirestore,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { firebaseConfig } from "../../config/firebase";
import { initializeApp } from "firebase/app";

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

const Sport = ({sport, userId}) => {
    const [isFavorite, setIsFavorite] = useState(sport.favorite);

    useEffect(() => {
        const updateSport = async () => {
        console.log(sport.idSport, userId);
        // update Nested Favorites Array in Firestore
        if (isFavorite)
            await setDoc(
            doc(db, "users", userId),
            {
                favoritesSports: arrayUnion(String(sport.idSport)),
            },
            { merge: true }
            );
        else
            await setDoc(
            doc(db, "users", userId),
            {
                favoritesSports: arrayRemove(String(sport.idSport)),
            },
            { merge: true }
            );
        };
        if (sport.favorite !== isFavorite) { 
        if (userId) updateSport();
        else message.warning("Vous devez être connecté pour ajouter un favori");
        }
    }, [isFavorite, userId]);

    let desc;
    if(sport.strSportDescription.length > 72){
        desc = sport.strSportDescription.slice(0, 72) + "...";
    }
    else{
        desc = sport.strSportDescription;
    }

    return(
        <Col xs={24} sm={12} md={8} lg={6} style={{ marginBottom: 16 }}>
            <Badge.Ribbon
                text={<span style={{ fontSize: 11 }}>{sport.strFormat}</span>}
                color="#008A4E"
                style={{color : "#ffffff", fontWeight : "bold"}}
              >
                <Card
                cover={<img src={sport.strSportThumb} alt={sport.strSport}/>}
                actions={[
                    "",
                    "",
                    <Button type="link" onClick={() => setIsFavorite((prev) => !prev)}>
                        {isFavorite ? (
                        <StarFilled key="like" />
                        ) : (
                        <StarOutlined key="like" />
                        )}
                    </Button>,
                    ]}>
                <Card.Meta 
                avatar={<Avatar src={sport.strSportIconGreen}/>}
                title={sport.strSport}
                description={
                    <div dangerouslySetInnerHTML={{
                            __html:desc,
                        }}
                    />
                }
                />
                </Card>
            </Badge.Ribbon>
        </Col>
    )
};

export default Sport;