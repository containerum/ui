import React, { Component } from 'react';
import { Link } from 'react-router';
import Button from './Button';
import setDeploymentId from '../../../index';

export default class TR extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1
        };
    }
    getPage() {
        let start = this.props.pageSize * (this.state.currentPage - 1);
        let end = start + this.props.pageSize;
        return {
            currentPage: this.state.currentPage,
            data: this.props.data.services.slice(start, end),
            numPages: this.getNumPages(),
            handleClick: function(pageNum) {
                return function() { this.handlePageChange(pageNum) }.bind(this)
            }.bind(this)
        }
    }
    getNumPages() {
        let numPages = Math.floor(this.props.data.services.length / this.props.pageSize);
        if (this.props.data.services.length % this.props.pageSize > 0) {
            numPages++
        }
        return numPages
    }
    handlePageChange(pageNum) {
        this.setState({currentPage: pageNum});
    }
    render() {
        let page = this.getPage();
        let topics = page.data.map(function(item, index) {
            return (
                <tr key={index}>
                    <td className='width_td'></td>
                    <th scope='row' onClick={setDeploymentId}>
                        <Link data-id={item.name} to={`/Services/${item.name}`}>
                            {item.name}
                        </Link>
                    </th>
                    <td></td>
                    <td></td>
                    <td>{item.created}</td>
                    <td>{item.labels.map(function(item, index){
                        return (
                            <div key={index}>
                                app: {item}
                            </div>
                        )
                    })}</td>
                    <td className='menu_dropdown'>
                        <Button data_id={item.id}/>
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
            </li>);
    }
    return <div className='pager'>{pageLinks}</div>
}
