import React, { useState } from 'react'
import * as XLSX from 'xlsx';
// import XLSXStyle from 'xlsx-style';
import { saveAs } from 'file-saver';
import { useForm } from 'react-hook-form';
import { db } from '../utils/firebase'; // Ajusta la ruta según sea necesario

export const Login = () => {
    
    const { register, handleSubmit, reset } = useForm();
    
    const generarExcel = (datosColeccion) => {

        console.log(datosColeccion)
        datosColeccion = datosColeccion.map( item => { 
            return { Nombre: item.name, SegundoNombre: item.secondName, Apellido: item.lastName, SegundoApellido: item.secondLastName, Correo : item.email, Telefono : item.number, Mensaje : item.mensaje }; 
        });

        const ws = XLSX.utils.json_to_sheet(datosColeccion);
        const wb = XLSX.utils.book_new();
        
        ws['!cols'] = [{ wch: 25 }, { wch: 15 }, { wch: 25 }, { wch: 15 }, { wch: 25 }, { wch: 50 }];
        ws['!rows'] = [{ hpx: 25 }];

        XLSX.utils.book_append_sheet(wb, ws, 'Hoja1');

        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

        saveAs(blob, 'DatosRegistrados.xlsx');
    }

    const onSubmit = async (datosForm) => {
        try {
            // Almacena en la base de datos de Firebase
            const datosLogin = await db.collection('login')
            .where('email', '==', datosForm.email)
            .where('password', '==', datosForm.password)
            .get()
            let dataArray = [];


            datosLogin.forEach((doc) => {
                dataArray.push({
                    ...doc.data()
                })
            })

            if (dataArray.length == 1){
                const datosColeccion = await db.collection('users').get()
                dataArray = []

                datosColeccion.forEach((doc) => {
                    dataArray.push({
                        ...doc.data()
                    })
                })

                generarExcel(dataArray)
            }

            // Limpiar el formulario después del éxito
            reset();
            setError(null);
        } catch (error) {
            console.error('Error:', error.message);
            setError(error.message);
        }
    };


  return (
    <div className='login' data-aos="zoom-in-right" data-aos-duration="1000">
        <h1>Daniel Lombana - Candidato Independiente 2024 <img src={'/banderaDePanama.jpg'} alt="" style={{'width': '30px'}}/></h1><br />
        <h2>Log In</h2>
        <form method='POST' onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="email">
                Correo:<br />
                <input type='email' id='email' {...register('email')} placeholder='suemail@gmail.com'/> 
            </label>
            <label htmlFor="password">
                Contraseña:<br />
                <input type='password' id='password' {...register('password')} placeholder='*************'/>
            </label>
            <input type="submit" value="Iniciar Sesión" />
        </form>
    </div>
  )
}