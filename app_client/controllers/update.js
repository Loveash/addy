function updateCtrl($http, $location, $routeParams) {
    let vm = this;
    vm.error = '';
    vm.title = "Изменение";
    const id = $routeParams.id;


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
        let p1 = $http.put('/api/practics/' + id, {
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
    };

    function init() {

        vm.error = '';
        console.log('waiting...');


        let p1 = $http.get('/api/practics/' + id, {
            headers : {
                token: localStorage.getItem('token')
            }
        });

        p1.then(res=>{
            //console.log('success!');
            const oneRow = res.data;
            vm.formModel.material.value = oneRow.material;
            vm.formModel.mod.value = oneRow.mod;
            vm.formModel.pattern.value = oneRow.pattern;
            vm.formModel.color.value = oneRow.color;
            vm.formModel.country.value = oneRow.country;
            vm.formModel.orderdate.value = oneRow.orderdate;
            vm.validate();
        }, err=>{
            vm.error = 'Ошибка: ' + JSON.stringify(err);
            //console.log('error add practic: ', err);
        });
    }

    init();


}