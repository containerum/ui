import React, { Component } from 'react';

export default class CliToken extends Component {
    render() {
        return (
            <div className="card mt-3">
                <div className="card-block c-table-card-block">
                    <table className="table i-table-card">
                        <tbody>
                        <tr>
                            <td className="first-td-width">
                                <h2 id="cli">
                                    <a name="cli" className="anchor" href="#cli">CLI</a>
                                </h2>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Download CLI Tool
                            </td>
                            <td>
                                Set token
                            </td>
                            <td>
                                Use ful opportunities with CLI Help
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a target="_blank" className="i-cli-tool" href="http://p13000.x1.containerum.io/download/packages/">
                                    <button className='btn btn-block c-btn-green'>
                                        Download CLI
                                    </button>
                                </a>
                            </td>
                            <td>
                                TOKEN
                            </td>
                            <td>
                                <a target="_blank" className="i-cli-tool" href="http://containerum.io/documentation/start-guide">
                                    <button className='btn btn-block c-btn-green'>
                                        CLI Help
                                    </button>
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}
