const Endpoints = {
    authorize: 'api/authorize',
    me: 'api/authorize/me',

    course: '/api/courses',
    courseId: (id) => `api/course/${id}`,

};

export default Endpoints;