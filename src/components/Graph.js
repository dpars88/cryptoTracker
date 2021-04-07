import React from 'react';
import Table from 'react-bootstrap/Table';

const Graph = ({ coinData }) => {
        console.log(coinData)
        return (
            <div>
                {coinData.name}
                {coinData.currentPrice}
            </div>
                // <Table striped bordered hover>
                //     <thead>
                //         <tr>
                //             <th>Name</th>
                //             <th>Current Price</th>
                //             <th>24 Hour High</th>
                //             <th>24 Hour Low</th>
                //         </tr>
                //     </thead>
                //     <tbody>
                //         <tr>
                //             <td>{coinData.name}</td>
                //             <td>{coinData.currentPrice}</td>
                //             <td>{coinData.pastDayHigh}</td>
                //             <td>{coinData.pastDayLow}</td>
                //         </tr>
                //     </tbody>
                // </Table>
        )
    
}

export default Graph;