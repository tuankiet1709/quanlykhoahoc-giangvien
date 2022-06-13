export const LOGIN='/login';
export const AUTH='/authentication/:action';
export const HOME='/';

export const COURSE_TEACHER= '/course-teacher';

export const COURSE_REPORT = '/course-report';

export const TEACHER_REPORT = '/teacher-report';

export const COURSE = '/course';
export const CREATE_COURSE = '/course/create';
export const EDIT_COURSE = '/course/edit/:id';
export const EDIT_COURSE_ID = (id) => `/course/edit/${id}`;

export const CLASS = '/class';
export const CREATE_CLASS = '/class/create';
export const EDIT_CLASS = '/class/edit/:id';
export const EDIT_CLASS_ID = (id) => `/class/edit/${id}`;

export const TEACHER = '/teacher';
export const CREATE_TEACHER = '/teacher/create';
export const EDIT_TEACHER = '/teacher/edit/:id';
export const EDIT_TEACHER_ID = (id) => `/teacher/edit/${id}`;

export const ADMIN = '/admin';
export const CREATE_ADMIN = '/admin/create';
export const EDIT_ADMIN = '/admin/edit/:id';
export const EDIT_ADMIN_ID = (id) => `/admin/edit/${id}`;

export const UNAUTHORIZE = '/unauthorize';
export const NOTFOUND = '/notfound';