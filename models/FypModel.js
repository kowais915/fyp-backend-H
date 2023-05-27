const mongoose = require("mongoose");

// 1. Defining Schemas for different Users of the System. (a) Administrator (b) Faculty (c) Student
// User schema
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String
});

const User = mongoose.model('User', userSchema);

// Administrator schema
const administratorSchema = new mongoose.Schema({
    role: { type: String, default: 'administrator' }
});

const Administrator = User.discriminator('Administrator', administratorSchema);

// Faculty Specialization schema
const facultySpecializationSchema = new mongoose.Schema({
    domain: {type: String}
});

const FacultySpecialization = mongoose.model('FacultySpecialization', facultySpecializationSchema);

// Faculty schema
const facultySchema = new mongoose.Schema({
    designation: String,
    roles: [String],
    specializations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FacultySpecialization' }]
});

const Faculty = User.discriminator('Faculty', facultySchema);

// Student schema
const studentSchema = new mongoose.Schema({
    regNumber: String,
    batch: String,
    contact: String
});

const Student = User.discriminator('Student', studentSchema);

// 1. End of User Schemas
// -------------------------------------------------------------------------------------


// 2. Let's define schemas that can be independently stored in the database. (a) Project Domains (b) Rubrics (c) Presentations

// Project Domain schema
const projectDomainSchema = new mongoose.Schema({
    domainName: String
});

const ProjectDomain = mongoose.model('ProjectDomain', projectDomainSchema);

// Rubric schema
const rubricSchema = new mongoose.Schema({
    rubricName: String,
    mappedToPLO: String,
    maxScore: Number,
    academicYear: Date
});

const Rubric = mongoose.model('Rubric', rubricSchema);

// Presentations schema
const presentationSchema = new mongoose.Schema({
    pId: String, // will generally be of the form P-1, P-2, P-3, etc.
    title: String,
    weightage: Number, // weightage of this presentation in the final evaluation / 100
    academicYear: Date
});

const Presentation = mongoose.model('Presentation', presentationSchema);

const venueSchema = new mongoose.Schema({
    venueName: String,
    location: String
});

const Venue = mongoose.model('Venue', venueSchema);

// 2. End of independent schemas
// -------------------------------------------------------------------------------------


// 3. Now, let's define schemas that are dependent on other schemas. (a) Panel (b) FYP Group (c) PresentationSchedule (d) Evaluation  (e) PresentationEvaluation

// Panel schema
const panelSchema = new mongoose.Schema({
    panelId: String,    // will generally be of the type A, B, C, etc.
    academicYear: Date,
    facultyMembers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }]
});

const Panel = mongoose.model('Panel', panelSchema);

// FYP Group schema
const fypGroupSchema = new mongoose.Schema({
    groupId: String, // will generally be of the form A-1, B-2, C-3, etc. the first letter is the panelId
    projectName: String,
    projectDomains: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProjectDomain' }],
    academicYear: Date,
    advisor: {
        faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
        status: { type: String, enum: ['accepted', 'pending'] }
    },
    coAdvisors: [{
        faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
        status: { type: String, enum: ['accepted', 'pending'] }
    }],
    students: [{
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        status: { type: String, enum: ['accepted', 'pending'] }
    }],
    status: { type: String, enum: ['pending', 'not-approved', 'approved'] },
    comments: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comment: String
    }]
});

const FYPGroup = mongoose.model('FYPGroup', fypGroupSchema);

// PresentationSchedule schema
const presentationScheduleSchema = new mongoose.Schema({
    pId: { type: mongoose.Schema.Types.ObjectId, ref: 'Presentation'},
    date: Date, // Date on which a presentation is scheduled
    academicYear: Date,
    venue: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue'},
    panel: { type: mongoose.Schema.Types.ObjectId, ref: 'Panel' },
    slots: [{
        startTime: Date,
        endTime: Date,
        fypGroup: { type: mongoose.Schema.Types.ObjectId, ref: 'FYPGroup' }
    }]
});

const PresentationSchedule = mongoose.model('PresentationSchedule', presentationScheduleSchema);

// Evaluation schema
const evaluationSchema = new mongoose.Schema({
    presentation: { type: mongoose.Schema.Types.ObjectId, ref: 'Presentation' },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'FYPGroup' },
    evaluatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    rubricId: { type: mongoose.Schema.Types.ObjectId, ref: 'Rubric' },
    marks: Number
});

const Evaluation = mongoose.model('Evaluation', evaluationSchema);

// Presentation Evaluation schema
const presentationEvaluationSchema = new mongoose.Schema({
    presentation: { type: mongoose.Schema.Types.ObjectId, ref: 'Presentation' },
    evaluationYear: Date,
    evaluations: [evaluationSchema]
});

const PresentationEvaluation = mongoose.model('PresentationEvaluation', presentationEvaluationSchema);

// 3. End of dependent schemas
// -------------------------------------------------------------------------------------

// Export all models
module.exports = {
    User,
    Administrator,
    FacultySpecialization,
    Faculty,
    Student,
    ProjectDomain,
    Rubric,
    Presentation,
    Venue,
    Panel,
    FYPGroup,
    PresentationSchedule,
    Evaluation,
    PresentationEvaluation
};