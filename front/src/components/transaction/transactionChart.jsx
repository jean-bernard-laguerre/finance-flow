import { Line } from 'react-chartjs-2';

function TransationChart(){
    // const chartRef = useRef(null);

    // useEffect(() => {
    //     const chartInstance = chartRef.current.chartInstance;

    //     return () => {
    //         chartInstance.destroy();
    //     };
    // }, []);
    let data = {
        datasets: [{
        label: 'First Dataset',
        data: [{
            x: 20,
            y: 30,
            r: 15
        }, {
            x: 40,
            y: 10,
            r: 10
        }],
        backgroundColor: 'rgb(255, 99, 132)'
    }]
};
// if(data!=null){
//     data.destroy()
// }
    // <div>
    //     <Line data={{
    //         labels: ["Argent","Silver","Gold"],
    //         datasets: [
    //             {
    //                 label:'',
    //                 data:[3,4,5,6]
    //             }
    //         ]
    //     }} />
    // </div>

    return (<div><Line data={data}/></div>)   
}

export default TransationChart