import React, { useState, useEffect } from 'react'
import {Bar} from 'react-chartjs-2'
let flag = true
const DynamicChart = () => {
    const [chartData, setChartData]  = useState({});

    

 const Chart = () => {
   console.log("chart called")
    let values = []
      if(flag){
        values = [20, 10, 15];
        flag = false
      }
      else {
         values = [30, 10, 15];
        flag = true
      }
        console.log(values)
        console.log(flag)
     
            setChartData({
                labels: ["01", "02", "03"],
                datasets: [{
                                             label: 'level of thicceness',
                                             data: values,
                                             backgroundColor: [
                                                 'rgba(255, 99, 132, 0.2)',
                                                 'rgba(54, 162, 235, 0.2)',
                                                 'rgba(255, 206, 86, 0.2)'
                      
                                                
                                             ],
                                             borderColor: [
                                                 'rgba(255, 99, 132, 1)',
                                                 'rgba(54, 162, 235, 1)',
                                                 'rgba(255, 206, 86, 1)'
                                               
                                             ],
                                             borderWidth: 1
                                         }]
            });
        
   
        
    }
    useEffect(() => {
        Chart();
      }, []);
      return(
          <div className="App">
              <h1>Bar Chart</h1>
              <div>
                <button onClick = {()=>{Chart()}}> click</button>
                  <Bar
                  
                    data={chartData}
                    options={{
                        responsive:true,
                        title: { text: "THICCNESS SCALE", display: true },
                        scales:{
                            yAxes:{
                                ticks:{
                                    beginAtZero: true
                                }
                            }
                        }
                    }}
                  />
              </div>
          </div>
      )
}

export default DynamicChart;