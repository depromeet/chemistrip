import React from 'react';
import {Container, Grid} from 'semantic-ui-react';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {Tab, Tabs, Divider, Chip, IconButton} from 'material-ui';

const mappingToSchedule = (datas) => {
    return datas.map( (data) => {
        return (
            <div>
                <Grid style={{padding: '24px'}} divided='vertically'>
                    <Grid.Row columns={2}>
                      <Grid.Column>
                        <b style={{fontSize: '18px',color: '#50e3c2'}}>{data.country}</b>
                      </Grid.Column>
                      <Grid.Column>
                        <p style={{fontSize: '18px'}}>{data.schedule}</p>
                      </Grid.Column>
                    </Grid.Row>
                 </Grid>
                <Divider />
            </div>
        );
    });
}

const chipStyle = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
};
const ProfileDetail = ({closeCallback, preferenceDatas, scheduleDatas, name, country, age, gender, matchingPercent}) => (
    <Container text>
        <div style={{backgroundColor: 'rgba(131, 131, 131, 0.2)'}}>
            <IconButton onClick={closeCallback}>
                <NavigationClose style={{margin: '15px'}}/>
            </IconButton>
        </div>
        <div style={{paddingTop: '185px', backgroundColor: 'rgba(131, 131, 131, 0.2)'}}>
            <div style={{padding: '24px', color: '#ffffff'}}>
                <h1>{name}</h1>
                <p>{country} {age}/{gender}</p>
            </div>
        </div>
        <Tabs>
            <Tab label="Preference" >
              <div style={{padding: '30px'}}>
                  <p style={{color:'#868e96'}}>{name} 님이 좋아하는 여행</p>
                  <div style={chipStyle.wrapper}>
                      {
                          preferenceDatas.likeTrip.map((data)=>{
                              return (
                                <Chip
                                    labelStyle={{color: '#ffffff'}}
                                    style={chipStyle.chip}
                                    backgroundColor='#2be3c7'>
                                    {data}
                                </Chip>
                              )
                          })
                      }
                  </div>
                  <p style={{color:'#868e96', marginTop: '37px'}}>{name} 님이 싫어하는 여행</p>
                  <div style={chipStyle.wrapper}>
                      {
                          preferenceDatas.dislikeTrip.map((data)=>{
                              return (
                                <Chip
                                    labelStyle={{color: '#ffffff'}}
                                    style={chipStyle.chip}
                                    backgroundColor='#2ab8f5'>
                                    {data}
                                </Chip>
                              )
                          })
                      }
                  </div>
              </div>
            </Tab>
            <Tab label="Schedule" >
              <div>
                <p>
                  {mappingToSchedule(scheduleDatas)}
                </p>
              </div>
            </Tab>
        </Tabs>
    </Container>
)

export default ProfileDetail;
