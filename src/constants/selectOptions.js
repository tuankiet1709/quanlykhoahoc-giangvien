import {
    NotStart,
    InProcess,
    IsEnded,
    IsDeleted,
    All,
    NotStartLabel,
    InProcessLabel,
    IsEndedLabel,
    IsDeletedLabel,
    AllLabel,
} from "./Course/CourseStateConstant";
import {
    IsTeaching,
    TakeABreak,
    StopTeaching,
    IsTeachingLabel,
    TakeABreakLabel,
    StopTeachingLabel,
} from "./Teacher/TeacherStateConstant";
import {
    GenderMale,
    GenderFemale,
    GenderMaleLabel,
    GenderFemaleLabel,
} from "./Teacher/GenderContants";
import {
    Primary,
    Intermediate,
    Colleges,
    University,
    Master,
    Doctor,
    PrimaryLabel,
    IntermediateLabel,
    CollegesLabel,
    UniversityLabel,
    MasterLabel,
    DoctorLabel,
} from "./Teacher/QualificationConstants";
export const CourseStateOptions = [
    { id: 1, label: NotStartLabel, value: NotStart },
    { id: 2, label: InProcessLabel, value: InProcess },
    { id: 3, label: IsEndedLabel, value: IsEnded },
];
export const CourseStateFilters = [
    { id: 1, label: AllLabel, value: All }, 
    { id: 2, label: NotStartLabel, value: NotStart },
    { id: 3, label: InProcessLabel, value: InProcess },
    { id: 4, label: IsEndedLabel, value: IsEnded },
    { id: 5, label: IsDeletedLabel, value: IsDeleted },
];

export const TeacherStateOptions = [
    { id: 1, label: IsTeachingLabel, value: IsTeaching },
    { id: 2, label: TakeABreakLabel, value: TakeABreak },
    { id: 3, label: StopTeachingLabel, value: StopTeaching },
];
export const TeacherStateFilters = [
    { id: 1, label: AllLabel, value: All }, 
    { id: 2, label: IsTeachingLabel, value: IsTeaching },
    { id: 3, label: TakeABreakLabel, value: TakeABreak },
    { id: 4, label: StopTeachingLabel, value: StopTeaching },
];

export const UserGenderOptions = [
    { id: 1, label: GenderMaleLabel, value: GenderMale },
    { id: 2, label: GenderFemaleLabel, value: GenderFemale },
];

export const TeacherQualificationOptions = [
    { id: 1, label: PrimaryLabel, value: Primary },
    { id: 2, label: IntermediateLabel, value: Intermediate },
    { id: 3, label: CollegesLabel, value: Colleges },
    { id: 4, label: UniversityLabel, value: University },
    { id: 5, label: MasterLabel, value: Master },
    { id: 6, label: DoctorLabel, value: Doctor },
];