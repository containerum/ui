import React, { Component } from 'react';
import { Link } from 'react-router';
import setDeploymentId from '../../../../index';

export default class TR extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    }
  }
  getPage() {
    var start = this.props.pageSize * (this.state.currentPage - 1);
    var end = start + this.props.pageSize;
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
    var numPages = Math.floor(this.props.data.length / this.props.pageSize)
    if (this.props.data.length % this.props.pageSize > 0) {
      numPages++
    }
    return numPages
  }
  handlePageChange(pageNum) {
    this.setState({currentPage: pageNum})
  }

  render() {
    var page = this.getPage();
    var topics = page.data.map(function(item) {
    return (
      <tr>
        <td className='width_td'></td>
          <th scope='row' onClick={setDeploymentId}><Link data-id={item.uid} to='/ReplicaSets/replicasets_1'>{item.name}</Link></th>
          <td>{item.pods}</td>
          <td>{item.images}</td>
          <td>{item.created}</td>
          <td>app: {item.labels}</td>
          <td className='menu_dropdown'></td>
        </tr>
      );
    })
  return (
    <tbody>
      {pager(page)}
        {topics}
    </tbody>
    )
  }
}
function pager(page) {
  var pageLinks = []
  if (page.currentPage > 1) {
    pageLinks.push(<li className='previous' onClick={page.handleClick(page.currentPage - 1)}><a href='#'><span className='pageLink'>&larr;</span></a></li>)
    pageLinks.push(' ')
  }
  pageLinks.push(<span className='currentPage'>{page.currentPage} - {page.numPages}</span>)
  if (page.currentPage < page.numPages) {
    pageLinks.push(' ')
    pageLinks.push(<li className='next' onClick={page.handleClick(page.currentPage + 1)}><a href='#'><span className='pageLink'>&rarr;</span></a></li>)
  }
  return <div className='pager'>{pageLinks}</div>
}
