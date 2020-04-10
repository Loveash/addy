let mongoose = require( 'mongoose' );

let practicSchema = new mongoose.Schema({
    material: {type: String, required: true},
    mod: {type: String, required: true, default: "Неизвестный силуэт"},
    pattern: {type: String, required: true},
    color: {type: String, required: true},
    country: {type: String, required: true},
    orderdate: {type: Date, required: true, default: Date.now},
    mark: {type: Number, required: true}
});

// компиляция модели
mongoose.model('practic', practicSchema );

// наименование: "по ПМ.02 Осуществление интеграции программных модулей"
// обучающийся: "Фамилия Имя Отчество"
// группа: "3ИСиП-17-1"
// специальность: "09.02.07 Информационные системы и программирование"
// дата начала: "«23» сентября 2019 г."
// дата окончания: "«12»  октября 2019 г."
// общая оценка: "4"
// руководитель: "ФИО"