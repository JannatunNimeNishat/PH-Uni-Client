import React from 'react';
import { useGetAllAcademicSemestersQuery } from '../../../redux/features/academicSmester/academicSemesterApi';

const AcademicSemester = () => {
    const {data} = useGetAllAcademicSemestersQuery(undefined);
    console.log(data);
    return (
        <div>
            <h1>This is AcademicSemester</h1>
        </div>
    );
};

export default AcademicSemester;