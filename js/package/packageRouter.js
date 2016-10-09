angular.module('app.package', [  'app.package.controller','app.package.service','app.directive'])

    .config(['$stateProvider','$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/home');

        $stateProvider.state('home', {

            url: '/home',

            template: '<div ui-view></div>',

            abstract: true,

        })

        $stateProvider.state('home.index', {

            url: '',

            templateUrl: 'tpl/helpTogether.html',//templateUrl: 'tpl/home.html',

            data:{ title:'众筹首页' },

            controller: 'homeCtrl'

        })


       /* $stateProvider.state('helpTogether', {

            url: '/helpTogether',

            templateUrl: 'tpl/helpTogether.html',

            data:{ title:'众筹首页' },

            controller: 'helpTogetherCtrl'

        })*/
        $stateProvider.state('helpLogin', {

            url: '/helpLogin',

            templateUrl: 'tpl/help_login.html',

            data:{ title:'众筹登陆界面' },

            controller: 'helpLoginCtrl'
        })
        $stateProvider.state('helpHealthTip', {

            url: '/helpHealthTip',

            templateUrl: 'tpl/help_healthTip.html',

            data:{ title:'投保健康须知' },

            controller: 'helpHealthTipCtrl'
        })
        $stateProvider.state('helpMemberIntroduce', {

            url: '/helpMemberIntroduce',

            templateUrl: 'tpl/help_memberIntroduce.html',

            data:{ title:'会员公约' },

            /*controller: 'helpMemberIntroduceCtrl'*/
        })
        $stateProvider.state('helpAddPerson', {

            url: '/helpAddPerson',

            templateUrl: 'tpl/help_addPerson.html',

            data:{ title:'添加被保险人' },

            controller: 'helpAddPersonCtrl'

        })
        $stateProvider.state('helpPlanCenter', {

            url: '/helpPlanCenter/:projectId',

            templateUrl: 'tpl/help_planCenter.html',

            data:{ title:'盒子大病互助计划' },

            controller: 'helpPlanCenterCtrl'

        })
        $stateProvider.state('helpPersonDetail', {

            url: '/helpPersonDetail/:projectId/:personId',

            templateUrl: 'tpl/help_personDetail.html',

            data:{ title:'被保险人详情' },

            controller: 'helpPersonDetailCtrl'

        })
        $stateProvider.state('paySuccessHelp', {

            url: '/paySuccessHelp',

            templateUrl: 'tpl/pay_success_help.html',

            data:{ title:'支付成功' },

            controller: 'paySuccessHelpCtrl'

        })
        $stateProvider.state('payFailureHelp', {

            url: '/payFailureHelp',

            templateUrl: 'tpl/pay_failure_help.html',

            data:{ title:'支付失败' },

            controller: 'payFailureHelpCtrl'

        })




    }])
