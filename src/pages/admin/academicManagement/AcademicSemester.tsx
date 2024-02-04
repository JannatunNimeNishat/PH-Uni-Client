import React from 'react';
import { useGetAllAcademicSemestersQuery } from '../../../redux/features/admin/academicManagement.api';


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