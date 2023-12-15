'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const API_BASE_URL = 'http://127.0.0.1:8082/api/alumnos';

const AlumnosPage = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [selectedAlumno, setSelectedAlumno] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newAlumno, setNewAlumno] = useState({
    nombre: '',
    edad: '',
    // Agrega más propiedades según tus alumnos
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setAlumnos(response.data.alumnos);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      fetchData();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleEdit = (alumno) => {
    setSelectedAlumno(alumno);
    setModalIsOpen(true);
  };

  const handleSave = async () => {
    try {
      if (selectedAlumno.id) {
        await axios.put(`${API_BASE_URL}/${selectedAlumno.id}`, selectedAlumno);
      } else {
        await axios.post(API_BASE_URL, newAlumno);
      }
      setModalIsOpen(false);
      fetchData();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const columns = [
    { name: 'ID', selector: 'id', sortable: true },
    { name: 'Nombre', selector: 'nombre', sortable: true },
    { name: 'Edad', selector: 'apellido_p', sortable: true },
    { name: 'Edad', selector: 'apellido_m', sortable: true },
    {
      name: 'Acciones',
      cell: (row) => (
        <>
          <button onClick={() => handleEdit(row)}>Editar</button>
          <button onClick={() => handleDelete(row.id)}>Eliminar</button>
        </>
      ),
    },
    // Agrega más columnas según las propiedades de tus alumnos
  ];

  return (
    <div>
      <h1>Lista de Alumnos</h1>
      <DataTable columns={columns} data={alumnos} pagination />

      {/* Aquí puedes agregar tu modal para editar/agregar alumnos */}
      {/* ... */}

      <button onClick={() => setModalIsOpen(true)}>Agregar Alumno</button>
    </div>
  );
};

export default AlumnosPage;

