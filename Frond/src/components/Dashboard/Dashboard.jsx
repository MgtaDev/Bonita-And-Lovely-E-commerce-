import React from "react";
import Graficos from '../Graficos/Graficos'
import style from '../Dashboard/Dashboard.module.css'


const Dashboard = () => {
  const data1 = [
    ['Venta de producto', 'Cantidad'],
    ['Labial',  40],
    ['Pinta Uñas',  10],
    ['Rimel',  10],
    ['Base',  20]
  ];
  const options1 = {
    title: "Ventas del día",
    is3D: true,
    legend: { position: 'left' }
  };

  const data2 = [
    ['Mes', 'Julio','Agosto', 'Septiembre'],
    ['Labial',  400, 1000,      400],
    ['Pinta Uñas',  200, 1170,      460],
    ['Rimel',  400, 660,       1120],
    ['Base',  400, 1030,      540]
  ];
  const options2 = {
    title: "Ventas del mes",
    curveType: 'function',
    legend: { position: 'rigth' }
  };


    return (
    <div className={style.dashboard}>
      <section>
        <div>DASHBOARD
          <h3>Prueba</h3>
        </div>
        <div>ANALYTICS
          <h3>Estadísticas</h3>
        </div>
        <div>SUPPORT
          <h3>Tickets</h3>
          <h3>Proveedores</h3>
          <h3>Clientes</h3>
        </div>
        <div>SHOP
          <h3>Productos</h3>
          <h3>Ordenes</h3>
          <h3>Reportes</h3>
        </div>
      </section>
      <div className={style.graficos}>
        <Graficos
        type="PieChart"
        options = {options1}
        data = {data1}/>
        <Graficos
        type="LineChart"
        options = {options2}
        data = {data2}/>
      </div>
    </div>
  );
};

export default Dashboard;