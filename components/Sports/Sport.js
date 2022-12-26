import {Col, Card, Badge, Avatar} from "antd";

const Sport = ({sport}) => {
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
                cover={<img src={sport.strSportThumb} alt={sport.strSport}/>}>
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