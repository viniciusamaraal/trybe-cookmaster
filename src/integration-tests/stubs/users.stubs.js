var mongoose = require('mongoose');

const { ROLES } = require('../../api/config/constants/settings');

const getNormalUser = () => {
    return {
        _id: mongoose.Types.ObjectId('6166e1ad7fdce13176f4c13a'),
        name: 'user',
        email: 'user@email.com',
        password: '12345',
        role: ROLES.USER
    };
};

const getNormalUserToken = () => {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjZlMWFkN2ZkY2UxMzE3NmY0YzEzYSIsImVtYWlsIjoidXNlckBlbWFpbC5jb20iLCJyb2xlIjoidXNlciIsImlhdCI6MTYzNDEzMjQwOSwiZXhwIjoxNjM0MTY4NDA5LCJzdWIiOiI2MTY2ZTFhZDdmZGNlMTMxNzZmNGMxM2EifQ.JcvWVITKE_lkjxy50QaNQ6CZnyYqdiPQv9DXOLfcZMY';
};

const getAdminUser = () => {
    return {
        _id: mongoose.Types.ObjectId('6166d9b3d2a49e17f1964c3c'),
        name: 'admin', 
        email: 'admin@email.com', 
        password: 'admin', 
        role: ROLES.ADMIN
    };
};

const getAdminUserToken = () => {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjZkOWIzZDJhNDllMTdmMTk2NGMzYyIsImVtYWlsIjoicm9vdEBlbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzQxMzAzNTcsImV4cCI6MjQ5ODEzMDM1Nywic3ViIjoiNjE2NmQ5YjNkMmE0OWUxN2YxOTY0YzNjIn0.LpwmWLqdD5RgkzPcZRXsUBGNluRIopigO93UxVWdh3o';
};

module.exports = {
    getNormalUser,
    getNormalUserToken,
    getAdminUser,
    getAdminUserToken
};