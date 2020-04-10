function createCtrl($http, $location) {
    let vm = this;
    vm.error = '';
    vm.title = "Добавление элемента";


    vm.formWasValidated = false;

    vm.formModel = {
        material: {
            valid: true,
            infoText: '',
            value: ''
        },
        mod: {
            valid: true,
            infoText: '',
            value: ''
        },
        pattern: {
            valid: true,
            infoText: '',
            value: ''
        },
        color: {
            valid: true,
            infoText: '',
            value: ''
        },
        country: {
            valid: true,
            infoText: '',
            value: ''
        },
        orderdate: {
            valid: true,
            infoText: '',
            value: new Date()
        },
    };

    vm.validate = function () {

        vm.formWasValidated = true;
        const onlyLettersAndDigits = /^([-\.a-zа-яё \d]+)$/i;

        for (let field in vm.formModel){
            if(field!=='orderdate'){
                vm.formModel[field].valid = onlyLettersAndDigits.test(vm.formModel[field].value);
                vm.formModel[field].infoText = (vm.formModel[field].valid) ? 'Введено верно' : 'Корректно заполните поле';
                vm.formWasValidated = vm.formWasValidated && vm.formModel[field].valid;
            }
        }
    };

    vm.sendForm = function () {

        vm.error = '';

        console.log('waiting...');
        let p1 = $http.post('/api/practics', {
            material: vm.formModel.material.value,
            mod: vm.formModel.mod.value,
            pattern: vm.formModel.pattern.value,
            color: vm.formModel.color.value,
            country: vm.formModel.country.value,
            orderdate: vm.formModel.orderdate.value,
            mark: 0
        }, {
            headers : {
                token: localStorage.getItem('token')
            }
        });

        p1.then(res=>{
            console.log('success!');
            $location.path('/');
        }, err=>{
            vm.error = 'Ошибка: ' + JSON.stringify(err);
            //console.log('error add practic: ', err);
        });
    }




}