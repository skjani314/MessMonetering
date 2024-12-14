import React, { PureComponent } from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const BarGraph = props => {


const data=props.data.map((each)=>{

  const mon=["null","JAN","FEB","MAR","APR","MAY",'JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const {_id,count}=each;
  return {month:mon[_id.month],Complaints:count}

})


console.log(data)





    return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Complaints" fill="#82ca9d" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          </BarChart>
          </ResponsiveContainer>
      );
};



export default BarGraph;