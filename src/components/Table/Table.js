import React, {Component} from "react";
import "./table.css";
import { Data } from "../../users.json";
import moment from "moment";
import et from "moment/locale/et";


moment.locale('et');

class Table extends Component {

    constructor(props) {
        super(props);

        this.month = moment();
        this.state =  {
            days: []
        };
    }

    componentWillMount(){
        this.setState({days: this.makeDays() })
    }

    makeDays = () => {
        const daysInMonth =  this.month.daysInMonth();
        let firstDay = this.month.startOf('month');

        let days = [];
        for(let i = 0; i < daysInMonth ; i++){
            days.push(moment(firstDay));
            firstDay.add(1, 'days');
        }
        return days;
    };

    nextMonth = () => {
        this.month.add("months");
        this.setState({ days: this.makeDays()});
    };

    prevMonth = () => {
      this.month.subtract("months");
       this.setState({ days: this.makeDays()});
    };

    render() {
        return(
            <div>
            <table>
                <tbody>
                <TableHeader fields={this.fields} days={this.state.days} next={this.nextMonth} prev={this.prevMonth} />
                {Data.map((user) =>  <TableRow fields={this.fields} days={this.state.days} {...user} key={user.UserId.toString()} hours={user.hours} />)}
                </tbody>
            </table>
            </div>
        )
    }
}

class TableHeader extends Component {
    render() {
        return (
            <tr>
                <th className={"table__cel table__cel--head table__cel--border-r"} >
                    <div className={"table__cel--controls"}>
                    <button className={"table__button"} onClick={this.props.prev }>&lt;</button>
                    {this.props.days[0].format("MMMM")}
                    <button className={"table__button"} onClick={this.props.next}>&gt;</button>
                    </div>
                </th>
                <td className={"table__cel table__cel--head "} >Töö-tunnid</td>
                <td className={"table__cel table__cel--head "} >Üle-tunnid</td>
                <td className={"table__cel table__cel--head  table__cel--border-r"} >Norm-tunnid</td>
                {this.props.days.map((day, index) =>  <th className={"table__cel--head" +isWeekend(day)} key={day.format("D")}>{day.format("D")}<span className={"table__day"}>{day.format("dd")}</span></th>)}
            </tr>
        )
    }
}

class TableRow extends Component {
    information(id, name, date){
       alert("userid: "+id+"\nname: "+name +"\ndate: "+ date.format("DD.MM.YYYY"))
    }

    render() {
        return(
            <tr>
                <td  className={"table__cel table__cel--user"}>
                    <label>
                        <input
                            defaultValue="Bob"
                            type="checkbox"
                            ref={(input) => this.input = input} />
                        {this.props.FirstName+" "+this.props.LastName}
                    </label>
                </td>
                <td className={"table__cel table__cel--info"} >{this.props.hours ? this.props.hours.worked : ""}</td>
                <td className={"table__cel table__cel--info"} >{this.props.hours ? this.props.hours.extra : ""}</td>
                <td className={"table__cel table__cel--info table__cel--border-r"} >{this.props.hours ? this.props.hours.normal : ""}</td>
                {this.props.days.map((day, index) => <td onClick={() => this.information(this.props.UserId, this.props.FirstName+" "+this.props.LastName, day)} className={"table__cel table__cel--day"+isWeekend( day )} key={index} /> )}
            </tr>
        )
    }
}

const isWeekend = (day) => {
    const nrOfDay = day.day();

    if( nrOfDay === 0 || nrOfDay === 6){
        return " table__cel--weekend";
    }else{
        return "";
    }
};

export default Table;