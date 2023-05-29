import React, {useState} from 'react';
import db from './config/firebase'; // Update the path if needed
import {collection, addDoc, query, getDocs, where} from 'firebase/firestore';
import './LoginPage.css';

const LoginPage = () => {
  const [name, setName] = useState('');
  const [grade1, setGrade1] = useState('');
  const [grade2, setGrade2] = useState('');
  const [grade3, setGrade3] = useState('');
  const [Response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // eslint-disable-next-line max-len
    if (grade1 < 0 || grade1 > 100 || grade2 < 0 || grade2 > 100 || grade3 < 0 || grade3 > 100) {
      setResponse('Grade should be between 0 to 100');
      return;
    } else if (isNaN(grade1) || isNaN(grade2) || isNaN(grade3)) {
      setResponse('Grade should be only numbers');
      return;
    } else {
      setResponse('');
    }
    try {
      const nameRegex = /^[A-Za-z\s]+$/;
      if (!nameRegex.test(name)) {
        // eslint-disable-next-line max-len
        setResponse('Invalid name. Name should only contain letters and spaces');
        return;
      }
      // Check if name already exists in the 'students' collection
      // eslint-disable-next-line max-len
      const nameExistsQuery = query(collection(db, 'students'), where('name', '==', name));
      const nameExistsSnapshot = await getDocs(nameExistsQuery);

      if (!nameExistsSnapshot.empty) {
        setResponse('Student name already exists');
        return;
      }
      // Add the student to the 'students' collection
      await addDoc(collection(db, 'students'), {
        name: name,
        grade1: grade1,
        grade2: grade2,
        grade3: grade3,
      });

      setResponse('Data added successfully!');
    } catch (error) {
      // eslint-disable-next-line no-undef
      console.error('Error adding document: ', error);
      setResponse('Error adding student data.');
    }
  };

  return (
    <div className="container">
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="fonts">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="fonts">Grade 1:</label>
          <input
            type="text"
            id="grade1"
            value={grade1}
            onChange={(event) => setGrade1(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="fonts">Grade 2:</label>
          <input
            type="text"
            id="grade2"
            value={grade2}
            onChange={(event) => setGrade2(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="fonts">Grade 3:</label>
          <input
            type="text"
            id="grade3"
            value={grade3}
            onChange={(event) => setGrade3(event.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
        <p className="fonts">{Response}</p>
      </form>
    </div>
  );
};

export default LoginPage;
