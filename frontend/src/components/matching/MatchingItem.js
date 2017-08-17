import React from 'react';
import {ListItem, Avatar, CircularProgress} from 'material-ui';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

const MatchingItem = ({profileSrc, gender, age, matchingPercent,maxDate, minDate, name}) => (
    <div>
        <ListItem
            rightAvatar={
                <div style={{textAlign: 'center'}}>
                    <div>{matchingPercent}%</div>
                    <CircularProgress
                        mode="determinate"
                        value={matchingPercent}
                        thickness={7}
                        style={{marginTop: '5px'}}
                    />
                </div>
            }
            leftAvatar={
                <Avatar src={profileSrc} />
            }
            primaryText={
                <p><b style={{fontSize: '30px'}}>{name}</b>&nbsp;&nbsp;<span style={{color: lightBlack}}>{age}/{gender}</span></p>
            }
            secondaryText={
                <p>
                    <span style={{color: darkBlack}}>
                        {minDate} - {maxDate}
                    </span>
                </p>
            }
            innerDivStyle = {
                {marginLeft: '20px'}
            }
        >
        </ListItem>
    </div>
)

export default MatchingItem;
