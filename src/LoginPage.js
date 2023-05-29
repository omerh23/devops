import React, {useState} from 'react';
// eslint-disable-next-line max-len
import {utils as XLSXUtils, readFile as readXLSXFile, writeFile as writeXLSXFile} from 'xlsx';
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
    const existingWorkbook = await readXLSXFile('students_data.xlsx');
    const sheetName = existingWorkbook.SheetNames[0];
    const sheet = existingWorkbook.Sheets[sheetName];

    // eslint-disable-next-line max-len
    XLSXUtils.sheet_add_json(sheet, [{'Name': name, 'Grade 1': grade1, 'Grade 2': grade2, 'Grade 3': grade3}], {skipHeader: true});

    await writeXLSXFile(existingWorkbook, 'students_data.xlsx');

    setResponse('Data added successfully!');
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
