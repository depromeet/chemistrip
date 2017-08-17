import React from 'react';
import MatchingItem from './MatchingItem';
import {List, Divider} from 'material-ui';

const mapToComponent = (datas) => {
    return datas.map( (data) => {
        return (
            <div>
                <MatchingItem
                        {...data}
                    />
                <Divider inset={true} />
            </div>
        );
    });
}
const MatchingItemList = ({datas}) => (
    <List>
        {mapToComponent(datas)}
    </List>
)

export default MatchingItemList;
