import React from 'react';
import MatchingItem from './MatchingItem';
import {List, Divider} from 'material-ui';

const MatchingItemList = ({itemClickCallback, datas}) => (
    <List>
        {
            datas.map( (data) => {
                return (
                    <div>
                        <MatchingItem
                                itemClickCallback={itemClickCallback}
                                {...data}
                            />
                        <Divider inset={true} />
                    </div>
                );
            })
        }
    </List>
)

export default MatchingItemList;
