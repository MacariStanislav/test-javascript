import { useEffect, useState } from "react";
import api from "../utils/axisClient";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  // const [users, setUsers] = useState([]);
  
  const handleCreateStudent = async () => {
    try {
      const response = await api.post("/users", { name, phone });
      console.log("Ответ от сервера:", response.data);

      // Добавляем нового студента в список(типа так бы выглядил список если можно было менять данные на том апи)
      setStudents((prevStudents) => [...prevStudents, response.data]);

      setName("");
      setPhone("");
    } catch (error) {
      console.error("Ошибка при создании студента:", error);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
     
      try {
          // // Отправляем запросы для пользователей с ID 1 и 2
          // const [user1, user2] = await Promise.all([
          //   axios.get('/user?ID=1'),
          //   axios.get('/user?ID=2')
          // ]);
  
          // // Устанавливаем данные пользователей в состояние
          // setUsers([user1.data, user2.data]);
        const response = await api.get("/users"/*, { params: { id:1 } }*/);
        setStudents(response.data);
      } catch (error) {
        console.error("Ошибка загрузки студентов:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      <h1>Список студентов</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            Имя: {student.name} <br />
            <span>Номер Студента: {student.phone}</span>
          </li>
        ))}
      </ul>

      <form>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          value={name}
          placeholder="name..."
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          type="text"
          value={phone}
          placeholder="phone..."
          onChange={(e) => setPhone(e.target.value)}
        />

        <button type="button" onClick={handleCreateStudent}>
          Push
        </button>
      </form>
    </div>
  );
}

//поиск пользователя по имени поиск его ид

// import React, { useState } from 'react';
// import api from '../utils/axisClient'

// const UserSearch = () => {
//   const [name, setName] = useState('');
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   
//   const handleInputChange = async (e) => {
//     const inputName = e.target.value;
//     setName(inputName); 

//     if (inputName.trim() === '') {
//       setUser(null); 
//       return;
//     }

//     setLoading(true); 
//     setError(null); 

//     try {
//      
//       const response = await api.get('/users', {
//         params: { name: inputName },
//       });

//       // Проверяем, найден ли пользователь
//       const foundUser = response.data.find((user) => user.name.toLowerCase() === inputName.toLowerCase());

//       if (foundUser) {
//         setUser(foundUser); 
//       } else {
//         setUser(null);
//       }
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={name}
//         onChange={handleInputChange}
//         placeholder="Введите имя пользователя"
//       />
//       {loading && <div>Загрузка...</div>}
//       {error && <div style={{ color: 'red' }}>Ошибка: {error}</div>}
//       {user && (
//         <div>
//           <h3>Найден пользователь:</h3>
//           <p>ID: {user.id}</p>
//           <p>Имя: {user.name}</p>
//         </div>
//       )}
//       {!user && name.trim() !== '' && !loading && !error && (
//         <div>Пользователь не найден.</div>
//       )}
//     </div>
//   );
// };

// export default UserSearch;
