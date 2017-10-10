import React, {Component} from "react";
import "./table.css";
import { Data } from "../../users.json";

const isWeekend = (day) => {
    if( day === "L" || day === "P"){
       return " table__cel--weekend";
    }else{
        return "";
    }
};

class Table extends Component {
    days = [
        {number: 1, name: "E"},
        {number: 2, name: "T"},
        {number: 3, name: "K"},
        {number: 4, name: "N"},
        {number: 5, name: "R"},
        {number: 6, name: "L"},
        {number: 7, name: "P"},
        {number: 8, name: "E"},
        {number: 9, name: "T"},
        {number: 10, name: "K"},
        {number: 11, name: "N"},
        {number: 12, name: "R"},
        {number: 13, name: "L"},
        {number: 14, name: "P"},
        {number: 15, name: "E"},
        {number: 16, name: "T"},
        {number: 17, name: "K"},
        {number: 18, name: "N"},
        {number: 19, name: "R"},
        {number: 20, name: "L"},
        {number: 21, name: "P"},
        {number: 22, name: "E"},
        {number: 23, name: "T"},
        {number: 24, name: "K"},
        {number: 25, name: "N"},
        {number: 26, name: "R"},
        {number: 27, name: "L"},
        {number: 28, name: "P"},
        {number: 29, name: "E"},
        {number: 30, name: "T"},
    ];
    render() {
        return(
            <table>
                <tbody>
                <TableHeader fields={this.fields} days={this.days} />
                {Data.map((user) =>  <TableRow fields={this.fields} days={this.days} name={user.FirstName+" "+user.LastName} key={user.UserId.toString()} hours={user.hours} />)}
                </tbody>
            </table>
        )
    }
}

class TableHeader extends Component {
    render() {
        return (
            <tr>
                <th className={"table__cel table__cel--head table__cel--border-r"} >&nbsp;</th>
                <td className={"table__cel table__cel--head "} >Töö-tunnid</td>
                <td className={"table__cel table__cel--head "} >Üle-tunnid</td>
                <td className={"table__cel table__cel--head  table__cel--border-r"} >Norm-tunnid</td>
                {this.props.days.map((day, index) => <th className={"table__cel--head" +isWeekend(day.name)} key={index}>{day.number}<span className={"table__day"}>{day.name}</span></th>)}
            </tr>
        )
    }
}

class TableRow extends Component {
    render() {
        return(
            <tr>
                <td  className={"table__cel table__cel--user"}>
                    <label>
                        <input
                            defaultValue="Bob"
                            type="checkbox"
                            ref={(input) => this.input = input} />
                        {this.props.name}
                    </label>
                </td>
                <td className={"table__cel table__cel--info"} >{this.props.hours ? this.props.hours.worked : ""}</td>
                <td className={"table__cel table__cel--info"} >{this.props.hours ? this.props.hours.extra : ""}</td>
                <td className={"table__cel table__cel--info table__cel--border-r"} >{this.props.hours ? this.props.hours.normal : ""}</td>
                {this.props.days.map((day, index) => <td className={"table__cel table__cel--day"+isWeekend(day.name)} key={index} /> )}
            </tr>
        )
    }
}

export default Table;