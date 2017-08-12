import React, {Component} from 'react';

import {LocationPage} from '../detail';
import CenteredComponent from '../../common/CenteredComponent';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import DatePicker from 'rc-calendar/lib/Picker';

import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import koKR from 'rc-calendar/lib/locale/ko_KR';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY-MM-DD';

const fullFormat = 'YYYY-MM-DD dddd';
const cn = true;

const now = moment();
if (cn) {
    now.locale('zh-cn').utcOffset(8);
} else {
    now.locale('en-gb').utcOffset(0);
}

class Picker extends Component{
    state = {
        hoverValue: [],
    }
    onHoverChange = (hoverValue) => {
        console.log(hoverValue);
        this.setState({ hoverValue });
    }
    render() {
        const props = this.props;
        const { showValue } = props;
        const calendar = (
            <RangeCalendar
                hoverValue={this.state.hoverValue}
                onHoverChange={this.onHoverChange}
                type={this.props.type}
                locale={koKR}
                defaultValue={now}
                format={format}
                onChange={props.onChange}
                disabledDate={props.disabledDate}
                />);
        return (
            <DatePicker
                open={this.props.open}
                onOpenChange={this.props.onOpenChange}
                calendar={calendar}
                value={props.value}
                >
                {
                    () => {
                        return (
                            <span>
                                <input
                                    placeholder="날짜를 선택해주세요"
                                    style={{ width: 250 }}
                                    readOnly
                                    value={showValue && showValue.format(fullFormat) || ''}
                                    />
                            </span>
                        );
                    }
                }
            </DatePicker>
        );
    }
}

class DateSelectionPage extends Component{
    state = {
        startValue: null,
        endValue: null,
        startOpen: false,
        endOpen: false,
    }

    onStartOpenChange = (startOpen) => this.setState({ startOpen });

    onEndOpenChange = (endOpen) => this.setState({ endOpen });

    onStartChange = (value) => {
        this.setState({
            startValue: value[0],
            startOpen: false,
            endOpen: true,
        });
    }

    onEndChange = (value) => this.setState({ endValue: value[1] });

    disabledStartDate = (endValue) => {
        if (!endValue) {
            return false;
        }
        const startValue = this.state.startValue;
        if (!startValue) {
            return false;
        }
        return endValue.diff(startValue, 'days') < 0;
    }

    render() {
        const state = this.state;
        return (
            <CenteredComponent>
                <div>
                    <div>
                        <h2>날짜 선택</h2>
                        <p>
                            출발일:
                            <Picker
                                onOpenChange={this.onStartOpenChange}
                                type="start"
                                showValue={state.startValue}
                                open={this.state.startOpen}
                                value={[state.startValue, state.endValue]}
                                onChange={this.onStartChange}
                                />
                        </p>

                        <p>
                            도착일:
                            <Picker
                                onOpenChange={this.onEndOpenChange}
                                open={this.state.endOpen}
                                type="end"
                                showValue={state.endValue}
                                disabledDate={this.disabledStartDate}
                                value={[state.startValue, state.endValue]}
                                onChange={this.onEndChange}
                                />
                        </p>
                    </div>
                </div>
            </CenteredComponent>
        );
    }
}

export default DateSelectionPage;
