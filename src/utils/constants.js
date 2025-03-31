require('dotenv').config();

exports.table = {
    MAIN: {
        NAME: process.env.TABLE_MAIN,
        COLS: {
            DOCTOR_FIO_REF: process.env.MAIN_TABLE_COL_DOCTOR_NAME_REF,
            PATIENT_FIO_REF: process.env.MAIN_TABLE_COL_PATIENT_NAME_REF,
            PROCEDURE_NAME_REF: process.env.MAIN_TABLE_COL_PROCEDURE_NAME_REF,
            START_TIME: process.env.MAIN_TABLE_COL_START_TIME,
            END_TIME: process.env.MAIN_TABLE_COL_END_TIME,
        },
    },
    DOCTORS: {
        NAME: process.env.TABLE_DOCTORS,
        COLS: {
            REF_ID: process.env.DOCTORS_TABLE_COL_REF_ID,
            NAME: process.env.DOCTORS_TABLE_COL_NAME,
        },
    },
    PATIENTS: {
        NAME: process.env.TABLE_PATIENTS,
        COLS: {
            REF_ID: process.env.PATIENTS_TABLE_COL_REF_ID,
            NAME: process.env.PATIENTS_TABLE_COL_NAME,
        },
    },
    PROCEDURES: {
        NAME: process.env.TABLE_PROCEDURES,
        COLS: {
            REF_ID: process.env.PROCEDURES_TABLE_COL_REF_ID,
            NAME: process.env.PROCEDURES_TABLE_COL_NAME,
        },
    },
}