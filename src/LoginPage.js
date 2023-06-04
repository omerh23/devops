import React, {useState} from 'react';
import db from './config/firebase'; // Update the path if needed
import {collection, addDoc, query, getDocs, where} from 'firebase/firestore';
import './LoginPage.css';

const LoginPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [grade1, setGrade1] = useState('');
  const [grade2, setGrade2] = useState('');
  const [grade3, setGrade3] = useState('');
  const [Response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const grade1Num = parseFloat(grade1);
    const grade2Num = parseFloat(grade2);
    const grade3Num = parseFloat(grade3);
    const fullName = `${firstName} ${lastName}`;
    const nameRegex = /^[A-Za-z\s]+$/;
    const upperNameRegex = /^[A-Z][a-z]*$/;
    try {
      // eslint-disable-next-line max-len
      if (grade1 < 0 || grade1 > 100 || grade2 < 0 || grade2 > 100 || grade3 < 0 || grade3 > 100) {
        setResponse('Grade should be between 0 to 100');
        return;
      } else if (isNaN(grade1) || isNaN(grade2) || isNaN(grade3)) {
        setResponse('Grade should be only numbers');
        return;
        // eslint-disable-next-line max-len
      } else if (!Number.isInteger(grade1Num) || !Number.isInteger(grade2Num) || !Number.isInteger(grade3Num)) {
        setResponse('Grade should be integers');
        return;
        // eslint-disable-next-line max-len
      } else if (!nameRegex.test(firstName) || !upperNameRegex.test(firstName) ) {
        // eslint-disable-next-line max-len
        setResponse('Invalid first name. first Name should only contain letters and spaces');
        return;
      } else if (!nameRegex.test(lastName) ||!upperNameRegex.test(lastName) ) {
      // eslint-disable-next-line max-len
        setResponse('Invalid last name. last Name should only contain letters and spaces');
        return;
      } else {
        setResponse('');
      }

      setResponse('Please wait...');
      // Check if lastName already exists in the 'students' collection
      // eslint-disable-next-line max-len
      const nameExistsQuery = query(collection(db, 'students'), where('name', '==', fullName));
      const nameExistsSnapshot = await getDocs(nameExistsQuery);

      if (!nameExistsSnapshot.empty) {
        setResponse('Student Name already exists');
        return;
      }
      // Add the student to the 'students' collection

      await addDoc(collection(db, 'students'), {
        name: fullName,
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
          <label className="fonts" htmlFor="firstname">First name:</label>
          <input
            type="text"
            id="firstname"
            value={firstName}
            onChange={(event) => setFirstName(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="fonts" htmlFor="Last name">Last name:</label>
          <input
            type="text"
            id="name"
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="fonts" htmlFor="grade1">Grade 1:</label>
          <input
            type="text"
            id="grade1"
            value={grade1}
            onChange={(event) => setGrade1(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="fonts" htmlFor="grade2">Grade 2:</label>
          <input
            type="text"
            id="grade2"
            value={grade2}
            onChange={(event) => setGrade2(event.target.value)}
            required
          />
        </div>
        <div>
          <label className="fonts" htmlFor="grade3">Grade 3:</label>
          <input
            type="text"
            id="grade3"
            value={grade3}
            onChange={(event) => setGrade3(event.target.value)}
            required
          />
        </div>
        <button type="submit" data-testid="submit-button">Submit</button>
        <p className="fonts res" data-testid="response-message">{Response}</p>
      </form>
    </div>
  );
};

export default LoginPage;
