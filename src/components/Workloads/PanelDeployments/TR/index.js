import React, { Component } from 'react';
import { Link } from 'react-router';
import Button from './Button';
import setDeploymentId from '../../../../index';

export default class TR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            ramState: ''
        };
    }
    getPage() {
        let start = this.props.pageSize * (this.state.currentPage - 1);
        let end = start + this.props.pageSize;
        return {
            currentPage: this.state.currentPage,
            data: this.props.data.slice(start, end),
            numPages: this.getNumPages(),
            handleClick: function(pageNum) {
                return function() { this.handlePageChange(pageNum) }.bind(this)
            }.bind(this)
        }
    }
    getNumPages() {
        let numPages = Math.floor(this.props.data.length / this.props.pageSize);
        if (this.props.data.length % this.props.pageSize > 0) {
            numPages++
        }
        return numPages
    }
    handlePageChange(pageNum) {
        this.setState({currentPage: pageNum});
    }
    componentDidMount() {
        let that = this;
        this.props.data.map(function(item){
            if (item.ram < 500) {
                console.log(item.ram);
                that.setState({
                    ramState: 'GB'
                });
                let olddates = item.created;
                let olddates1 = olddates.toString();
                let d0 = new Date(olddates1);
                console.log(d0);
                let d1 = new Date();
                let dt = (d1.getTime() - d0.getTime()) / (1000*60*60*24);
                console.log(dt);
            } else {
                that.setState({
                    ramState: 'MB'
                });
            }
        })
    }
    render() {
        let that = this;
        let page = this.getPage();
        let topics = page.data.map(function(item, index) {
            return (
                <tr key={index}>
                    <td className='width_td'></td>
                    <th className='editDepTable' scope='row' onClick={setDeploymentId}>
                        <Link data-id={item.name} to={`/Deployments/${item.name}`}>{item.name}
                            <td className='ramGb'>{item.ram} {that.state.ramState}</td>
                        </Link>
                    </th>
                    <td className='editDepTable'>{item.pods_active} / {item.pods_limit}</td>
                    <td className='editDepTable'>{item.images.map(function(item, index){
                        return (
                            <div key={index}>
                                {item}
                            </div>
                        )
                    })}</td>
                    <td className='editDepTablelabel'>{item.created_at}</td>
                    <td>{item.labels.run}</td>
                    <td className='menu_dropdown'>
                        <Button data_id={item.id}></Button>
                    </td>
                </tr>
            );
        });
        return (
        <tbody>
            {pager(page)}
            {topics}
        </tbody>
        )
    }
}

function pager(page) {
    let pageLinks = [];
    if (page.currentPage > 1) {
        pageLinks.push(
            <li className='previous' onClick={page.handleClick(page.currentPage - 1)}>
                <a href='#'><span className='pageLink'>&larr;</span></a>
            </li>
        );
        pageLinks.push(' ');
    }
    pageLinks.push(<span className='currentPage'>{page.currentPage} - {page.numPages}</span>);
    if (page.currentPage < page.numPages) {
        pageLinks.push(' ');
        pageLinks.push(
            <li className='next' onClick={page.handleClick(page.currentPage + 1)}>
                <a href='#'><span className='pageLink'>&rarr;</span></a>
            </li>
        );
    }
    return <div className='pager'>{pageLinks}</div>
}
